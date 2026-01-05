import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  companyId: varchar("company_id"),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  logo: text("logo"),
  location: text("location"),
  website: text("website"),
  verified: integer("verified").default(0),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  totalTransactions: integer("total_transactions").default(0),
  memberSince: timestamp("member_since").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").notNull(),
  partNumber: text("part_number").notNull(),
  manufacturer: text("manufacturer").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  condition: text("condition").notNull(),
  datasheetUrl: text("datasheet_url"),
  imageUrl: text("image_url"),
  status: text("status").notNull(),
  listedDate: timestamp("listed_date").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buyerCompanyId: varchar("buyer_company_id").notNull(),
  sellerCompanyId: varchar("seller_company_id").notNull(),
  inventoryId: varchar("inventory_id").notNull(),
  quantity: integer("quantity").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(),
  escrowStatus: text("escrow_status"),
  blockchainTxHash: text("blockchain_tx_hash"),
  shippingStatus: text("shipping_status"),
  trackingNumber: text("tracking_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertCompanySchema = createInsertSchema(companies).omit({ id: true, memberSince: true });
export const insertInventorySchema = createInsertSchema(inventory).omit({ id: true, listedDate: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, updatedAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertInventory = z.infer<typeof insertInventorySchema>;
export type Inventory = typeof inventory.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
