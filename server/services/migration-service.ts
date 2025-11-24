import {
  unifiedDB,
  bizoforceDB,
  bizoforcePool,
  giglancerDB,
  giglancerPool,
  screenlyDB,
  screenlyPool,
  workDB,
  workPool,
} from "../db.js";
import { unifiedUsers, userRoles, companies } from "../../shared/schema.js";
import { eq } from "drizzle-orm";

export interface MigrationProgress {
  step: string;
  progress: number;
  message: string;
}

export interface UserMigrationResult {
  userId: number;
  email: string;
  isNewUser: boolean;
  isTrulyNewUser: boolean; // No data in any platform
  platformIds: {
    bizoforceId: number | null;
    giglancerId: number | null;
    screenlyId: number | null;
    workId: number | null;
  };
  hasCompany: boolean;
  hasProducts: boolean;
  hasProjects: boolean;
  roles: string[];
  primaryRole: string;
  companyName?: string;
  migrationComplete: boolean;
}

/**
 * Step 1: Check if user exists in Bizoforce database
 */
async function checkBizoforceUser(email: string): Promise<{
  id: number | null;
  isVendor: boolean;
  shopName: string | null;
  hasCompany: boolean;
  companyName: string | null;
}> {
  console.log(`🔍 checkBizoforceUser called for: ${email}`);

  try {
    // Check wp_users table
    console.log(`🔍 Querying wp_users for: ${email}`);
    const [userRows]: any = await bizoforcePool.execute(
      `SELECT ID FROM wp_users WHERE user_email = ? LIMIT 1`,
      [email]
    );
    if (userRows.length === 0) {
      return {
        id: null,
        isVendor: false,
        shopName: null,
        hasCompany: false,
        companyName: null,
      };
    }

    const userId = userRows[0].ID;

    // Check if user is a vendor
    const [vendorRows]: any = await bizoforcePool.execute(
      `SELECT meta_value FROM wp_usermeta 
       WHERE user_id = ? AND meta_key = 'pv_shop_name' LIMIT 1`,
      [userId]
    );

    const isVendor = vendorRows.length > 0;
    const shopName = isVendor ? vendorRows[0].meta_value : null;

    console.log(`🔍 Bizoforce Check for user ${userId}:`, {
      isVendor,
      shopName,
      vendorRowsCount: vendorRows.length,
    });

    // Check if user has company/administrator role
    const [roleRows]: any = await bizoforcePool.execute(
      `SELECT meta_value FROM wp_usermeta 
       WHERE user_id = ? AND meta_key = 'wp_capabilities' LIMIT 1`,
      [userId]
    );

    let hasCompany = isVendor; // Vendors have companies (their shops)
    let companyName = shopName;

    // Check if user is administrator or has company-related capabilities
    if (roleRows.length > 0) {
      const capabilities = roleRows[0].meta_value;
      const isAdmin =
        capabilities.includes("administrator") ||
        capabilities.includes("shop_manager");

      console.log(`🔍 Bizoforce Role Check:`, {
        capabilities,
        isAdmin,
        hasCompanyBefore: hasCompany,
      });

      if (isAdmin && !hasCompany) {
        hasCompany = true;
        companyName = shopName || "Company"; // Use shop name or default
      }
    }

    // Additional check: Does user have any products/posts (indicating business activity)?
    if (!hasCompany) {
      const [postRows]: any = await bizoforcePool.execute(
        `SELECT COUNT(*) as count FROM wp_posts 
         WHERE post_author = ? AND post_type IN ('product', 'shop_order') 
         AND post_status != 'trash' LIMIT 1`,
        [userId]
      );

      console.log(`🔍 Bizoforce Products Check:`, {
        productCount: postRows[0].count,
        hasCompanyBefore: hasCompany,
      });

      if (postRows[0].count > 0) {
        hasCompany = true;
        companyName = shopName || "Business";
      }
    }

    // Check for directory listings (wpbdp_listing - WordPress Business Directory Plugin)
    // Always check this to get the proper company name, even if user is already identified as having a company
    const [listingRows]: any = await bizoforcePool.execute(
      `SELECT COUNT(*) as count FROM wp_posts 
       WHERE post_author = ? AND post_type = 'wpbdp_listing' 
       AND post_status IN ('publish', 'draft') LIMIT 1`,
      [userId]
    );

    console.log(`🔍 Bizoforce Directory Listings Check:`, {
      listingCount: listingRows[0].count,
      hasCompanyBefore: hasCompany,
      companyNameBefore: companyName,
    });

    if (listingRows[0].count > 0) {
      hasCompany = true;
      // Get listing title as company name (this takes priority over shop name)
      const [listingDetails]: any = await bizoforcePool.execute(
        `SELECT post_title FROM wp_posts 
         WHERE post_author = ? AND post_type = 'wpbdp_listing' 
         AND post_status IN ('publish', 'draft') 
         ORDER BY post_status DESC, post_date DESC LIMIT 1`,
        [userId]
      );

      // Directory listing title takes priority over shop name
      if (listingDetails[0]?.post_title) {
        companyName = listingDetails[0].post_title;
      } else if (!companyName) {
        companyName = shopName || "Directory Business";
      }
    }

    console.log(`✅ Bizoforce Final Result for user ${userId}:`, {
      id: userId,
      isVendor,
      shopName,
      hasCompany,
      companyName,
    });

    return { id: userId, isVendor, shopName, hasCompany, companyName };
  } catch (error) {
    console.error("Error checking Bizoforce user:", error);
    return {
      id: null,
      isVendor: false,
      shopName: null,
      hasCompany: false,
      companyName: null,
    };
  }
}

/**
 * Step 2: Check if user exists in Giglancer database
 */
async function checkGiglancerUser(
  email: string
): Promise<{ id: number | null; hasPostedJobs: boolean; hasApplied: boolean }> {
  try {
    const [userRows]: any = await giglancerPool.execute(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (userRows.length === 0) {
      return { id: null, hasPostedJobs: false, hasApplied: false };
    }

    const userId = userRows[0].id;

    // Check if user has posted jobs
    const [jobRows]: any = await giglancerPool.execute(
      `SELECT COUNT(*) as count FROM jobs WHERE user_id = ?`,
      [userId]
    );
    const hasPostedJobs = jobRows[0].count > 0;

    // Check if user has applied to jobs
    const [applicationRows]: any = await giglancerPool.execute(
      `SELECT COUNT(*) as count FROM job_applications WHERE user_id = ?`,
      [userId]
    );
    const hasApplied = applicationRows[0].count > 0;

    return { id: userId, hasPostedJobs, hasApplied };
  } catch (error) {
    console.error("Error checking Giglancer user:", error);
    return { id: null, hasPostedJobs: false, hasApplied: false };
  }
}

/**
 * Step 3: Check if user exists in Screenly database
 */
async function checkScreenlyUser(email: string): Promise<{
  id: number | null;
  hasCompany: boolean;
  companyName: string | null;
}> {
  try {
    const result = await screenlyPool.query(
      `SELECT id FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return { id: null, hasCompany: false, companyName: null };
    }

    const userId = result.rows[0].id as number;

    // Check if user has a company
    const companyResult = await screenlyPool.query(
      `SELECT c.id, c.name FROM companies c
       INNER JOIN company_members cm ON c.id = cm.company_id
       WHERE cm.user_id = $1 AND cm.role = 'admin' LIMIT 1`,
      [userId]
    );

    const hasCompany = companyResult.rows.length > 0;
    const companyName = hasCompany
      ? (companyResult.rows[0].name as string)
      : null;

    return { id: userId as number, hasCompany, companyName };
  } catch (error) {
    console.error("Error checking Screenly user:", error);
    return { id: null, hasCompany: false, companyName: null };
  }
}

/**
 * Step 4: Check if user exists in Work.Bizoforce database
 */
async function checkWorkUser(email: string): Promise<{
  id: number | null;
  hasCompany: boolean;
  companyName: string | null;
  hasProjects: boolean;
}> {
  try {
    // Use workPool.execute instead of workDB.execute for raw SQL
    const [userRows]: any = await workPool.execute(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (userRows.length === 0) {
      return {
        id: null,
        hasCompany: false,
        companyName: null,
        hasProjects: false,
      };
    }

    const userId = userRows[0].id;

    // Check if user has a company
    const [companyRows]: any = await workPool.execute(
      `SELECT c.id, c.company_name FROM companies c
       WHERE c.id IN (SELECT company_id FROM employee_details WHERE user_id = ?)
       LIMIT 1`,
      [userId]
    );

    const hasCompany = companyRows.length > 0;
    const companyName = hasCompany ? companyRows[0].company_name : null;

    // Check if user has projects
    const [projectRows]: any = await workPool.execute(
      `SELECT COUNT(*) as count FROM projects 
       WHERE client_id = ? OR id IN (SELECT project_id FROM project_members WHERE user_id = ?)`,
      [userId, userId]
    );
    const hasProjects = projectRows[0].count > 0;

    return { id: userId, hasCompany, companyName, hasProjects };
  } catch (error) {
    console.error("Error checking Work.Bizoforce user:", error);
    return {
      id: null,
      hasCompany: false,
      companyName: null,
      hasProjects: false,
    };
  }
}

/**
 * Step 5: Determine user roles based on platform data
 */
function determineUserRoles(
  bizoforce: {
    isVendor: boolean;
    shopName: string | null;
    hasCompany: boolean;
  },
  giglancer: { hasPostedJobs: boolean; hasApplied: boolean },
  screenly: { hasCompany: boolean },
  work: { hasCompany: boolean; hasProjects: boolean }
): { roles: string[]; primaryRole: string } {
  const roles: string[] = [];

  // Platform Priority Order (★ = business value):
  // 1. Bizoforce (★★★★★) - Company listings OR vendors
  // 2. Work.Bizoforce (★★★★☆) - Project management
  // 3. Screenly (★★★☆☆) - AI screening
  // 4. Giglancer (★★☆☆☆) - Job marketplace

  // Priority 1: Bizoforce - Company admin if has company listings OR vendor
  if (bizoforce.hasCompany || bizoforce.isVendor) {
    roles.push("company_admin");
  }

  // Vendor if has shop in Bizoforce
  if (bizoforce.isVendor) {
    roles.push("vendor");
  }

  // Priority 2: Work.Bizoforce - Company admin if has company
  if (work.hasCompany && !roles.includes("company_admin")) {
    roles.push("company_admin");
  }

  // Priority 3: Screenly - Company admin if has company
  if (screenly.hasCompany && !roles.includes("company_admin")) {
    roles.push("company_admin");
  }

  // Priority 4: Giglancer - Recruiter if posted jobs
  if (giglancer.hasPostedJobs) {
    roles.push("hr");
  }

  // Job seeker if applied to jobs in Giglancer
  if (giglancer.hasApplied) {
    roles.push("job_seeker");
  }

  // Team member if has projects in Work.Bizoforce
  if (work.hasProjects) {
    roles.push("team_member");
  }

  // Default role if no specific role found
  if (roles.length === 0) {
    roles.push("job_seeker");
  }

  // Primary role priority: company_admin > vendor > hr > team_member > job_seeker
  const rolePriority = [
    "company_admin",
    "vendor",
    "hr",
    "team_member",
    "job_seeker",
  ];
  const primaryRole =
    rolePriority.find((r) => roles.includes(r)) || "job_seeker";

  return { roles, primaryRole };
}

/**
 * Step 6: Create company in unified database if doesn't exist
 */
async function createCompanyIfNeeded(
  userId: number,
  companyName: string | null,
  shopName: string | null
): Promise<number | null> {
  try {
    const finalCompanyName = companyName || shopName || null;

    if (!finalCompanyName) {
      return null;
    }

    // Check if company already exists
    const existingCompanies = await unifiedDB
      .select()
      .from(companies)
      .where(eq(companies.name, finalCompanyName))
      .limit(1);

    if (existingCompanies.length > 0) {
      return existingCompanies[0].id;
    }

    // Create new company
    const [newCompany] = await unifiedDB
      .insert(companies)
      .values({
        name: finalCompanyName,
      })
      .$returningId();

    return newCompany.id;
  } catch (error) {
    console.error("Error creating company:", error);
    return null;
  }
}

/**
 * Step 7: Create or update user in Work.Bizoforce if needed
 */
async function syncWorkUser(
  email: string,
  firstName: string | null,
  lastName: string | null,
  bizoforceId: number,
  workId: number | null,
  companyName: string | null
): Promise<number | null> {
  try {
    if (workId) {
      return workId; // User already exists
    }

    // Create user in Work.Bizoforce
    const [result]: any = await workPool.execute(
      `INSERT INTO users (name, email, created_at, updated_at) 
       VALUES (?, ?, NOW(), NOW())`,
      [`${firstName || ""} ${lastName || ""}`.trim() || email, email]
    );

    const newWorkId = result.insertId;

    // If company exists, create company and link user
    if (companyName) {
      // Create company in Work.Bizoforce
      const [companyResult]: any = await workPool.execute(
        `INSERT INTO companies (company_name, created_at, updated_at) 
         VALUES (?, NOW(), NOW())`,
        [companyName]
      );

      const companyId = companyResult.insertId;

      // Link user to company
      await workPool.execute(
        `INSERT INTO employee_details (user_id, company_id, created_at, updated_at) 
         VALUES (?, ?, NOW(), NOW())`,
        [newWorkId, companyId]
      );
    }

    return newWorkId;
  } catch (error) {
    console.error("Error syncing Work.Bizoforce user:", error);
    return workId;
  }
}

/**
 * Main migration function with progress tracking
 */
export async function migrateUser(
  email: string,
  firstName: string | null,
  lastName: string | null,
  googleId: string | null,
  progressCallback?: (progress: MigrationProgress) => void
): Promise<UserMigrationResult> {
  const updateProgress = (step: string, progress: number, message: string) => {
    if (progressCallback) {
      progressCallback({ step, progress, message });
    }
  };

  try {
    // Step 1: Check Bizoforce (25%)
    updateProgress("bizoforce", 25, "Checking Bizoforce database...");
    const bizoforceData = await checkBizoforceUser(email);

    // Step 2: Check Giglancer (50%)
    updateProgress("giglancer", 50, "Checking Giglancer database...");
    const giglancerData = await checkGiglancerUser(email);

    // Step 3: Check Screenly (75%)
    updateProgress("screenly", 75, "Checking Screenly database...");
    const screenlyData = await checkScreenlyUser(email);

    // Step 4: Check Work.Bizoforce (85%)
    updateProgress("work", 85, "Checking Work.Bizoforce database...");
    const workData = await checkWorkUser(email);

    // Step 5: Determine roles (90%)
    updateProgress("roles", 90, "Determining user roles...");
    const { roles, primaryRole } = determineUserRoles(
      {
        isVendor: bizoforceData.isVendor,
        shopName: bizoforceData.shopName,
        hasCompany: bizoforceData.hasCompany,
      },
      {
        hasPostedJobs: giglancerData.hasPostedJobs,
        hasApplied: giglancerData.hasApplied,
      },
      { hasCompany: screenlyData.hasCompany },
      { hasCompany: workData.hasCompany, hasProjects: workData.hasProjects }
    );

    const hasCompany =
      bizoforceData.hasCompany ||
      screenlyData.hasCompany ||
      workData.hasCompany;

    const companyName =
      bizoforceData.companyName ||
      screenlyData.companyName ||
      workData.companyName ||
      null;

    // Determine which platform the company comes from
    let sourcePlatform: string | null = null;
    if (bizoforceData.hasCompany) {
      sourcePlatform = "bizoforce";
    } else if (screenlyData.hasCompany) {
      sourcePlatform = "screenly";
    } else if (workData.hasCompany) {
      sourcePlatform = "work";
    }

    // Step 6: Create/update user in unified database (95%)
    updateProgress("unified", 95, "Setting up your dashboard...");

    // Check if user exists in unified DB
    const existingUsers = await unifiedDB
      .select()
      .from(unifiedUsers)
      .where(eq(unifiedUsers.email, email))
      .limit(1);

    let userId: number;
    let isNewUser = false;

    if (existingUsers.length > 0) {
      // Update existing user
      userId = existingUsers[0].id;
      await unifiedDB
        .update(unifiedUsers)
        .set({
          googleId,
          bizoforceUserId: bizoforceData.id,
          giglancerUserId: giglancerData.id,
          screenlyUserId: screenlyData.id,
          workUserId: workData.id,
          firstName: firstName || existingUsers[0].firstName,
          lastName: lastName || existingUsers[0].lastName,
          lastLoginAt: new Date(),
        })
        .where(eq(unifiedUsers.id, userId));
    } else {
      // Create new user with default values for null fields
      const [newUser] = await unifiedDB
        .insert(unifiedUsers)
        .values({
          email,
          googleId,
          firstName: firstName || email.split("@")[0],
          lastName: lastName || "",
          authProvider: "google",
          bizoforceUserId: bizoforceData.id,
          giglancerUserId: giglancerData.id,
          screenlyUserId: screenlyData.id,
          workUserId: workData.id,
          lastLoginAt: new Date(),
        })
        .$returningId();

      userId = newUser.id;
      isNewUser = true;
    }

    // Create company if needed
    let companyId: number | null = null;
    if (hasCompany && companyName) {
      companyId = await createCompanyIfNeeded(
        userId,
        companyName,
        bizoforceData.shopName
      );
    }

    // Sync to Work.Bizoforce if user has company
    if (hasCompany && bizoforceData.id) {
      const syncedWorkId = await syncWorkUser(
        email,
        firstName,
        lastName,
        bizoforceData.id,
        workData.id,
        companyName
      );

      if (syncedWorkId && !workData.id) {
        // Update unified user with new Work ID
        await unifiedDB
          .update(unifiedUsers)
          .set({ workUserId: syncedWorkId })
          .where(eq(unifiedUsers.id, userId));
        workData.id = syncedWorkId;
      }
    }

    // Delete existing roles and create new ones
    await unifiedDB.delete(userRoles).where(eq(userRoles.userId, userId));

    // Insert new roles
    for (const role of roles) {
      await unifiedDB.insert(userRoles).values({
        userId,
        role,
        companyId,
        isPrimary: role === primaryRole,
        sourcePlatform: hasCompany ? sourcePlatform : null,
      });
    }

    // Step 7: Complete (100%)
    updateProgress("complete", 100, "Dashboard ready!");

    // Determine if user is truly new (no data in any platform)
    const isTrulyNewUser =
      isNewUser &&
      !bizoforceData.id &&
      !giglancerData.id &&
      !screenlyData.id &&
      !workData.id &&
      !bizoforceData.isVendor &&
      !giglancerData.hasPostedJobs &&
      !giglancerData.hasApplied &&
      !workData.hasProjects;

    return {
      userId,
      email,
      isNewUser,
      isTrulyNewUser,
      platformIds: {
        bizoforceId: bizoforceData.id,
        giglancerId: giglancerData.id,
        screenlyId: screenlyData.id,
        workId: workData.id,
      },
      hasCompany,
      hasProducts: bizoforceData.isVendor,
      hasProjects: workData.hasProjects,
      roles,
      primaryRole,
      companyName: companyName || undefined,
      migrationComplete: true,
    };
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
}
