import { Pool } from "pg";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configurations
const databases = {
  unified: {
    type: "mysql",
    config: {
      host: process.env.UNIFIED_DB_HOST || "72.167.148.100",
      port: parseInt(process.env.UNIFIED_DB_PORT || "3306"),
      user: process.env.UNIFIED_DB_USER || "bizoforce_newdashboard",
      password: process.env.UNIFIED_DB_PASS || "i&B4{NKC~!6cLC*r",
      database: process.env.UNIFIED_DB_NAME || "bizoforce_newdashboard",
    },
  },
  bizoforce: {
    type: "mysql",
    config: {
      host: process.env.BIZOFORCE_DB_HOST || "72.167.148.100",
      port: parseInt(process.env.BIZOFORCE_DB_PORT || "3306"),
      user: process.env.BIZOFORCE_DB_USER || "bizoforceOct2018",
      password: process.env.BIZOFORCE_DB_PASS || "Oct@2022",
      database:
        process.env.BIZOFORCE_DB_NAME || "bizoforce_BizoforceGodaddyOct292025",
    },
  },
  giglancer: {
    type: "mysql",
    config: {
      host: process.env.GIGLANCER_DB_HOST || "72.167.148.100",
      port: parseInt(process.env.GIGLANCER_DB_PORT || "3306"),
      user: process.env.GIGLANCER_DB_USER || "giglancerusr",
      password: process.env.GIGLANCER_DB_PASS || "Giglancer123@",
      database: process.env.GIGLANCER_DB_NAME || "giglancer_bizoforce",
    },
  },
  work: {
    type: "mysql",
    config: {
      host: process.env.WORK_DB_HOST || "72.167.148.100",
      port: parseInt(process.env.WORK_DB_PORT || "3306"),
      user: process.env.WORK_DB_USER || "worksuiteusr",
      password: process.env.WORK_DB_PASS || "Worksuite123@",
      database: process.env.WORK_DB_NAME || "worksuite_old",
    },
  },
  screenly: {
    type: "postgres",
    config: {
      host: process.env.SCREENLY_DB_HOST || "72.167.148.100",
      port: parseInt(process.env.SCREENLY_DB_PORT || "5432"),
      user: process.env.SCREENLY_DB_USER || "postgres",
      password: process.env.SCREENLY_DB_PASS || "Postgres123@",
      database: process.env.SCREENLY_DB_NAME || "screenly_new",
    },
  },
};

interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  default: string | null;
  key: string;
  extra: string;
}

interface TableSchema {
  tableName: string;
  columns: ColumnInfo[];
  indexes: any[];
  foreignKeys: any[];
}

interface DatabaseSchema {
  databaseName: string;
  type: "mysql" | "postgres";
  tables: TableSchema[];
  totalTables: number;
  generatedAt: string;
}

async function getMySQLSchema(
  config: any,
  dbName: string
): Promise<DatabaseSchema> {
  const connection = await mysql.createConnection(config);

  try {
    // Get all tables
    const [tables] = await connection.query<any[]>(
      `SELECT TABLE_NAME 
       FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ?
       ORDER BY TABLE_NAME`,
      [config.database]
    );

    const schema: DatabaseSchema = {
      databaseName: dbName,
      type: "mysql",
      tables: [],
      totalTables: tables.length,
      generatedAt: new Date().toISOString(),
    };

    console.log(`\n📊 ${dbName}: Found ${tables.length} tables`);

    for (const table of tables) {
      const tableName = table.TABLE_NAME;

      // Get columns
      const [columns] = await connection.query<any[]>(
        `SELECT 
          COLUMN_NAME as name,
          COLUMN_TYPE as type,
          IS_NULLABLE as nullable,
          COLUMN_DEFAULT as \`default\`,
          COLUMN_KEY as \`key\`,
          EXTRA as extra
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
         ORDER BY ORDINAL_POSITION`,
        [config.database, tableName]
      );

      // Get indexes
      const [indexes] = await connection.query<any[]>(
        `SELECT 
          INDEX_NAME as indexName,
          COLUMN_NAME as columnName,
          NON_UNIQUE as nonUnique,
          INDEX_TYPE as indexType
         FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
         ORDER BY INDEX_NAME, SEQ_IN_INDEX`,
        [config.database, tableName]
      );

      // Get foreign keys
      const [foreignKeys] = await connection.query<any[]>(
        `SELECT 
          CONSTRAINT_NAME as constraintName,
          COLUMN_NAME as columnName,
          REFERENCED_TABLE_NAME as referencedTable,
          REFERENCED_COLUMN_NAME as referencedColumn
         FROM information_schema.KEY_COLUMN_USAGE
         WHERE TABLE_SCHEMA = ? 
         AND TABLE_NAME = ? 
         AND REFERENCED_TABLE_NAME IS NOT NULL`,
        [config.database, tableName]
      );

      schema.tables.push({
        tableName,
        columns: columns.map((col) => ({
          name: col.name,
          type: col.type,
          nullable: col.nullable === "YES",
          default: col.default,
          key: col.key,
          extra: col.extra,
        })),
        indexes,
        foreignKeys,
      });
    }

    return schema;
  } finally {
    await connection.end();
  }
}

async function getPostgreSQLSchema(
  config: any,
  dbName: string
): Promise<DatabaseSchema> {
  const pool = new Pool(config);

  try {
    // Get all tables
    const tablesResult = await pool.query(
      `SELECT table_name 
       FROM information_schema.tables 
       WHERE table_schema = 'public' 
       AND table_type = 'BASE TABLE'
       ORDER BY table_name`
    );

    const schema: DatabaseSchema = {
      databaseName: dbName,
      type: "postgres",
      tables: [],
      totalTables: tablesResult.rows.length,
      generatedAt: new Date().toISOString(),
    };

    console.log(`\n📊 ${dbName}: Found ${tablesResult.rows.length} tables`);

    for (const table of tablesResult.rows) {
      const tableName = table.table_name;

      // Get columns
      const columnsResult = await pool.query(
        `SELECT 
          column_name as name,
          data_type as type,
          is_nullable as nullable,
          column_default as "default",
          CASE 
            WHEN column_name IN (
              SELECT column_name FROM information_schema.key_column_usage 
              WHERE table_name = $1 AND constraint_name LIKE '%_pkey'
            ) THEN 'PRI'
            ELSE ''
          END as key,
          '' as extra
         FROM information_schema.columns
         WHERE table_name = $1
         ORDER BY ordinal_position`,
        [tableName]
      );

      // Get indexes
      const indexesResult = await pool.query(
        `SELECT 
          i.relname as "indexName",
          a.attname as "columnName",
          NOT ix.indisunique as "nonUnique",
          am.amname as "indexType"
         FROM pg_class t
         JOIN pg_index ix ON t.oid = ix.indrelid
         JOIN pg_class i ON i.oid = ix.indexrelid
         JOIN pg_am am ON i.relam = am.oid
         JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
         WHERE t.relname = $1
         ORDER BY i.relname`,
        [tableName]
      );

      // Get foreign keys
      const foreignKeysResult = await pool.query(
        `SELECT
          tc.constraint_name as "constraintName",
          kcu.column_name as "columnName",
          ccu.table_name as "referencedTable",
          ccu.column_name as "referencedColumn"
         FROM information_schema.table_constraints AS tc
         JOIN information_schema.key_column_usage AS kcu
           ON tc.constraint_name = kcu.constraint_name
         JOIN information_schema.constraint_column_usage AS ccu
           ON ccu.constraint_name = tc.constraint_name
         WHERE tc.constraint_type = 'FOREIGN KEY' 
         AND tc.table_name = $1`,
        [tableName]
      );

      schema.tables.push({
        tableName,
        columns: columnsResult.rows.map((col) => ({
          name: col.name,
          type: col.type,
          nullable: col.nullable === "YES",
          default: col.default,
          key: col.key,
          extra: col.extra,
        })),
        indexes: indexesResult.rows,
        foreignKeys: foreignKeysResult.rows,
      });
    }

    return schema;
  } finally {
    await pool.end();
  }
}

function generateMarkdownSchema(schema: DatabaseSchema): string {
  let md = `# ${schema.databaseName.toUpperCase()} Database Schema\n\n`;
  md += `**Database Type:** ${schema.type}\n`;
  md += `**Total Tables:** ${schema.totalTables}\n`;
  md += `**Generated:** ${new Date(schema.generatedAt).toLocaleString()}\n\n`;
  md += `---\n\n`;
  md += `## Table of Contents\n\n`;

  // Generate TOC
  schema.tables.forEach((table, idx) => {
    md += `${idx + 1}. [${table.tableName}](#${table.tableName
      .toLowerCase()
      .replace(/_/g, "-")})\n`;
  });

  md += `\n---\n\n`;

  // Generate table details
  schema.tables.forEach((table) => {
    md += `## ${table.tableName}\n\n`;

    // Columns
    md += `### Columns\n\n`;
    md += `| Column Name | Type | Nullable | Default | Key | Extra |\n`;
    md += `|-------------|------|----------|---------|-----|-------|\n`;

    table.columns.forEach((col) => {
      md += `| \`${col.name}\` | ${col.type} | ${
        col.nullable ? "YES" : "NO"
      } | ${col.default || "NULL"} | ${col.key} | ${col.extra} |\n`;
    });

    // Indexes
    if (table.indexes.length > 0) {
      md += `\n### Indexes\n\n`;
      md += `| Index Name | Column | Unique | Type |\n`;
      md += `|------------|--------|--------|------|\n`;

      table.indexes.forEach((idx) => {
        md += `| ${idx.indexName} | ${idx.columnName} | ${
          idx.nonUnique ? "NO" : "YES"
        } | ${idx.indexType} |\n`;
      });
    }

    // Foreign Keys
    if (table.foreignKeys.length > 0) {
      md += `\n### Foreign Keys\n\n`;
      md += `| Constraint | Column | References |\n`;
      md += `|------------|--------|------------|\n`;

      table.foreignKeys.forEach((fk) => {
        md += `| ${fk.constraintName} | ${fk.columnName} | ${fk.referencedTable}.${fk.referencedColumn} |\n`;
      });
    }

    md += `\n---\n\n`;
  });

  return md;
}

function generateTypeScriptInterface(schema: DatabaseSchema): string {
  let ts = `// ${schema.databaseName.toUpperCase()} Database TypeScript Interfaces\n`;
  ts += `// Generated: ${new Date(schema.generatedAt).toLocaleString()}\n`;
  ts += `// Database Type: ${schema.type}\n`;
  ts += `// Total Tables: ${schema.totalTables}\n\n`;

  schema.tables.forEach((table) => {
    const interfaceName = table.tableName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    ts += `export interface ${interfaceName} {\n`;

    table.columns.forEach((col) => {
      const tsType = mapToTypeScriptType(col.type, schema.type);
      const optional = col.nullable ? "?" : "";
      ts += `  ${col.name}${optional}: ${tsType};\n`;
    });

    ts += `}\n\n`;
  });

  return ts;
}

function mapToTypeScriptType(
  sqlType: string,
  dbType: "mysql" | "postgres"
): string {
  const type = sqlType.toLowerCase();

  // Integer types
  if (
    type.includes("int") ||
    type.includes("serial") ||
    type.includes("bigserial")
  ) {
    return "number";
  }

  // Float/Decimal types
  if (
    type.includes("decimal") ||
    type.includes("float") ||
    type.includes("double") ||
    type.includes("numeric")
  ) {
    return "number";
  }

  // String types
  if (
    type.includes("char") ||
    type.includes("text") ||
    type.includes("varchar") ||
    type.includes("enum")
  ) {
    return "string";
  }

  // Date types
  if (
    type.includes("date") ||
    type.includes("time") ||
    type.includes("timestamp")
  ) {
    return "Date | string";
  }

  // Boolean
  if (type.includes("bool") || type.includes("tinyint(1)")) {
    return "boolean";
  }

  // JSON
  if (type.includes("json")) {
    return "any";
  }

  // Blob/Binary
  if (
    type.includes("blob") ||
    type.includes("binary") ||
    type.includes("bytea")
  ) {
    return "Buffer";
  }

  return "any";
}

async function main() {
  console.log("🚀 Generating database schemas...\n");

  const schemasDir = path.join(__dirname, "..", "schemas");
  if (!fs.existsSync(schemasDir)) {
    fs.mkdirSync(schemasDir, { recursive: true });
  }

  for (const [dbName, dbConfig] of Object.entries(databases)) {
    try {
      console.log(`\n📡 Connecting to ${dbName}...`);

      let schema: DatabaseSchema;

      if (dbConfig.type === "mysql") {
        schema = await getMySQLSchema(dbConfig.config, dbName);
      } else {
        schema = await getPostgreSQLSchema(dbConfig.config, dbName);
      }

      // Generate markdown documentation
      const markdown = generateMarkdownSchema(schema);
      const mdPath = path.join(schemasDir, `${dbName}-schema.md`);
      fs.writeFileSync(mdPath, markdown);
      console.log(`✅ Generated: ${mdPath}`);

      // Generate TypeScript interfaces
      const typescript = generateTypeScriptInterface(schema);
      const tsPath = path.join(schemasDir, `${dbName}-types.ts`);
      fs.writeFileSync(tsPath, typescript);
      console.log(`✅ Generated: ${tsPath}`);

      // Generate JSON schema
      const jsonPath = path.join(schemasDir, `${dbName}-schema.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(schema, null, 2));
      console.log(`✅ Generated: ${jsonPath}`);
    } catch (error) {
      console.error(`❌ Error generating schema for ${dbName}:`, error);
    }
  }

  console.log("\n✨ Schema generation complete!\n");
  console.log(`📁 Schemas saved to: ${schemasDir}`);
}

main().catch(console.error);
