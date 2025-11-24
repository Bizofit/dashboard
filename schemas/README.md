# Database Schemas

This directory contains automatically generated schema documentation for all 5 databases used in the Bizoforce Unified Dashboard.

## 📊 Database Overview

| Database      | Type       | Tables | Size  | Purpose                                      |
| ------------- | ---------- | ------ | ----- | -------------------------------------------- |
| **Unified**   | MySQL      | 12     | 16KB  | Master user registry, roles, sessions        |
| **Bizoforce** | MySQL      | 732    | 1.7MB | WordPress/WooCommerce platform (198K+ users) |
| **Giglancer** | MySQL      | 162    | 424KB | Job marketplace (82K+ users)                 |
| **Work**      | MySQL      | 226    | 642KB | Project/timesheet management (1.1K+ users)   |
| **Screenly**  | PostgreSQL | 51     | 193KB | AI screening platform (24 users)             |

## 📁 Files Generated

For each database, three files are generated:

### 1. Markdown Documentation (`*-schema.md`)

- **Purpose**: Human-readable documentation
- **Contains**: Table of contents, column details, indexes, foreign keys
- **Use**: Quick reference for developers, documentation

### 2. TypeScript Interfaces (`*-types.ts`)

- **Purpose**: Type-safe database models
- **Contains**: TypeScript interfaces for each table
- **Use**: Import in your API code for type safety

### 3. JSON Schema (`*-schema.json`)

- **Purpose**: Machine-readable schema
- **Contains**: Complete schema with metadata
- **Use**: Code generators, validation, tooling

## 🚀 Usage Examples

### Using TypeScript Types in Your API

```typescript
import { UnifiedUsers, UserRoles } from "@/schemas/unified-types";
import { WpPosts, WpUsers } from "@/schemas/bizoforce-types";
import { Users as GiglancerUsers, Jobs } from "@/schemas/giglancer-types";

// Type-safe function
async function getUser(userId: number): Promise<UnifiedUsers | null> {
  const [rows] = await unifiedDB.query<UnifiedUsers[]>(
    "SELECT * FROM unified_users WHERE id = ?",
    [userId]
  );
  return rows[0] || null;
}

// Multi-database query with types
async function getUserWithLegacyData(email: string) {
  const unifiedUser = await getUnifiedUser(email);

  if (unifiedUser?.bizoforce_user_id) {
    const wpUser: WpUsers = await getBizoforceUser(
      unifiedUser.bizoforce_user_id
    );
  }

  if (unifiedUser?.giglancer_user_id) {
    const giglancerUser: GiglancerUsers = await getGiglancerUser(
      unifiedUser.giglancer_user_id
    );
  }
}
```

### Quick Table Lookup

**Need to find a table?** Check the markdown files:

- 📘 `unified-schema.md` - All unified database tables
- 📗 `bizoforce-schema.md` - WordPress/WooCommerce tables (wp\_\*)
- 📙 `giglancer-schema.md` - Job marketplace tables
- 📕 `work-schema.md` - Project management tables
- 📓 `screenly-schema.md` - AI screening tables

### JSON Schema for Validation

```typescript
import unifiedSchema from "@/schemas/unified-schema.json";

// Get table schema
const userRolesTable = unifiedSchema.tables.find(
  (t) => t.tableName === "user_roles"
);

console.log(userRolesTable.columns);
// [{ name: 'id', type: 'int(11)', nullable: false, ... }, ...]
```

## 🔄 Regenerating Schemas

Schemas should be regenerated when database structure changes:

```bash
# Regenerate all schemas
npm run generate-schemas

# Or run directly
npx tsx scripts/generate-schemas.ts
```

**When to regenerate:**

- After running migrations
- When tables are added/modified
- Before major releases
- When debugging table/column issues

## 📖 Key Tables Reference

### Unified Database

- `unified_users` - Master user registry
- `user_roles` - Multi-role assignments
- `companies` - Company profiles
- `oauth_tokens` - OAuth refresh tokens
- `sessions` - Session store

### Bizoforce (WordPress)

- `wp_users` - WordPress users (198K+)
- `wp_usermeta` - User metadata (roles, etc.)
- `wp_posts` - Products, orders, pages
- `wp_postmeta` - Product metadata
- `wp_woocommerce_order_items` - Order line items

### Giglancer

- `users` - Job seekers & employers (82K+)
- `jobs` - Job postings
- `job_applications` - Applications
- `freelancer_profiles` - Freelancer details
- `companies` - Employer companies

### Work.Bizoforce

- `users` - Team members (1.1K+)
- `projects` - Project management
- `project_time_logs` - Timesheet entries
- `invoices` - Billing & invoices
- `attendances` - Attendance tracking

### Screenly (PostgreSQL)

- `users` - Platform users
- `companies` - Company accounts
- `candidates` - Job candidates
- `screenings` - AI screening results
- `interviews` - Interview schedules

## 🎯 Best Practices

1. **Always check schema before writing queries**

   - Verify table names (e.g., `user_roles` not `roles`)
   - Check column names (e.g., `role` not `role_name`)
   - Confirm data types match your expectations

2. **Use TypeScript types for API development**

   ```typescript
   import { UnifiedUsers } from "@/schemas/unified-types";

   // Type-safe response
   function formatUser(user: UnifiedUsers) {
     return {
       id: user.id,
       email: user.email,
       name: `${user.first_name} ${user.last_name}`,
     };
   }
   ```

3. **Reference markdown docs in comments**

   ```typescript
   // See schemas/giglancer-schema.md -> jobs table
   const [jobs] = await giglancerDB.query(
     "SELECT * FROM jobs WHERE status = ?",
     ["active"]
   );
   ```

4. **Keep schemas in version control**
   - Commit generated schemas to git
   - Track schema changes over time
   - Use in code reviews

## ⚠️ Important Notes

- **Bizoforce is huge**: 732 tables (1.7MB schema file)
- **PostgreSQL syntax differs**: Screenly uses `$1, $2` placeholders, not `?`
- **Foreign keys may not exist**: Legacy databases may lack formal FK constraints
- **Indexes are documented**: Use for query optimization
- **Column types vary**: Check nullable, default values before inserting

## 🔗 Related Documentation

- [Database Configuration](../config/database.js)
- [Migration Files](../migrations/)
- [API Implementation](../server/routes/)
- [Dashboard Service](../server/routes/dashboard.ts)

---

**Generated:** November 22, 2025  
**Script:** `scripts/generate-schemas.ts`  
**Total Tables:** 1,183 across 5 databases
