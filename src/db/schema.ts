import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  key: text("key").notNull(),
  createdAt: text("created_at").notNull(),
  expires: text("expires").notNull(),
  level: integer("level").notNull().default(1),
});
