import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import { storage } from "./storage";
import { isAuthenticated, hashPassword, comparePassword, getCurrentUser, type AuthenticatedRequest } from "./auth";
import { insertLoanApplicationSchema, insertUserSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const MemoryStoreSession = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  }));

  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Un compte avec cet email existe déjà" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword
      });

      // Create session
      (req.session as any).userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Erreur lors de la création du compte" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      // Check password
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      // Create session
      (req.session as any).userId = user.id;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la déconnexion" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Déconnexion réussie" });
    });
  });

  app.get('/api/auth/user', isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      const user = await getCurrentUser(req);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Loan application routes (protected)
  app.post("/api/loan-applications", isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const user = await getCurrentUser(req);
      const application = await storage.createLoanApplication(validatedData, user.id);
      res.json(application);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/loan-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getLoanApplication(id);
      
      if (!application) {
        return res.status(404).json({ message: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user's applications
  app.get("/api/loan-applications", isAuthenticated, async (req: AuthenticatedRequest, res) => {
    try {
      const user = await getCurrentUser(req);
      const applications = await storage.getLoanApplicationsByUserId(user.id);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all applications (admin only)
  app.get("/api/admin/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getAllLoanApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin routes for 7-step process management
  app.patch("/api/loan-applications/:id/advance", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { step } = req.body;
      
      if (!step || step < 1 || step > 7) {
        return res.status(400).json({ message: "Invalid step number (1-7)" });
      }
      
      const application = await storage.advanceApplicationStep(id, step);
      
      if (!application) {
        return res.status(404).json({ message: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/loan-applications/:id/assign-lender", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { lenderId, lenderName } = req.body;
      
      if (!lenderId || !lenderName) {
        return res.status(400).json({ message: "lenderId and lenderName are required" });
      }
      
      const application = await storage.assignLenderToApplication(id, lenderId, lenderName);
      
      if (!application) {
        return res.status(404).json({ message: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/loan-applications/:id/lender-response", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { response, message } = req.body;
      
      if (!response || !["approved", "rejected"].includes(response)) {
        return res.status(400).json({ message: "response must be 'approved' or 'rejected'" });
      }
      
      const application = await storage.updateLenderResponse(id, response, message);
      
      if (!application) {
        return res.status(404).json({ message: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/loan-applications/:id/account", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { accountNumber } = req.body;
      
      if (!accountNumber) {
        return res.status(400).json({ message: "accountNumber is required" });
      }
      
      const application = await storage.setAccountNumber(id, accountNumber);
      
      if (!application) {
        return res.status(404).json({ message: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/loan-applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const application = await storage.updateLoanApplicationStatus(id, status);
      
      if (!application) {
        return res.status(404).json({ message: "Loan application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Loan calculation endpoint
  app.post("/api/calculate-loan", (req, res) => {
    try {
      const { amount, duration } = req.body;
      
      if (!amount || !duration || amount < 500 || amount > 3000 || duration < 3 || duration > 12) {
        return res.status(400).json({ message: "Invalid loan parameters" });
      }
      
      // Simple loan calculation with 5% annual interest rate
      const annualRate = 0.05;
      const monthlyRate = annualRate / 12;
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                            (Math.pow(1 + monthlyRate, duration) - 1);
      const totalCost = monthlyPayment * duration;
      
      res.json({
        amount,
        duration,
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        interestRate: annualRate,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}