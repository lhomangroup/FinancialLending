import { defineConfig } from "drizzle-kit";

// Railway utilise la syntaxe ${{ Postgres.DATABASE_URL }} pour référencer la base de données
// La variable new_db sera automatiquement résolue par Railway
const databaseUrl = process.env.new_db || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("new_db or DATABASE_URL not found. Make sure PostgreSQL is connected to your Railway project.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl || "postgresql://placeholder",
  },
  // Configuration pour Railway/PostgreSQL
  schemaFilter: ["public"],
  tablesFilter: ["!_*"],
  verbose: true,
  strict: true,
});