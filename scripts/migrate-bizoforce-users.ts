import { unifiedDB, bizoforceDB } from "../server/db.js";
import { unifiedUsers, userRoles, companies } from "../shared/schema.js";
import { eq } from "drizzle-orm";

/**
 * Migrate all users from Bizoforce (WordPress) database to unified dashboard
 *
 * This script:
 * 1. Fetches all users from wp_users table
 * 2. Checks if user already exists in unified DB
 * 3. Creates/updates user record
 * 4. Detects user roles (vendor, customer, admin)
 * 5. Creates company records for vendors
 * 6. Assigns appropriate roles
 */

interface BizoforceUser {
  ID: number;
  user_login: string;
  user_email: string;
  user_registered: string;
  display_name: string;
}

interface UserMeta {
  meta_key: string;
  meta_value: string;
}

async function checkBizoforceUserDetails(userId: number) {
  try {
    // Get user metadata
    const [metaRows] = await bizoforceDB.execute<UserMeta[]>(
      `SELECT meta_key, meta_value FROM wp_usermeta WHERE user_id = ?`,
      [userId]
    );

    const metaData: Record<string, string> = {};
    metaRows.forEach((row: UserMeta) => {
      metaData[row.meta_key] = row.meta_value;
    });

    // Check if vendor
    const shopName = metaData["pv_shop_name"] || null;
    const capabilities = metaData["wp_capabilities"] || "";

    let isVendor = false;
    let isAdmin = false;
    let isShopManager = false;

    if (capabilities) {
      isVendor = capabilities.includes("vendor");
      isAdmin = capabilities.includes("administrator");
      isShopManager = capabilities.includes("shop_manager");
    }

    // Check for products
    const [productRows] = await bizoforceDB.execute<any[]>(
      `SELECT COUNT(*) as count FROM wp_posts 
       WHERE post_author = ? AND post_type = 'product' AND post_status = 'publish'`,
      [userId]
    );
    const hasProducts = productRows[0]?.count > 0;

    // Check for orders (as vendor)
    const [orderRows] = await bizoforceDB.execute<any[]>(
      `SELECT COUNT(*) as count FROM wp_posts 
       WHERE post_author = ? AND post_type = 'shop_order'`,
      [userId]
    );
    const hasOrders = orderRows[0]?.count > 0;

    // Check for directory listings
    const [listingRows] = await bizoforceDB.execute<any[]>(
      `SELECT post_title FROM wp_posts 
       WHERE post_author = ? AND post_type = 'bddp_listing' AND post_status = 'publish'
       LIMIT 1`,
      [userId]
    );
    const listingTitle = listingRows[0]?.post_title || null;

    const hasCompany =
      isVendor ||
      isAdmin ||
      isShopManager ||
      hasProducts ||
      hasOrders ||
      !!listingTitle;
    let companyName = null;

    if (hasCompany) {
      companyName =
        listingTitle ||
        shopName ||
        `${metaData["first_name"] || "User"}'s Company`;
    }

    // Get first and last name
    const firstName = metaData["first_name"] || null;
    const lastName = metaData["last_name"] || null;
    const phone = metaData["billing_phone"] || null;

    return {
      userId,
      shopName,
      isVendor,
      isAdmin,
      isShopManager,
      hasProducts,
      hasOrders,
      hasCompany,
      companyName,
      firstName,
      lastName,
      phone,
      listingTitle,
    };
  } catch (error) {
    console.error(`Error checking Bizoforce user ${userId}:`, error);
    return null;
  }
}

async function determineUserRole(details: any) {
  const roles: string[] = [];

  // Company roles
  if (details.isAdmin) {
    roles.push("company_admin");
  } else if (details.isVendor || details.hasProducts || details.hasOrders) {
    roles.push("vendor");
  } else if (details.isShopManager) {
    roles.push("team_lead");
  }

  // Default role if no company role found
  if (roles.length === 0) {
    roles.push("job_seeker"); // Default for customers/basic users
  }

  return {
    roles,
    primaryRole: roles[0],
  };
}

async function createCompanyIfNeeded(userId: number, companyName: string) {
  try {
    // Check if company already exists
    const existingCompanies = await unifiedDB
      .select()
      .from(companies)
      .where(eq(companies.name, companyName))
      .limit(1);

    if (existingCompanies.length > 0) {
      return existingCompanies[0].id;
    }

    // Create new company
    const [newCompany] = await unifiedDB
      .insert(companies)
      .values({
        name: companyName,
        description: `Company from Bizoforce migration`,
      })
      .$returningId();

    return newCompany.id;
  } catch (error) {
    console.error(`Error creating company ${companyName}:`, error);
    return null;
  }
}

async function migrateBizoforceUsers() {
  console.log("🚀 Starting Bizoforce user migration...\n");

  try {
    // Get all users from Bizoforce
    const [users] = await bizoforceDB.execute<BizoforceUser[]>(
      `SELECT ID, user_login, user_email, user_registered, display_name 
       FROM wp_users 
       ORDER BY ID ASC`
    );

    console.log(`📊 Found ${users.length} users in Bizoforce database\n`);

    let migrated = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const progress = Math.round(((i + 1) / users.length) * 100);

      try {
        // Check if user already exists in unified DB
        const existingUsers = await unifiedDB
          .select()
          .from(unifiedUsers)
          .where(eq(unifiedUsers.email, user.user_email))
          .limit(1);

        // Get user details from Bizoforce
        const details = await checkBizoforceUserDetails(user.ID);

        if (!details) {
          console.log(
            `⚠️  [${progress}%] Skipped ${user.user_email} - Could not fetch details`
          );
          skipped++;
          continue;
        }

        const { roles, primaryRole } = await determineUserRole(details);

        // Create or get company ID
        let companyId: number | null = null;
        if (details.hasCompany && details.companyName) {
          companyId = await createCompanyIfNeeded(user.ID, details.companyName);
        }

        let userId: number;

        if (existingUsers.length > 0) {
          // Update existing user
          userId = existingUsers[0].id;

          await unifiedDB
            .update(unifiedUsers)
            .set({
              bizoforceUserId: user.ID,
              firstName: details.firstName || existingUsers[0].firstName,
              lastName: details.lastName || existingUsers[0].lastName,
              phone: details.phone || existingUsers[0].phone,
            })
            .where(eq(unifiedUsers.id, userId));

          updated++;
          console.log(
            `✅ [${progress}%] Updated ${user.user_email} - ${primaryRole}`
          );
        } else {
          // Create new user
          const [newUser] = await unifiedDB
            .insert(unifiedUsers)
            .values({
              email: user.user_email,
              firstName:
                details.firstName ||
                user.display_name.split(" ")[0] ||
                user.user_login,
              lastName:
                details.lastName ||
                user.display_name.split(" ").slice(1).join(" ") ||
                "",
              phone: details.phone,
              bizoforceUserId: user.ID,
              authProvider: "local",
              createdAt: new Date(user.user_registered),
            })
            .$returningId();

          userId = newUser.id;
          migrated++;
          console.log(
            `✨ [${progress}%] Created ${user.user_email} - ${primaryRole}`
          );
        }

        // Delete existing roles
        await unifiedDB.delete(userRoles).where(eq(userRoles.userId, userId));

        // Create new roles
        for (const role of roles) {
          await unifiedDB.insert(userRoles).values({
            userId,
            role,
            companyId,
            isPrimary: role === primaryRole,
            sourcePlatform: "bizoforce",
          });
        }
      } catch (error) {
        errors++;
        console.error(
          `❌ [${progress}%] Error migrating ${user.user_email}:`,
          error
        );
      }

      // Progress update every 100 users
      if ((i + 1) % 100 === 0) {
        console.log(
          `\n📈 Progress: ${i + 1}/${users.length} users processed\n`
        );
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ Migration Complete!");
    console.log("=".repeat(60));
    console.log(`📊 Statistics:`);
    console.log(`   • Total users: ${users.length}`);
    console.log(`   • New users created: ${migrated}`);
    console.log(`   • Existing users updated: ${updated}`);
    console.log(`   • Skipped: ${skipped}`);
    console.log(`   • Errors: ${errors}`);
    console.log("=".repeat(60) + "\n");
  } catch (error) {
    console.error("❌ Fatal error during migration:", error);
    throw error;
  }
}

// Run migration
migrateBizoforceUsers()
  .then(() => {
    console.log("✅ Migration script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Migration script failed:", error);
    process.exit(1);
  });
