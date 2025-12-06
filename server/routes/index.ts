import type { Express } from "express";
import authRoutes from "./auth.js";
import googleAuthRoutes from "./google-auth.js";
import userRoutes from "./users.js";
import dashboardRoutes from "./dashboard.js";
import migrationRoutes from "./migration.js";
import smartMigrationRoutes from "./smart-migration.js";
import profileRoutes from "./profile.js";
import companiesRoutes from "./companies.js";
import productsRoutes from "./products.js";
import giglancerProjectsRoutes from "./giglancer-projects.js";
import giglancerSkillsRoutes from "./giglancer-skills.js";
import timesheetsRoutes from "./timesheets.js";
import workProjectsRoutes from "./work-projects.js";
import workTeamRoutes from "./work-team.js";

export function registerRoutes(app: Express) {
  // Authentication routes
  app.use("/api/auth", authRoutes);
  app.use("/api/auth", googleAuthRoutes);

  // User management routes
  app.use("/api/users", userRoutes);

  // Profile routes
  app.use("/api/profile", profileRoutes);

  // Dashboard routes
  app.use("/api/dashboard", dashboardRoutes);

  // Company routes
  app.use("/api/companies", companiesRoutes);

  // Products routes
  app.use("/api/products", productsRoutes);

  // Giglancer routes
  app.use("/api/giglancer", giglancerProjectsRoutes);
  app.use("/api/giglancer", giglancerSkillsRoutes);

  // Work.Bizoforce routes
  app.use("/api/work", workProjectsRoutes);
  app.use("/api/work", workTeamRoutes);

  // Timesheets routes
  app.use("/api/timesheets", timesheetsRoutes);

  // Migration routes
  app.use("/api/migration", migrationRoutes);
  app.use("/api/smart-migration", smartMigrationRoutes);

  console.log("✅ All API routes registered");
}
