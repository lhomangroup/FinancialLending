import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL must be set. Please click 'Connect to Supabase' to provision a database.");
  process.exit(1);
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // Supabase specific configuration
  schemaFilter: ["public"],
  tablesFilter: ["!_*"],
});