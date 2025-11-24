# Database Schema Generation - Complete

✅ **Successfully generated schemas for all 5 databases!**

## 📊 Generation Summary

Generated on: **November 22, 2025 at 12:50 PM**

| Database      | Type       | Tables    | Files Generated |
| ------------- | ---------- | --------- | --------------- |
| **Unified**   | MySQL      | 12        | ✅ MD, TS, JSON |
| **Bizoforce** | MySQL      | 732       | ✅ MD, TS, JSON |
| **Giglancer** | MySQL      | 162       | ✅ MD, TS, JSON |
| **Work**      | MySQL      | 226       | ✅ MD, TS, JSON |
| **Screenly**  | PostgreSQL | 51        | ✅ MD, TS, JSON |
| **TOTAL**     | -          | **1,183** | **15 files**    |

## 📁 Files Created

### schemas/ Directory (4.4MB total)

```
schemas/
├── README.md                    (Documentation overview)
├── QUICK-REFERENCE.md          (Quick lookup guide)
│
├── unified-schema.md           (16KB)  - Human-readable docs
├── unified-types.ts            (4KB)   - TypeScript interfaces
├── unified-schema.json         (42KB)  - Machine-readable JSON
│
├── bizoforce-schema.md         (648KB) - WordPress/WooCommerce docs
├── bizoforce-types.ts          (188KB) - 732 TypeScript interfaces
├── bizoforce-schema.json       (1.7MB) - Complete WP schema
│
├── giglancer-schema.md         (159KB) - Job marketplace docs
├── giglancer-types.ts          (52KB)  - 162 TypeScript interfaces
├── giglancer-schema.json       (424KB) - Complete schema
│
├── work-schema.md              (262KB) - Project management docs
├── work-types.ts               (62KB)  - 226 TypeScript interfaces
├── work-schema.json            (642KB) - Complete schema
│
├── screenly-schema.md          (71KB)  - AI screening docs
├── screenly-types.ts           (25KB)  - 51 TypeScript interfaces
└── screenly-schema.json        (193KB) - Complete PostgreSQL schema
```

## 🎯 What Each File Type Contains

### Markdown Files (\*.md)

- **Purpose**: Human-readable documentation
- **Contains**:
  - Table of contents with anchor links
  - Complete column definitions
  - Data types and constraints
  - Indexes and foreign keys
- **Use**: Quick reference during development

### TypeScript Files (\*.ts)

- **Purpose**: Type-safe database models
- **Contains**:
  - Interface for each table
  - Proper TypeScript types for columns
  - Optional fields marked with `?`
- **Use**: Import in your API routes for type safety

### JSON Files (\*.json)

- **Purpose**: Machine-readable schema
- **Contains**:
  - Complete table structure
  - Column metadata
  - Indexes and foreign keys
  - Database metadata
- **Use**: Code generation, validation, tooling

## 🚀 Usage Examples

### 1. Quick Table Lookup

```bash
# Search for a table across all databases
grep -r "table_name" schemas/*.md

# Find all tables with "user" in the name
grep "^## " schemas/*.md | grep -i user
```

### 2. Use TypeScript Interfaces

```typescript
// Import types from generated files
import { UnifiedUsers, UserRoles } from "@/schemas/unified-types";
import { WpPosts, WpUsers } from "@/schemas/bizoforce-types";
import { Jobs } from "@/schemas/giglancer-types";

// Type-safe function
async function getUser(userId: number): Promise<UnifiedUsers | null> {
  const [rows] = await unifiedDB.query<UnifiedUsers[]>(
    "SELECT * FROM unified_users WHERE id = ?",
    [userId]
  );
  return rows[0] || null;
}
```

### 3. Validate Table Structure

```typescript
import unifiedSchema from "@/schemas/unified-schema.json";

// Get table structure
const userRolesTable = unifiedSchema.tables.find(
  (t) => t.tableName === "user_roles"
);

console.log(
  "Columns:",
  userRolesTable.columns.map((c) => c.name)
);
// Output: ['id', 'user_id', 'role', 'platform', 'company_id', ...]
```

## 📖 Key Tables by Database

### Unified (12 tables)

- `unified_users` - Master user registry
- `user_roles` - Multi-role assignments
- `unified_companies` - Company profiles
- `company_users` - Company member assignments
- `user_sessions` - Session storage
- `role_permissions` - Role permissions

### Bizoforce (732 tables - WordPress/WooCommerce)

Core tables:

- `wp_users` - WordPress users (198K+)
- `wp_usermeta` - User metadata
- `wp_posts` - Products, orders, pages
- `wp_postmeta` - Product/order metadata
- `wp_woocommerce_order_items` - Order line items
- `wp_wc_orders` - WooCommerce orders (HPOS)
- `wc_vendors_*` - Vendor marketplace tables

### Giglancer (162 tables - Job Marketplace)

Key tables:

- `users` - Job seekers & employers (82K+)
- `jobs` - Job postings
- `job_applications` - Applications
- `freelancer_profiles` - Freelancer details
- `companies` - Employer companies
- `job_categories` - Job categories

### Work (226 tables - Project Management)

Important tables:

- `users` - Team members (1.1K+)
- `projects` - Project management
- `project_time_logs` - Timesheet entries
- `invoices` - Billing & invoices
- `attendances` - Attendance tracking
- `project_members` - Team assignments

### Screenly (51 tables - AI Screening)

Main tables:

- `users` - Platform users
- `companies` - Company accounts
- `candidates` - Job candidates
- `screenings` - AI screening results
- `interviews` - Interview schedules
- `questions` - Screening questions

## 🔄 Regenerating Schemas

To regenerate schemas after database changes:

```bash
# Run the schema generator
npm run generate-schemas

# Or directly with tsx
npx tsx scripts/generate-schemas.ts
```

**When to regenerate:**

- After running migrations
- When tables are added/modified
- Before major releases
- When debugging column name issues

## ⚠️ Important Notes

1. **Bizoforce is HUGE**: 732 tables (1.7MB JSON file)

   - Contains all WordPress core tables
   - Includes WooCommerce tables
   - Has vendor marketplace extensions
   - Use search to find specific tables

2. **PostgreSQL syntax differs**: Screenly uses PostgreSQL

   - Use `$1, $2` placeholders instead of `?`
   - Different data types
   - Case-sensitive by default

3. **Column names vary**: Always check schema before querying

   - Example: `user_roles.role` NOT `user_roles.role_name`
   - Example: `unified_users.id` NOT `unified_users.user_id`

4. **Foreign keys may not exist**: Legacy databases
   - Documented in schema but may not be enforced
   - Check manually when joining tables

## 📚 Documentation Links

- [Schemas Overview](./schemas/README.md)
- [Quick Reference Guide](./schemas/QUICK-REFERENCE.md)
- [Unified Schema](./schemas/unified-schema.md)
- [Bizoforce Schema](./schemas/bizoforce-schema.md)
- [Giglancer Schema](./schemas/giglancer-schema.md)
- [Work Schema](./schemas/work-schema.md)
- [Screenly Schema](./schemas/screenly-schema.md)

## 🎉 Benefits

✅ **Type Safety**: TypeScript interfaces prevent typos and type errors  
✅ **Documentation**: Complete schema docs for all developers  
✅ **Quick Reference**: Find tables and columns instantly  
✅ **Code Generation**: JSON schemas for automated tooling  
✅ **Version Control**: Track schema changes over time  
✅ **API Development**: Know exact table structure before coding

## 🔧 Generated By

**Script**: `scripts/generate-schemas.ts`  
**Date**: November 22, 2025  
**Total Execution Time**: ~8 seconds  
**Total Files**: 15 files (3 per database)  
**Total Size**: 4.4MB

---

**Next Steps:**

1. ✅ Schemas generated
2. ✅ Documentation created
3. ✅ TypeScript types available
4. 🎯 Start using in API development
5. 🎯 Import types in route handlers
6. 🎯 Reference markdown docs when writing queries
