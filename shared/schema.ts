import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const simulations = pgTable("simulations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  initialValue: decimal("initial_value", { precision: 12, scale: 2 }).notNull(),
  monthlyContribution: decimal("monthly_contribution", { precision: 12, scale: 2 }).notNull(),
  interestRate: decimal("interest_rate", { precision: 5, scale: 4 }).notNull(),
  timePeriod: integer("time_period").notNull(),
  timeUnit: text("time_unit").notNull().default("months"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  createdAt: true,
});

export const simulationParamsSchema = z.object({
  initialValue: z.number().min(0, "Valor inicial deve ser positivo"),
  monthlyContribution: z.number().min(0, "Aporte mensal deve ser positivo"),
  interestRate: z.number().min(0, "Taxa de juros deve ser positiva").max(20, "Taxa de juros muito alta"),
  timePeriod: z.number().min(1, "Período deve ser pelo menos 1").max(600, "Período muito longo"),
  timeUnit: z.enum(["months", "years"]).default("months"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
export type Simulation = typeof simulations.$inferSelect;
export type SimulationParams = z.infer<typeof simulationParamsSchema>;
