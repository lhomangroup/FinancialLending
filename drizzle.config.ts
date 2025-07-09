import { defineConfig } from "drizzle-kit";

// Pour Railway, la variable DATABASE_URL est automatiquement injectée
// mais seulement après que la base de données soit connectée
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not found. Make sure PostgreSQL is connected to your Railway project.");
  // Ne pas faire exit(1) car cela empêche le build
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://placeholder",
  },
  // Configuration pour Railway/PostgreSQL
  schemaFilter: ["public"],
  tablesFilter: ["!_*"],
  verbose: true,
  strict: true,
});