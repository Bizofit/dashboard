/**
 * Test script to find all companies for info.webkit24@gmail.com across all databases
 *
 * This shows exactly how the company aggregation service works
 */

const mysql = require("mysql2/promise");
require("dotenv").config();

const userEmail = "info.webkit24@gmail.com";
const userId = 1042; // From unified database

async function testUserCompanies() {
  console.log("\n" + "=".repeat(80));
  console.log("🔍 COMPANY AGGREGATION TEST FOR: " + userEmail);
  console.log("=".repeat(80) + "\n");

  // Create connection pools
  const unifiedPool = mysql.createPool({
    host: process.env.UNIFIED_DB_HOST,
    user: process.env.UNIFIED_DB_USER,
    password: process.env.UNIFIED_DB_PASS,
    database: process.env.UNIFIED_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  const bizoforcePool = mysql.createPool({
    host: process.env.BIZOFORCE_DB_HOST,
    user: process.env.BIZOFORCE_DB_USER,
    password: process.env.BIZOFORCE_DB_PASS,
    database: process.env.BIZOFORCE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  const workPool = mysql.createPool({
    host: process.env.WORK_DB_HOST,
    user: process.env.WORK_DB_USER,
    password: process.env.WORK_DB_PASS,
    database: process.env.WORK_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  try {
    // Step 1: Get user's platform IDs
    console.log(
      "📋 STEP 1: Getting user platform IDs from unified database...\n"
    );
    const [userRows] = await unifiedPool.execute(
      `SELECT id, email, bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id 
       FROM unified_users WHERE email = ?`,
      [userEmail]
    );

    if (userRows.length === 0) {
      console.log("❌ User not found in unified database!");
      return;
    }

    const user = userRows[0];
    console.log("✅ User found:");
    console.log(`   Unified ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Bizoforce ID: ${user.bizoforce_user_id || "NOT LINKED"}`);
    console.log(`   Giglancer ID: ${user.giglancer_user_id || "NOT LINKED"}`);
    console.log(`   Screenly ID: ${user.screenly_user_id || "NOT LINKED"}`);
    console.log(`   Work ID: ${user.work_user_id || "NOT LINKED"}`);

    // Step 2: Check user roles in unified database
    console.log("\n📋 STEP 2: Checking user roles in unified database...\n");
    const [roleRows] = await unifiedPool.execute(
      `SELECT id, user_id, role, source_platform, company_id, is_primary, is_active 
       FROM user_roles WHERE user_id = ?`,
      [user.id]
    );

    console.log(`✅ Found ${roleRows.length} role(s):`);
    roleRows.forEach((role) => {
      console.log(`   - Role: ${role.role}`);
      console.log(`     Platform: ${role.source_platform}`);
      console.log(`     Company ID: ${role.company_id || "NULL"}`);
      console.log(`     Primary: ${role.is_primary ? "YES" : "NO"}`);
      console.log(`     Active: ${role.is_active ? "YES" : "NO"}`);
      console.log("");
    });

    // Step 3: Check companies in unified database
    console.log("📋 STEP 3: Checking companies in unified database...\n");
    const [unifiedCompanies] = await unifiedPool.execute(
      `SELECT id, name, website, industry, size, founded_year 
       FROM companies WHERE id IN (SELECT DISTINCT company_id FROM user_roles WHERE user_id = ?)`,
      [user.id]
    );

    if (unifiedCompanies.length > 0) {
      console.log(
        `✅ Found ${unifiedCompanies.length} company/companies in unified database:`
      );
      unifiedCompanies.forEach((company) => {
        console.log(`   - ${company.name} (ID: ${company.id})`);
        console.log(`     Website: ${company.website || "N/A"}`);
        console.log(`     Industry: ${company.industry || "N/A"}`);
        console.log(`     Size: ${company.size || "N/A"}`);
        console.log("");
      });
    } else {
      console.log("⚠️  No companies found in unified database");
    }

    // Step 4: Check Bizoforce for listings and products
    if (user.bizoforce_user_id) {
      console.log("\n📋 STEP 4: Checking Bizoforce database...\n");
      console.log(
        `   Checking for company listings (post_type = 'listing')...`
      );

      const [listings] = await bizoforcePool.execute(
        `SELECT p.ID, p.post_title, p.post_type, p.post_status, p.post_date 
         FROM wp_posts p 
         WHERE p.post_author = ? 
         AND p.post_type = 'listing' 
         AND p.post_status = 'publish'
         LIMIT 10`,
        [user.bizoforce_user_id]
      );

      if (listings.length > 0) {
        console.log(`   ✅ Found ${listings.length} company listing(s):`);
        for (const listing of listings) {
          console.log(`      - ${listing.post_title} (ID: ${listing.ID})`);

          // Get listing metadata
          const [meta] = await bizoforcePool.execute(
            `SELECT meta_key, meta_value 
             FROM wp_postmeta 
             WHERE post_id = ? 
             AND meta_key IN ('_company_name', '_company_website', '_company_tagline', '_company_email')`,
            [listing.ID]
          );

          meta.forEach((m) => {
            console.log(`        ${m.meta_key}: ${m.meta_value}`);
          });
          console.log("");
        }
      } else {
        console.log("   ⚠️  No company listings found");
      }

      console.log(`   Checking for products (vendor role)...`);
      const [products] = await bizoforcePool.execute(
        `SELECT ID, post_title, post_type, post_status 
         FROM wp_posts 
         WHERE post_author = ? 
         AND post_type = 'product' 
         AND post_status = 'publish'
         LIMIT 5`,
        [user.bizoforce_user_id]
      );

      if (products.length > 0) {
        console.log(
          `   ✅ Found ${products.length} product(s) - User is a VENDOR:`
        );
        products.forEach((product) => {
          console.log(`      - ${product.post_title} (ID: ${product.ID})`);
        });
      } else {
        console.log("   ⚠️  No products found - Not a vendor");
      }
    } else {
      console.log("\n⚠️  STEP 4: User not linked to Bizoforce database");
    }

    // Step 5: Check Work.Bizoforce database
    if (user.work_user_id) {
      console.log("\n📋 STEP 5: Checking Work.Bizoforce database...\n");

      const [workUser] = await workPool.execute(
        `SELECT id, company_id, name, email, status 
         FROM users WHERE id = ?`,
        [user.work_user_id]
      );

      if (workUser.length > 0) {
        const wu = workUser[0];
        console.log(`   ✅ Work user found:`);
        console.log(`      Name: ${wu.name}`);
        console.log(`      Email: ${wu.email}`);
        console.log(`      Company ID: ${wu.company_id}`);
        console.log(`      Status: ${wu.status}`);

        if (wu.company_id) {
          const [company] = await workPool.execute(
            `SELECT id, company_name, website, address, phone 
             FROM companies WHERE id = ?`,
            [wu.company_id]
          );

          if (company.length > 0) {
            const c = company[0];
            console.log(`\n   ✅ Company found:`);
            console.log(`      Name: ${c.company_name}`);
            console.log(`      Website: ${c.website || "N/A"}`);
            console.log(`      Address: ${c.address || "N/A"}`);
            console.log(`      Phone: ${c.phone || "N/A"}`);
          }
        }
      } else {
        console.log("   ⚠️  Work user not found");
      }
    } else {
      console.log("\n⚠️  STEP 5: User not linked to Work.Bizoforce database");
    }

    // Step 6: Summary
    console.log("\n" + "=".repeat(80));
    console.log("📊 SUMMARY: Companies for " + userEmail);
    console.log("=".repeat(80) + "\n");

    let totalCompanies = 0;

    if (unifiedCompanies.length > 0) {
      console.log(
        `✅ Unified Database: ${unifiedCompanies.length} company/companies`
      );
      totalCompanies += unifiedCompanies.length;
    }

    if (user.bizoforce_user_id) {
      const [listingCount] = await bizoforcePool.execute(
        `SELECT COUNT(*) as count FROM wp_posts 
         WHERE post_author = ? AND post_type = 'listing' AND post_status = 'publish'`,
        [user.bizoforce_user_id]
      );
      if (listingCount[0].count > 0) {
        console.log(
          `✅ Bizoforce: ${listingCount[0].count} company listing(s)`
        );
        totalCompanies += listingCount[0].count;
      }
    }

    if (user.work_user_id) {
      const [workUserCheck] = await workPool.execute(
        `SELECT company_id FROM users WHERE id = ?`,
        [user.work_user_id]
      );
      if (workUserCheck.length > 0 && workUserCheck[0].company_id) {
        console.log(
          `✅ Work.Bizoforce: 1 company (ID: ${workUserCheck[0].company_id})`
        );
        totalCompanies += 1;
      }
    }

    console.log(`\n🎯 TOTAL COMPANIES: ${totalCompanies}`);
    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  } finally {
    await unifiedPool.end();
    await bizoforcePool.end();
    await workPool.end();
  }
}

// Run the test
testUserCompanies()
  .then(() => {
    console.log("✅ Test completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
