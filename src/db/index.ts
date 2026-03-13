import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

const dbUrl = process.env.DB_URL;
const dbToken = process.env.DB_TOKEN;

if (!dbUrl || !dbToken) {
  console.warn("Database not configured - using in-memory storage");
}

export const db = dbUrl && dbToken 
  ? createDatabase(schema, { url: dbUrl, token: dbToken })
  : (null as any);
