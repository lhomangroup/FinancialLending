import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.session && (req.session as any).userId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

export const getCurrentUser = async (req: AuthenticatedRequest): Promise<any> => {
  if (req.session && (req.session as any).userId) {
    const user = await storage.getUser((req.session as any).userId);
    return user;
  }
  return null;
};