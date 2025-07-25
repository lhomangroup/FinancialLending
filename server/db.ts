import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const sqliteUrl = process.env.DATABASE_URL?.replace('sqlite://', '');
const client = new Database(sqliteUrl!);
export const db = drizzle(client, { schema });