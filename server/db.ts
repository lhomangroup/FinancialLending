import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Railway utilise new_db="${{ Postgres.DATABASE_URL }}"
const databaseUrl = process.env.new_db || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️  No database connection configured. Some features may not work.");
  console.warn("📝 For local development, create a .env file with DATABASE_URL");
  console.warn("🚀 For Railway deployment, use new_db=${{ Postgres.DATABASE_URL }}");
  
  // Create a mock client that won't crash the app
  const mockClient = {
    execute: () => Promise.resolve([]),
  };
  
  export const db = drizzle(mockClient as any, { schema });
} else {
  // Configure for PostgreSQL (Railway compatible)
  const client = postgres(databaseUrl, { 
    prepare: false,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  export const db = drizzle(client, { schema });
}