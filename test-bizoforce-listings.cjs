/**
 * Test Script: Find Bizoforce Company Listings
 *
 * This script implements the new logic:
 * 1. Search by email in wp_users
 * 2. Find user ID
 * 3. Search wp_wpbdp_listings table (Business Directory Plugin)
 * 4. Get listing details from wp_posts
 * 5. Find company metadata from wp_postmeta
 * 6. Make the first listing the PRIMARY company
 */

const mysql = require("mysql2/promise");
require("dotenv").config();

const TEST_EMAIL = "bala@bizofit.com"; // User with 55K+ listings for testing

async function testBizoforceListings() {
  console.log("\n" + "=".repeat(80));
  console.log("🔍 BIZOFORCE COMPANY LISTINGS TEST");
  console.log("   Email: " + TEST_EMAIL);
  console.log("=".repeat(80) + "\n");

  const pool = mysql.createPool({
    host: process.env.BIZOFORCE_DB_HOST,
    user: process.env.BIZOFORCE_DB_USER,
    password: process.env.BIZOFORCE_DB_PASS,
    database: process.env.BIZOFORCE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  try {
    // STEP 1: Find user by email
    console.log("📋 STEP 1: Finding user by email...\n");
    const [userRows] = await pool.execute(
      `SELECT ID, user_email, display_name, user_registered 
       FROM wp_users 
       WHERE user_email = ?`,
      [TEST_EMAIL]
    );

    if (userRows.length === 0) {
      console.log("❌ User not found in Bizoforce database!");
      return;
    }

    const user = userRows[0];
    console.log("✅ User found:");
    console.log(`   ID: ${user.ID}`);
    console.log(`   Email: ${user.user_email}`);
    console.log(`   Name: ${user.display_name}`);
    console.log(`   Registered: ${user.user_registered}`);

    // STEP 2: Find listings in wp_wpbdp_listings
    console.log("\n📋 STEP 2: Searching wp_wpbdp_listings table...\n");
    const [bdpListings] = await pool.execute(
      `SELECT 
        l.listing_id,
        l.listing_status,
        l.fee_id,
        l.is_sticky,
        l.expiration_date,
        p.post_title,
        p.post_status,
        p.post_date,
        p.post_modified
      FROM wp_wpbdp_listings l
      INNER JOIN wp_posts p ON l.listing_id = p.ID
      WHERE p.post_author = ?
      ORDER BY l.is_sticky DESC, p.post_date DESC`,
      [user.ID]
    );

    console.log(
      `Found ${bdpListings.length} listing(s) in Business Directory Plugin\n`
    );

    if (bdpListings.length > 0) {
      for (let i = 0; i < bdpListings.length; i++) {
        const listing = bdpListings[i];
        console.log(
          `Listing ${i + 1}${i === 0 ? " (PRIMARY - First listing)" : ""}:`
        );
        console.log(`   Listing ID: ${listing.listing_id}`);
        console.log(`   Title: ${listing.post_title}`);
        console.log(
          `   Status: ${listing.listing_status} (Post: ${listing.post_status})`
        );
        console.log(`   Sticky: ${listing.is_sticky ? "YES" : "NO"}`);
        console.log(`   Created: ${listing.post_date}`);
        console.log(`   Expires: ${listing.expiration_date || "Never"}`);

        // Get listing metadata
        const [metadata] = await pool.execute(
          `SELECT meta_key, meta_value 
           FROM wp_postmeta 
           WHERE post_id = ? 
           AND meta_key IN (
             '_company_name', '_company_website', '_company_email', 
             '_company_phone', '_company_tagline', '_company_description',
             'business_name', 'company_name', 'website', 'email', 'phone'
           )
           ORDER BY meta_key`,
          [listing.listing_id]
        );

        if (metadata.length > 0) {
          console.log("   Metadata:");
          metadata.forEach((m) => {
            console.log(`      ${m.meta_key}: ${m.meta_value}`);
          });
        }
        console.log("");
      }
    } else {
      console.log("⚠️  No listings found in Business Directory Plugin");
    }

    // STEP 3: Also check for 'listing' post type (custom listings)
    console.log("\n📋 STEP 3: Checking for custom listing post types...\n");
    const [customListings] = await pool.execute(
      `SELECT 
        ID, 
        post_title, 
        post_type,
        post_status, 
        post_date,
        post_modified
      FROM wp_posts 
      WHERE post_author = ? 
      AND post_type = 'listing'
      ORDER BY post_date DESC
      LIMIT 20`,
      [user.ID]
    );

    console.log(`Found ${customListings.length} custom listing(s)\n`);

    if (customListings.length > 0) {
      for (let i = 0; i < customListings.length; i++) {
        const listing = customListings[i];
        console.log(
          `Custom Listing ${i + 1}${
            i === 0 ? " (PRIMARY if no BDP listings)" : ""
          }:`
        );
        console.log(`   Post ID: ${listing.ID}`);
        console.log(`   Title: ${listing.post_title}`);
        console.log(`   Type: ${listing.post_type}`);
        console.log(`   Status: ${listing.post_status}`);
        console.log(`   Created: ${listing.post_date}`);

        // Get metadata
        const [metadata] = await pool.execute(
          `SELECT meta_key, meta_value 
           FROM wp_postmeta 
           WHERE post_id = ? 
           AND meta_key LIKE '%company%'
           ORDER BY meta_key
           LIMIT 20`,
          [listing.ID]
        );

        if (metadata.length > 0) {
          console.log("   Company Metadata:");
          metadata.forEach((m) => {
            const value =
              m.meta_value.length > 100
                ? m.meta_value.substring(0, 100) + "..."
                : m.meta_value;
            console.log(`      ${m.meta_key}: ${value}`);
          });
        }
        console.log("");
      }
    } else {
      console.log("⚠️  No custom listings found");
    }

    // STEP 4: Check vendor shop (WooCommerce)
    console.log("\n📋 STEP 4: Checking for vendor shop (WooCommerce)...\n");
    const [vendorMeta] = await pool.execute(
      `SELECT meta_key, meta_value 
       FROM wp_usermeta 
       WHERE user_id = ? 
       AND meta_key IN ('pv_shop_name', 'pv_shop_description', 'pv_shop_html_enabled')
       ORDER BY meta_key`,
      [user.ID]
    );

    if (vendorMeta.length > 0) {
      console.log("✅ Vendor shop metadata found:");
      vendorMeta.forEach((m) => {
        console.log(`   ${m.meta_key}: ${m.meta_value}`);
      });

      // Count products
      const [productCount] = await pool.execute(
        `SELECT COUNT(*) as count 
         FROM wp_posts 
         WHERE post_author = ? 
         AND post_type = 'product' 
         AND post_status = 'publish'`,
        [user.ID]
      );
      console.log(`   Products: ${productCount[0].count}`);
    } else {
      console.log("⚠️  No vendor shop found");
    }

    // SUMMARY
    console.log("\n" + "=".repeat(80));
    console.log("📊 SUMMARY & RECOMMENDATIONS");
    console.log("=".repeat(80) + "\n");

    let primaryCompany = null;
    let companySource = null;

    if (bdpListings.length > 0) {
      primaryCompany = bdpListings[0];
      companySource = "Business Directory Plugin (wp_wpbdp_listings)";
      console.log("✅ PRIMARY COMPANY SOURCE: Business Directory Plugin");
      console.log(`   Company Name: ${primaryCompany.post_title}`);
      console.log(`   Listing ID: ${primaryCompany.listing_id}`);
      console.log(`   Status: ${primaryCompany.listing_status}`);
      console.log(`   Created: ${primaryCompany.post_date}`);
    } else if (customListings.length > 0) {
      primaryCompany = customListings[0];
      companySource = "Custom Listing Post Type";
      console.log("⚠️  PRIMARY COMPANY SOURCE: Custom Listing (fallback)");
      console.log(`   Company Name: ${primaryCompany.post_title}`);
      console.log(`   Post ID: ${primaryCompany.ID}`);
      console.log(`   Status: ${primaryCompany.post_status}`);
      console.log(`   Created: ${primaryCompany.post_date}`);
    } else if (vendorMeta.length > 0) {
      companySource = "WooCommerce Vendor Shop";
      const shopName = vendorMeta.find((m) => m.meta_key === "pv_shop_name");
      console.log("⚠️  PRIMARY COMPANY SOURCE: WooCommerce Vendor (fallback)");
      if (shopName) {
        console.log(`   Shop Name: ${shopName.meta_value}`);
      }
    } else {
      console.log("❌ NO COMPANY FOUND for this user in Bizoforce");
      console.log("   User exists but has not created any:");
      console.log("   - Business directory listings");
      console.log("   - Custom listings");
      console.log("   - Vendor shop");
    }

    if (primaryCompany) {
      console.log("\n📝 IMPLEMENTATION NOTES:");
      console.log(
        "   1. Update CompanyAggregationService.getBizoforceCompanies()"
      );
      console.log("   2. Priority order:");
      console.log(
        "      a) wp_wpbdp_listings (Business Directory) - HIGHEST PRIORITY"
      );
      console.log('      b) Custom "listing" post type - MEDIUM PRIORITY');
      console.log("      c) WooCommerce vendor shop - LOWEST PRIORITY");
      console.log("   3. First listing = PRIMARY company");
      console.log("   4. Additional listings = secondary companies");
    }

    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  } finally {
    await pool.end();
  }
}

// Run the test
testBizoforceListings()
  .then(() => {
    console.log("✅ Test completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
