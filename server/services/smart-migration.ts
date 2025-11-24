import {
  unifiedDB,
  bizoforcePool,
  giglancerPool,
  screenlyPool,
  workPool,
} from "../db.js";
import { unifiedUsers, userRoles } from "../../shared/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// ============================================
// SMART MIGRATION SERVICE
// ============================================
// Migrates users from 4 legacy platforms with intelligent role detection
// Priority: Work > Screenly > Bizoforce > Giglancer

interface PlatformDetection {
  work?: {
    found: boolean;
    userId: number | null;
    companyId: number | null;
    companyName: string | null;
  };
  screenly?: {
    found: boolean;
    userId: number | null;
    companyName: string | null;
    companyId: number | null;
  };
  bizoforce?: {
    found: boolean;
    userId: number | null;
    isVendor: boolean;
    shopName: string | null;
    hasDirectoryListing: boolean;
    listingName: string | null;
    isAdmin: boolean;
  };
  giglancer?: {
    found: boolean;
    userId: number | null;
    postedProjects: number;
    submittedBids: number;
    accountType: string | null;
  };
}

interface MigrationResult {
  success: boolean;
  userId: number | null;
  email: string;
  roles: string[];
  primaryRole: string;
  needsRoleSelection: boolean;
  platformsFound: string[];
  message: string;
}

/**
 * Step 1: Check Work.Bizoforce (Highest Priority)
 * All Work users are company admins
 */
async function checkWorkPresence(email: string) {
  try {
    const [rows]: any = await workPool.execute(
      `SELECT u.id, ed.company_id, c.company_name
       FROM users u
       LEFT JOIN employee_details ed ON u.id = ed.user_id
       LEFT JOIN companies c ON ed.company_id = c.id
       WHERE u.email = ?
       LIMIT 1`,
      [email]
    );

    if (rows.length > 0) {
      return {
        found: true,
        userId: rows[0].id,
        companyId: rows[0].company_id,
        companyName: rows[0].company_name,
      };
    }

    return { found: false, userId: null, companyId: null, companyName: null };
  } catch (error) {
    console.error("Error checking Work presence:", error);
    return { found: false, userId: null, companyId: null, companyName: null };
  }
}

/**
 * Step 2: Check Screenly (2nd Priority)
 * Users with company_name are company admins
 */
async function checkScreenlyPresence(email: string) {
  try {
    const result = await screenlyPool.query(
      `SELECT id, company_name, company_id
       FROM users
       WHERE email = $1 AND company_name IS NOT NULL
       LIMIT 1`,
      [email]
    );

    if (result.rows.length > 0) {
      return {
        found: true,
        userId: result.rows[0].id,
        companyName: result.rows[0].company_name,
        companyId: result.rows[0].company_id,
      };
    }

    return { found: false, userId: null, companyName: null, companyId: null };
  } catch (error) {
    console.error("Error checking Screenly presence:", error);
    return { found: false, userId: null, companyName: null, companyId: null };
  }
}

/**
 * Step 3: Check Bizoforce (3rd Priority)
 * Vendors, admins, and directory listings are business users
 */
async function checkBizoforcePresence(email: string) {
  try {
    // Check wp_users
    const [userRows]: any = await bizoforcePool.execute(
      `SELECT ID FROM wp_users WHERE user_email = ? LIMIT 1`,
      [email]
    );

    if (userRows.length === 0) {
      return {
        found: false,
        userId: null,
        isVendor: false,
        shopName: null,
        hasDirectoryListing: false,
        listingName: null,
        isAdmin: false,
      };
    }

    const userId = userRows[0].ID;

    // Check if vendor (has shop)
    const [vendorRows]: any = await bizoforcePool.execute(
      `SELECT meta_value FROM wp_usermeta 
       WHERE user_id = ? AND meta_key = 'pv_shop_name' LIMIT 1`,
      [userId]
    );

    const isVendor = vendorRows.length > 0;
    const shopName = isVendor ? vendorRows[0].meta_value : null;

    // Check if admin
    const [roleRows]: any = await bizoforcePool.execute(
      `SELECT meta_value FROM wp_usermeta 
       WHERE user_id = ? AND meta_key = 'wp_capabilities' LIMIT 1`,
      [userId]
    );

    const isAdmin =
      roleRows.length > 0 &&
      (roleRows[0].meta_value.includes("administrator") ||
        roleRows[0].meta_value.includes("shop_manager"));

    // Check directory listing
    const [listingRows]: any = await bizoforcePool.execute(
      `SELECT post_title FROM wp_posts 
       WHERE post_author = ? AND post_type = 'wpbdp_listing' 
       AND post_status IN ('publish', 'draft')
       ORDER BY post_status DESC, post_date DESC LIMIT 1`,
      [userId]
    );

    const hasDirectoryListing = listingRows.length > 0;
    const listingName = hasDirectoryListing ? listingRows[0].post_title : null;

    return {
      found: true,
      userId,
      isVendor,
      shopName,
      hasDirectoryListing,
      listingName,
      isAdmin,
    };
  } catch (error) {
    console.error("Error checking Bizoforce presence:", error);
    return {
      found: false,
      userId: null,
      isVendor: false,
      shopName: null,
      hasDirectoryListing: false,
      listingName: null,
      isAdmin: false,
    };
  }
}

/**
 * Step 4: Check Giglancer (4th Priority - Requires Analysis)
 * Posted projects > bids = employer (hr role)
 * Bids > projects = might be job seeker (needs selection)
 */
async function checkGiglancerPresence(email: string) {
  try {
    // Check users table - use pre-counted columns instead of querying separately
    const [userRows]: any = await giglancerPool.execute(
      `SELECT id, role_id, project_count, bid_count, job_count, job_apply_count FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (userRows.length === 0) {
      return {
        found: false,
        userId: null,
        postedProjects: 0,
        submittedBids: 0,
        accountType: null,
      };
    }

    const user = userRows[0];

    return {
      found: true,
      userId: user.id,
      postedProjects: user.project_count || 0,
      submittedBids: user.bid_count || 0,
      accountType: user.role_id, // role_id indicates account type
    };
  } catch (error) {
    console.error("Error checking Giglancer presence:", error);
    return {
      found: false,
      userId: null,
      postedProjects: 0,
      submittedBids: 0,
      accountType: null,
    };
  }
}

/**
 * Determine roles based on platform detection
 */
function determineRoles(detection: PlatformDetection): {
  roles: string[];
  primaryRole: string;
  needsRoleSelection: boolean;
  platformsFound: string[];
} {
  const roles: string[] = [];
  const platformsFound: string[] = [];

  // Priority 1: Work.Bizoforce
  if (detection.work?.found) {
    roles.push("company_admin");
    platformsFound.push("work");
  }

  // Priority 2: Screenly
  if (detection.screenly?.found) {
    if (!roles.includes("company_admin")) {
      roles.push("company_admin");
    }
    platformsFound.push("screenly");
  }

  // Priority 3: Bizoforce
  if (detection.bizoforce?.found) {
    platformsFound.push("bizoforce");

    if (detection.bizoforce.isAdmin) {
      if (!roles.includes("company_admin")) {
        roles.push("company_admin");
      }
    }

    if (
      detection.bizoforce.isVendor ||
      detection.bizoforce.hasDirectoryListing
    ) {
      if (!roles.includes("vendor")) {
        roles.push("vendor");
      }
      if (!roles.includes("company_admin")) {
        roles.push("company_admin");
      }
    }
  }

  // Priority 4: Giglancer
  if (detection.giglancer?.found) {
    platformsFound.push("giglancer");

    if (
      detection.giglancer.postedProjects > detection.giglancer.submittedBids
    ) {
      // Employer - assign HR role
      if (!roles.includes("hr")) {
        roles.push("hr");
      }
      if (!roles.includes("company_admin")) {
        roles.push("company_admin");
      }
    }
  }

  // Determine if needs role selection
  const needsRoleSelection = roles.length === 0;

  // Set primary role
  let primaryRole = "company_admin";
  if (roles.length > 0) {
    // Priority: company_admin > vendor > hr
    if (roles.includes("company_admin")) {
      primaryRole = "company_admin";
    } else if (roles.includes("vendor")) {
      primaryRole = "vendor";
    } else if (roles.includes("hr")) {
      primaryRole = "hr";
    }
  }

  return { roles, primaryRole, needsRoleSelection, platformsFound };
}

/**
 * Migrate a single user with smart role detection
 */
export async function migrateUserWithSmartDetection(
  email: string
): Promise<MigrationResult> {
  try {
    console.log(`🔍 Smart migration for: ${email}`);

    // Check if user already exists in unified DB
    const existingUsers = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    let targetUserId: number | null = null;
    let isExistingUser = false;

    if (existingUsers.length > 0) {
      targetUserId = existingUsers[0].id;
      isExistingUser = true;

      // Check if user already has roles
      const existingRoles = await unifiedDB
        .select()
        .from(userRoles)
        .where(eq(userRoles.userId, targetUserId));

      if (existingRoles.length > 0) {
        return {
          success: true,
          userId: targetUserId,
          email,
          roles: existingRoles.map((r) => r.role),
          primaryRole: existingRoles.find((r) => r.isPrimary)?.role || "",
          needsRoleSelection: false,
          platformsFound: [],
          message: "User already exists with roles",
        };
      }
      // If user exists but has NO roles, continue to assign roles
    }

    // Run detection across all 4 platforms
    const detection: PlatformDetection = {
      work: await checkWorkPresence(email),
      screenly: await checkScreenlyPresence(email),
      bizoforce: await checkBizoforcePresence(email),
      giglancer: await checkGiglancerPresence(email),
    };

    // Determine roles
    const { roles, primaryRole, needsRoleSelection, platformsFound } =
      determineRoles(detection);

    console.log(`📊 Detection results for ${email}:`, {
      platformsFound,
      roles,
      primaryRole,
      needsRoleSelection,
    });

    // If no platforms found, skip user
    if (platformsFound.length === 0) {
      return {
        success: false,
        userId: null,
        email,
        roles: [],
        primaryRole: "",
        needsRoleSelection: false,
        platformsFound: [],
        message: "User not found in any platform",
      };
    }

    // Get user details from first platform found
    let firstName = "User";
    let lastName = "";

    if (detection.work?.found) {
      const [userDetails]: any = await workPool.execute(
        `SELECT name FROM users WHERE id = ? LIMIT 1`,
        [detection.work.userId]
      );
      if (userDetails.length > 0) {
        const nameParts = userDetails[0].name.split(" ");
        firstName = nameParts[0] || "User";
        lastName = nameParts.slice(1).join(" ");
      }
    } else if (detection.bizoforce?.found) {
      const [userDetails]: any = await bizoforcePool.execute(
        `SELECT display_name FROM wp_users WHERE ID = ? LIMIT 1`,
        [detection.bizoforce.userId]
      );
      if (userDetails.length > 0) {
        const nameParts = userDetails[0].display_name.split(" ");
        firstName = nameParts[0] || "User";
        lastName = nameParts.slice(1).join(" ");
      }
    }

    // Create user in unified database if not exists
    if (!isExistingUser) {
      const passwordHash = await bcrypt.hash(
        Math.random().toString(36).substring(7),
        10
      ); // Random password

      const [newUser] = await unifiedDB.insert(unifiedUsers).values({
        email,
        passwordHash,
        firstName,
        lastName,
        authProvider: "local",
        bizoforceUserId: detection.bizoforce?.userId || null,
        giglancerUserId: detection.giglancer?.userId || null,
        screenlyUserId: detection.screenly?.userId || null,
        workUserId: detection.work?.userId || null,
      });

      targetUserId = newUser.insertId;
    } else {
      // Update existing user with platform IDs
      await unifiedDB
        .update(unifiedUsers)
        .set({
          bizoforceUserId: detection.bizoforce?.userId || null,
          giglancerUserId: detection.giglancer?.userId || null,
          screenlyUserId: detection.screenly?.userId || null,
          workUserId: detection.work?.userId || null,
          updatedAt: new Date(),
        })
        .where(eq(unifiedUsers.id, targetUserId!));
    }

    // Ensure targetUserId is valid before creating roles
    if (!targetUserId) {
      throw new Error("Failed to create or retrieve user ID");
    }

    // Create roles if determined
    if (!needsRoleSelection && roles.length > 0) {
      for (const role of roles) {
        await unifiedDB.insert(userRoles).values({
          userId: targetUserId,
          role,
          isPrimary: role === primaryRole,
          isActive: true,
          sourcePlatform: platformsFound[0], // Use first platform as source
        });
      }
    }

    console.log(`✅ Migrated: ${email} with roles: ${roles.join(", ")}`);

    return {
      success: true,
      userId: targetUserId,
      email,
      roles,
      primaryRole,
      needsRoleSelection,
      platformsFound,
      message: `User migrated successfully with ${roles.length} roles`,
    };
  } catch (error) {
    console.error(`❌ Error migrating user ${email}:`, error);
    return {
      success: false,
      userId: null,
      email,
      roles: [],
      primaryRole: "",
      needsRoleSelection: false,
      platformsFound: [],
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Migrate all users from all platforms
 */
export async function migrateAllPlatformUsers(): Promise<{
  total: number;
  migrated: number;
  skipped: number;
  needsRoleSelection: number;
  errors: number;
  details: MigrationResult[];
}> {
  const results: MigrationResult[] = [];

  console.log("🚀 Starting full platform migration...");

  // Get all unique emails from all 4 platforms
  const emails = new Set<string>();

  // Work users
  console.log("📊 Fetching Work users...");
  const [workUsers]: any = await workPool.execute(
    `SELECT DISTINCT email FROM users WHERE email IS NOT NULL AND email != ''`
  );
  workUsers.forEach((row: any) => emails.add(row.email.toLowerCase()));

  // Screenly users
  console.log("📊 Fetching Screenly users...");
  const screenlyUsers = await screenlyPool.query(
    `SELECT DISTINCT email FROM users WHERE email IS NOT NULL AND email != ''`
  );
  screenlyUsers.rows.forEach((row: any) => emails.add(row.email.toLowerCase()));

  // Bizoforce users
  console.log("📊 Fetching Bizoforce users...");
  const [bizoforceUsers]: any = await bizoforcePool.execute(
    `SELECT DISTINCT user_email FROM wp_users WHERE user_email IS NOT NULL AND user_email != ''`
  );
  bizoforceUsers.forEach((row: any) =>
    emails.add(row.user_email.toLowerCase())
  );

  // Giglancer users
  console.log("📊 Fetching Giglancer users...");
  const [giglancerUsers]: any = await giglancerPool.execute(
    `SELECT DISTINCT email FROM users WHERE email IS NOT NULL AND email != ''`
  );
  giglancerUsers.forEach((row: any) => emails.add(row.email.toLowerCase()));

  console.log(
    `📊 Found ${emails.size} unique email addresses across all platforms`
  );

  // Migrate each user
  let migrated = 0;
  let skipped = 0;
  let needsRoleSelection = 0;
  let errors = 0;

  for (const email of emails) {
    const result = await migrateUserWithSmartDetection(email);
    results.push(result);

    if (result.success) {
      if (result.message === "User already exists in unified database") {
        skipped++;
      } else {
        migrated++;
        if (result.needsRoleSelection) {
          needsRoleSelection++;
        }
      }
    } else {
      errors++;
    }

    // Log progress every 100 users
    if ((migrated + skipped + errors) % 100 === 0) {
      console.log(
        `📊 Progress: ${migrated} migrated, ${skipped} skipped, ${errors} errors`
      );
    }
  }

  console.log("✅ Migration complete!");
  console.log(
    `📊 Final stats: ${migrated} migrated, ${skipped} skipped, ${needsRoleSelection} need role selection, ${errors} errors`
  );

  return {
    total: emails.size,
    migrated,
    skipped,
    needsRoleSelection,
    errors,
    details: results,
  };
}
