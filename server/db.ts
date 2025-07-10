import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Railway utilise new_db="${{ Postgres.DATABASE_URL }}"
const databaseUrl = process.env.new_db || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("new_db or DATABASE_URL must be set. Please configure your database connection in Railway.");
}

// Configure for PostgreSQL (Railway compatible)
const client = postgres(databaseUrl, { 
  prepare: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });