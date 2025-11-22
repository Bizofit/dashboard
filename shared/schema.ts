import { mysqlTable, varchar, int, timestamp, boolean, text, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// ============================================================================
// UNIFIED USERS TABLE - Master user registry
// ============================================================================
export const unifiedUsers = mysqlTable('unified_users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  
  // Google OAuth fields
  googleId: varchar('google_id', { length: 255 }).unique(),
  googleProfilePicture: varchar('google_profile_picture', { length: 500 }),
  authProvider: mysqlEnum('auth_provider', ['local', 'google', 'hybrid']).default('local'),
  
  // User details
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  
  // Legacy platform IDs (foreign keys to other databases)
  bizoforceUserId: int('bizoforce_user_id'),
  giglancerUserId: int('giglancer_user_id'),
  screenlyUserId: int('screenly_user_id'),
  workUserId: int('work_user_id'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  lastLoginAt: timestamp('last_login_at'),
});

// ============================================================================
// USER ROLES TABLE - Multi-role support
// ============================================================================
export const userRoles = mysqlTable('user_roles', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  roleType: mysqlEnum('role_type', [
    'company_admin',
    'hr',
    'team_lead',
    'team_member',
    'finance',
    'vendor',
    'resource_provider',
    'job_seeker',
    'freelancer'
  ]).notNull(),
  platform: varchar('platform', { length: 50 }), // 'bizoforce', 'giglancer', 'screenly', 'work'
  companyId: int('company_id'),
  isPrimary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// ============================================================================
// OAUTH TOKENS TABLE - For token refresh capability
// ============================================================================
export const oauthTokens = mysqlTable('oauth_tokens', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  provider: mysqlEnum('provider', ['google', 'facebook', 'microsoft']).notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ============================================================================
// COMPANIES TABLE - For company management
// ============================================================================
export const companies = mysqlTable('companies', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  logo: varchar('logo', { length: 500 }),
  website: varchar('website', { length: 255 }),
  industry: varchar('industry', { length: 100 }),
  size: varchar('size', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ============================================================================
// RELATIONS
// ============================================================================
export const unifiedUsersRelations = relations(unifiedUsers, ({ many }) => ({
  roles: many(userRoles),
  oauthTokens: many(oauthTokens),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(unifiedUsers, {
    fields: [userRoles.userId],
    references: [unifiedUsers.id],
  }),
}));

export const oauthTokensRelations = relations(oauthTokens, ({ one }) => ({
  user: one(unifiedUsers, {
    fields: [oauthTokens.userId],
    references: [unifiedUsers.id],
  }),
}));

// ============================================================================
// TYPESCRIPT TYPES
// ============================================================================
export type UnifiedUser = typeof unifiedUsers.$inferSelect;
export type NewUnifiedUser = typeof unifiedUsers.$inferInsert;
export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;
export type OAuthToken = typeof oauthTokens.$inferSelect;
export type NewOAuthToken = typeof oauthTokens.$inferInsert;
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
