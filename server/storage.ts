import {
  type User,
  type InsertUser,
  type Company,
  type InsertCompany,
  type Inventory,
  type InsertInventory,
  type Order,
  type InsertOrder,
} from "../shared/schema.js";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // Company operations
  getCompany(id: string): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
  getVerifiedCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, company: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: string): Promise<boolean>;

  // Inventory operations
  getInventoryItem(id: string): Promise<Inventory | undefined>;
  getAllInventory(): Promise<Inventory[]>;
  getInventoryByCompany(companyId: string): Promise<Inventory[]>;
  getInventoryByCategory(category: string): Promise<Inventory[]>;
  searchInventory(query: string): Promise<Inventory[]>;
  createInventoryItem(item: InsertInventory): Promise<Inventory>;
  updateInventoryItem(id: string, item: Partial<InsertInventory>): Promise<Inventory | undefined>;
  deleteInventoryItem(id: string): Promise<boolean>;

  // Order operations
  getOrder(id: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByBuyer(buyerCompanyId: string): Promise<Order[]>;
  getOrdersBySeller(sellerCompanyId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private companies: Map<string, Company>;
  private inventory: Map<string, Inventory>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.inventory = new Map();
    this.orders = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      companyId: insertUser.companyId ?? null,
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Company operations
  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getVerifiedCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values()).filter((c) => c.verified === 1);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = {
      ...insertCompany,
      description: insertCompany.description ?? null,
      logo: insertCompany.logo ?? null,
      location: insertCompany.location ?? null,
      website: insertCompany.website ?? null,
      verified: insertCompany.verified ?? null,
      rating: insertCompany.rating ?? null,
      totalTransactions: insertCompany.totalTransactions ?? null,
      id,
      memberSince: new Date(),
    };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: string, updates: Partial<InsertCompany>): Promise<Company | undefined> {
    const company = this.companies.get(id);
    if (!company) return undefined;
    const updatedCompany = { ...company, ...updates };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<boolean> {
    return this.companies.delete(id);
  }

  // Inventory operations
  async getInventoryItem(id: string): Promise<Inventory | undefined> {
    return this.inventory.get(id);
  }

  async getAllInventory(): Promise<Inventory[]> {
    return Array.from(this.inventory.values()).filter((item) => item.status === "active");
  }

  async getInventoryByCompany(companyId: string): Promise<Inventory[]> {
    return Array.from(this.inventory.values()).filter(
      (item) => item.companyId === companyId,
    );
  }

  async getInventoryByCategory(category: string): Promise<Inventory[]> {
    return Array.from(this.inventory.values()).filter(
      (item) => item.category === category && item.status === "active",
    );
  }

  async searchInventory(query: string): Promise<Inventory[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.inventory.values()).filter(
      (item) =>
        item.status === "active" &&
        (item.partNumber.toLowerCase().includes(lowerQuery) ||
          item.manufacturer.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery)),
    );
  }

  async createInventoryItem(insertInventory: InsertInventory): Promise<Inventory> {
    const id = randomUUID();
    const item: Inventory = {
      ...insertInventory,
      description: insertInventory.description ?? null,
      datasheetUrl: insertInventory.datasheetUrl ?? null,
      imageUrl: insertInventory.imageUrl ?? null,
      id,
      listedDate: new Date(),
    };
    this.inventory.set(id, item);
    return item;
  }

  async updateInventoryItem(id: string, updates: Partial<InsertInventory>): Promise<Inventory | undefined> {
    const item = this.inventory.get(id);
    if (!item) return undefined;
    const updatedItem = { ...item, ...updates };
    this.inventory.set(id, updatedItem);
    return updatedItem;
  }

  async deleteInventoryItem(id: string): Promise<boolean> {
    return this.inventory.delete(id);
  }

  // Order operations
  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrdersByBuyer(buyerCompanyId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.buyerCompanyId === buyerCompanyId,
    );
  }

  async getOrdersBySeller(sellerCompanyId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.sellerCompanyId === sellerCompanyId,
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      escrowStatus: insertOrder.escrowStatus ?? null,
      blockchainTxHash: insertOrder.blockchainTxHash ?? null,
      shippingStatus: insertOrder.shippingStatus ?? null,
      trackingNumber: insertOrder.trackingNumber ?? null,
      notes: insertOrder.notes ?? null,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    const updatedOrder = { ...order, ...updates, updatedAt: new Date() };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();
