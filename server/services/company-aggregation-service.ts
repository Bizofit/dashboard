/**
 * Company Aggregation Service
 *
 * Queries all legacy databases to find companies associated with a user
 * and normalizes data across platforms with deduplication
 */

import {
  unifiedPool,
  bizoforcePool,
  giglancerPool,
  screenlyPool,
  workPool,
} from "../db.js";

export interface CompanyData {
  id: string; // Unique across platforms: "platform_originalId"
  name: string;
  description?: string;
  platform: "bizoforce" | "giglancer" | "screenly" | "work" | "unified";
  originalId: number; // Original ID from source platform
  role: string; // Normalized role
  originalRole: string; // Original role from platform
  isPrimary: boolean;
  source: "legacy" | "unified";
  metadata?: any; // Platform-specific data
}

export interface DetailedCompanyData extends CompanyData {
  logo?: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  phone?: string;
  foundedYear?: number;
  employees?: EmployeeData[];
  products?: ProductData[];
  jobs?: JobData[];
  projects?: ProjectData[];
  financials?: FinancialData;
  analytics?: AnalyticsData;
  lastUpdated: Date;
}

export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  joinDate?: Date;
  isActive: boolean;
  platform: string;
}

export interface ProductData {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  status: "active" | "inactive" | "draft";
  imageUrl?: string;
  platform: string;
  createdAt: Date;
}

export interface JobData {
  id: string;
  title: string;
  description?: string;
  requirements?: string;
  location?: string;
  salary?: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  status: "open" | "closed" | "draft";
  applications?: number;
  platform: string;
  postedAt: Date;
}

export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  status: "active" | "completed" | "paused" | "cancelled";
  budget?: number;
  deadline?: Date;
  progress?: number;
  teamSize?: number;
  platform: string;
  createdAt: Date;
}

export interface FinancialData {
  revenue?: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  expenses?: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  invoices?: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  transactions?: TransactionData[];
}

export interface TransactionData {
  id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  date: Date;
  platform: string;
}

export interface AnalyticsData {
  userEngagement?: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
  };
  salesMetrics?: {
    totalSales: number;
    conversionRate: number;
    averageOrderValue: number;
  };
  jobMetrics?: {
    totalJobs: number;
    applicationsPerJob: number;
    hireRate: number;
  };
  projectMetrics?: {
    totalProjects: number;
    completionRate: number;
    averageProjectDuration: number;
  };
  candidateMetrics?: {
    totalCandidates: number;
    totalApplications: number;
    totalInterviews: number;
    totalHired: number;
    hireRate: number;
  };
}

export interface UserPlatformIds {
  unifiedUserId: number;
  email: string;
  bizoforceUserId?: number;
  giglancerUserId?: number;
  screenlyUserId?: number;
  workUserId?: number;
}

export class CompanyAggregationService {
  /**
   * Get detailed company information from all platforms
   */
  async getCompanyDetails(
    companyId: string,
    userId: number
  ): Promise<DetailedCompanyData | null> {
    console.log(`🔍 Getting detailed data for company ${companyId}`);

    try {
      // Parse company ID to extract platform and original ID
      const [platform, originalId] = this.parseCompanyId(companyId);

      // Get basic company data first
      const companies = await this.getUserCompanies(userId);
      const company = companies.find((c) => c.id === companyId);

      if (!company) {
        throw new Error(`Company ${companyId} not found for user ${userId}`);
      }

      // Get detailed data based on platform
      let detailedData: DetailedCompanyData;

      switch (platform) {
        case "bizoforce":
          detailedData = await this.getBizoforceCompanyDetails(company, userId);
          break;
        case "giglancer":
          detailedData = await this.getGiglancerCompanyDetails(company, userId);
          break;
        case "screenly":
          detailedData = await this.getScreenlyCompanyDetails(company, userId);
          break;
        case "work":
          detailedData = await this.getWorkCompanyDetails(company, userId);
          break;
        case "unified":
          detailedData = await this.getUnifiedCompanyDetails(company, userId);
          break;
        default:
          throw new Error(`Unknown platform: ${platform}`);
      }

      console.log(`✅ Retrieved detailed data for ${company.name}`);
      return detailedData;
    } catch (error) {
      console.error("❌ Error getting company details:", error);
      throw error;
    }
  }

  /**
   * Main method to get all companies for a user across all platforms
   */
  async getUserCompanies(userId: number): Promise<CompanyData[]> {
    console.log(
      `🏢 CompanyAggregationService: Getting companies for user ${userId}`
    );

    try {
      // Step 1: Get user's platform IDs
      const userPlatformIds = await this.getUserPlatformIds(userId);
      console.log(`🔍 User platform IDs:`, userPlatformIds);

      // Step 2: Query all platforms concurrently with error isolation
      const [
        unifiedCompanies,
        bizoforceCompanies,
        giglancerCompanies,
        screenlyCompanies,
        workCompanies,
      ] = await Promise.allSettled([
        this.getUnifiedCompanies(userPlatformIds.unifiedUserId),
        this.getBizoforceCompanies(userPlatformIds),
        this.getGiglancerCompanies(userPlatformIds),
        this.getScreenlyCompanies(userPlatformIds),
        this.getWorkCompanies(userPlatformIds),
      ]);

      // Extract successful results, log failures
      const allCompanies = [
        ...(unifiedCompanies.status === "fulfilled"
          ? unifiedCompanies.value
          : []),
        ...(bizoforceCompanies.status === "fulfilled"
          ? bizoforceCompanies.value
          : []),
        ...(giglancerCompanies.status === "fulfilled"
          ? giglancerCompanies.value
          : []),
        ...(screenlyCompanies.status === "fulfilled"
          ? screenlyCompanies.value
          : []),
        ...(workCompanies.status === "fulfilled" ? workCompanies.value : []),
      ];

      // Log any platform failures for debugging
      const failures = [
        { platform: "unified", result: unifiedCompanies },
        { platform: "bizoforce", result: bizoforceCompanies },
        { platform: "giglancer", result: giglancerCompanies },
        { platform: "screenly", result: screenlyCompanies },
        { platform: "work", result: workCompanies },
      ].filter((p) => p.result.status === "rejected");

      if (failures.length > 0) {
        console.warn(
          `⚠️ Some platforms failed for user ${userId}:`,
          failures.map(
            (f) =>
              `${f.platform}: ${
                (f.result as PromiseRejectedResult).reason?.message ||
                "Unknown error"
              }`
          )
        );
      }

      console.log(`📊 Platform company counts:`, {
        unified:
          unifiedCompanies.status === "fulfilled"
            ? unifiedCompanies.value.length
            : 0,
        bizoforce:
          bizoforceCompanies.status === "fulfilled"
            ? bizoforceCompanies.value.length
            : 0,
        giglancer:
          giglancerCompanies.status === "fulfilled"
            ? giglancerCompanies.value.length
            : 0,
        screenly:
          screenlyCompanies.status === "fulfilled"
            ? screenlyCompanies.value.length
            : 0,
        work:
          workCompanies.status === "fulfilled" ? workCompanies.value.length : 0,
      });

      // Step 3: Merge and deduplicate

      const deduplicatedCompanies = this.deduplicateCompanies(allCompanies);
      console.log(
        `✅ Final company count after deduplication: ${deduplicatedCompanies.length}`
      );

      return deduplicatedCompanies;
    } catch (error) {
      console.error("❌ CompanyAggregationService error:", error);
      throw error;
    }
  }

  /**
   * Get user's IDs across all platforms
   */
  private async getUserPlatformIds(userId: number): Promise<UserPlatformIds> {
    const [rows] = await unifiedPool.execute(
      `SELECT 
        id, email, 
        bizoforce_user_id, 
        giglancer_user_id, 
        screenly_user_id, 
        work_user_id 
      FROM unified_users 
      WHERE id = ?`,
      [userId]
    );

    if ((rows as any[]).length === 0) {
      throw new Error(`User ${userId} not found in unified database`);
    }

    const user = (rows as any[])[0];
    return {
      unifiedUserId: user.id,
      email: user.email,
      bizoforceUserId: user.bizoforce_user_id,
      giglancerUserId: user.giglancer_user_id,
      screenlyUserId: user.screenly_user_id,
      workUserId: user.work_user_id,
    };
  }

  /**
   * Get companies from unified database
   */
  private async getUnifiedCompanies(userId: number): Promise<CompanyData[]> {
    try {
      const [rows] = await unifiedPool.execute(
        `SELECT DISTINCT 
          c.id, c.name, c.description,
          ur.role as user_role,
          ur.source_platform as platform,
          ur.is_primary,
          ur.id as role_id
        FROM companies c
        INNER JOIN user_roles ur ON c.id = ur.company_id
        WHERE ur.user_id = ? AND ur.is_active = TRUE
        ORDER BY ur.is_primary DESC, c.name ASC`,
        [userId]
      );

      return (rows as any[]).map((row) => ({
        id: `unified_${row.id}`,
        name: row.name,
        description: row.description,
        platform: (row.platform as any) || "unified",
        originalId: row.id,
        role: this.normalizeRole(row.user_role, "unified"),
        originalRole: row.user_role,
        isPrimary: Boolean(row.is_primary),
        source: "unified" as const,
        metadata: { roleId: row.role_id },
      }));
    } catch (error) {
      console.error("❌ Error fetching unified companies:", error);
      return [];
    }
  }

  /**
   * Get companies from Bizoforce (WordPress/WooCommerce)
   *
   * PRIORITY ORDER (Business-value-driven):
   * 1. Business Directory Listings (wp_wpbdp_listings) - HIGHEST PRIORITY
   *    - First listing = PRIMARY company
   *    - Additional listings = secondary companies
   * 2. Custom Listing Post Type - MEDIUM PRIORITY
   * 3. Vendor Shop (WooCommerce) - LOWEST PRIORITY
   */
  private async getBizoforceCompanies(
    userIds: UserPlatformIds
  ): Promise<CompanyData[]> {
    if (!userIds.bizoforceUserId) return [];

    try {
      const companies: CompanyData[] = [];

      // PRIORITY 1: Check Business Directory Plugin listings (wp_wpbdp_listings)
      console.log(
        `🔍 Bizoforce: Searching Business Directory listings for user ${userIds.bizoforceUserId}`
      );

      const [bdpListings] = await bizoforcePool.execute(
        `SELECT 
          l.listing_id,
          l.listing_status,
          l.is_sticky,
          l.expiration_date,
          p.post_title,
          p.post_status,
          p.post_date,
          p.post_modified
        FROM wp_wpbdp_listings l
        INNER JOIN wp_posts p ON l.listing_id = p.ID
        WHERE p.post_author = ?
        AND p.post_status = 'publish'
        ORDER BY l.is_sticky DESC, p.post_date DESC
        LIMIT 100`,
        [userIds.bizoforceUserId]
      );

      if ((bdpListings as any[]).length > 0) {
        console.log(
          `✅ Found ${
            (bdpListings as any[]).length
          } business directory listing(s)`
        );

        for (let i = 0; i < (bdpListings as any[]).length; i++) {
          const listing = (bdpListings as any[])[i];

          // Get listing metadata for company details
          const [metadata] = await bizoforcePool.execute(
            `SELECT meta_key, meta_value 
             FROM wp_postmeta 
             WHERE post_id = ? 
             AND meta_key IN (
               '_company_name', '_company_website', '_company_email', 
               '_company_phone', '_company_tagline', '_company_description'
             )`,
            [listing.listing_id]
          );

          const metaMap = new Map(
            (metadata as any[]).map((m) => [m.meta_key, m.meta_value])
          );

          companies.push({
            id: `bizoforce_listing_${listing.listing_id}`,
            name: metaMap.get("_company_name") || listing.post_title,
            description:
              metaMap.get("_company_tagline") ||
              metaMap.get("_company_description") ||
              "Business directory listing",
            platform: "bizoforce",
            originalId: listing.listing_id,
            role: "company_admin", // Owner of listing
            originalRole: "listing_owner",
            isPrimary: i === 0, // First listing is PRIMARY
            source: "legacy",
            metadata: {
              userId: userIds.bizoforceUserId,
              listingId: listing.listing_id,
              listingStatus: listing.listing_status,
              isSticky: Boolean(listing.is_sticky),
              createdDate: listing.post_date,
              website: metaMap.get("_company_website"),
              email: metaMap.get("_company_email"),
              phone: metaMap.get("_company_phone"),
            },
          });
        }

        // If we found business directory listings, return them (HIGHEST PRIORITY)
        return companies;
      }

      console.log(`⚠️ No business directory listings found`);

      // PRIORITY 2: Check custom 'listing' post type (fallback)
      console.log(
        `🔍 Bizoforce: Searching custom listing posts for user ${userIds.bizoforceUserId}`
      );

      const [customListings] = await bizoforcePool.execute(
        `SELECT 
          ID, 
          post_title, 
          post_status, 
          post_date,
          post_modified
        FROM wp_posts 
        WHERE post_author = ? 
        AND post_type = 'listing'
        AND post_status = 'publish'
        ORDER BY post_date DESC
        LIMIT 50`,
        [userIds.bizoforceUserId]
      );

      if ((customListings as any[]).length > 0) {
        console.log(
          `✅ Found ${(customListings as any[]).length} custom listing(s)`
        );

        for (let i = 0; i < (customListings as any[]).length; i++) {
          const listing = (customListings as any[])[i];

          companies.push({
            id: `bizoforce_custom_${listing.ID}`,
            name: listing.post_title,
            description: "Custom company listing",
            platform: "bizoforce",
            originalId: listing.ID,
            role: "company_admin",
            originalRole: "listing_owner",
            isPrimary: i === 0, // First custom listing is PRIMARY
            source: "legacy",
            metadata: {
              userId: userIds.bizoforceUserId,
              postId: listing.ID,
              createdDate: listing.post_date,
            },
          });
        }

        // If we found custom listings, return them
        return companies;
      }

      console.log(`⚠️ No custom listings found`);

      // PRIORITY 3: Check vendor shop (WooCommerce) - LOWEST PRIORITY
      console.log(
        `🔍 Bizoforce: Checking vendor shop for user ${userIds.bizoforceUserId}`
      );

      const [vendorRows] = await bizoforcePool.execute(
        `SELECT 
          u.ID, u.user_email,
          shop.meta_value as shop_name,
          caps.meta_value as capabilities,
          vendor.meta_value as vendor_data
        FROM wp_users u
        LEFT JOIN wp_usermeta shop ON u.ID = shop.user_id AND shop.meta_key = 'pv_shop_name'
        LEFT JOIN wp_usermeta caps ON u.ID = caps.user_id AND caps.meta_key = 'wp_capabilities'
        LEFT JOIN wp_usermeta vendor ON u.ID = vendor.user_id AND vendor.meta_key = 'pv_shop_state'
        WHERE u.ID = ?`,
        [userIds.bizoforceUserId]
      );

      for (const row of vendorRows as any[]) {
        // If user has a shop, they're a vendor
        if (row.shop_name) {
          console.log(`✅ Found vendor shop: ${row.shop_name}`);

          companies.push({
            id: `bizoforce_vendor_${row.ID}`,
            name: row.shop_name,
            description: `Vendor shop on Bizoforce marketplace`,
            platform: "bizoforce",
            originalId: row.ID,
            role: "vendor",
            originalRole: "vendor",
            isPrimary: true, // Only vendor entry, make it primary
            source: "legacy",
            metadata: {
              userId: row.ID,
              email: row.user_email,
              shopState: row.vendor_data,
            },
          });
        }

        // Check capabilities for admin roles
        if (row.capabilities) {
          try {
            // WordPress stores capabilities as PHP serialized data, not JSON
            const hasAdminCap =
              row.capabilities.includes("administrator") ||
              row.capabilities.includes('"administrator"');

            if (hasAdminCap && companies.length === 0) {
              console.log(`✅ User has administrator capabilities`);

              companies.push({
                id: `bizoforce_admin_${row.ID}`,
                name: "Bizoforce: Accelerating Digital Innovation",
                description: "Bizoforce marketplace administration",
                platform: "bizoforce",
                originalId: 1, // Main Bizoforce company
                role: "company_admin",
                originalRole: "administrator",
                isPrimary: true,
                source: "legacy",
                metadata: {
                  userId: row.ID,
                  capabilities: row.capabilities,
                },
              });
            }
          } catch (parseError) {
            console.log(
              `⚠️ Could not parse capabilities for user ${row.ID}:`,
              parseError
            );
          }
        }
      }

      if (companies.length === 0) {
        console.log(
          `⚠️ No companies found for user ${userIds.bizoforceUserId} in Bizoforce`
        );
      }

      return companies;
    } catch (error) {
      console.error("❌ Error fetching Bizoforce companies:", error);
      return [];
    }
  }

  /**
   * Get companies from Giglancer (Job marketplace)
   */
  private async getGiglancerCompanies(
    userIds: UserPlatformIds
  ): Promise<CompanyData[]> {
    if (!userIds.giglancerUserId) return [];

    try {
      const companies: CompanyData[] = [];

      // Check user role and company associations
      const [userRows] = await giglancerPool.execute(
        `SELECT 
          id, email, account_type, company_name, 
          role, is_verified, created_at
        FROM users 
        WHERE id = ? OR email = ?`,
        [userIds.giglancerUserId, userIds.email]
      );

      for (const row of userRows as any[]) {
        // If user is employer, they might have a company
        if (row.account_type === "employer" || row.company_name) {
          companies.push({
            id: `giglancer_company_${row.id}`,
            name: row.company_name || `${row.email}'s Company`,
            description: "Company on Giglancer job marketplace",
            platform: "giglancer",
            originalId: row.id,
            role: this.normalizeRole(row.role || row.account_type, "giglancer"),
            originalRole: row.role || row.account_type,
            isPrimary: false,
            source: "legacy",
            metadata: {
              userId: row.id,
              accountType: row.account_type,
              isVerified: row.is_verified,
            },
          });
        }
      }

      return companies;
    } catch (error) {
      console.error("❌ Error fetching Giglancer companies:", error);
      return [];
    }
  }

  /**
   * Get companies from Screenly (AI screening platform)
   */
  private async getScreenlyCompanies(
    userIds: UserPlatformIds
  ): Promise<CompanyData[]> {
    if (!userIds.screenlyUserId) return [];

    try {
      const companies: CompanyData[] = [];

      // Get user with company information
      const result = await screenlyPool.query(
        `SELECT 
          u.id, u.email, u.role, u.company_name, u.company_id
        FROM users u
        WHERE u.id = $1 OR u.email = $2`,
        [userIds.screenlyUserId, userIds.email]
      );

      for (const row of result.rows) {
        // If user has company information, add it
        if (row.company_name || row.company_id) {
          companies.push({
            id: `screenly_${row.company_id || row.id}`,
            name: row.company_name || `${row.email}'s Company`,
            description: "AI Screening and Recruitment Platform",
            platform: "screenly",
            originalId: row.company_id ? parseInt(row.company_id) : row.id,
            role: this.normalizeRole(row.role, "screenly"),
            originalRole: row.role,
            isPrimary: false,
            source: "legacy",
            metadata: {
              userId: row.id,
              companyId: row.company_id,
            },
          });
        }
      }

      return companies;
    } catch (error) {
      console.error("❌ Error fetching Screenly companies:", error);
      return [];
    }
  }

  /**
   * Get companies from Work.Bizoforce (Project/timesheet management)
   */
  private async getWorkCompanies(
    userIds: UserPlatformIds
  ): Promise<CompanyData[]> {
    if (!userIds.workUserId) return [];

    try {
      const companies: CompanyData[] = [];

      // Get companies where user is a member
      const [companyRows] = await workPool.execute(
        `SELECT DISTINCT
          c.id, c.company_name,
          u.id as user_id, u.email, u.name as user_name
        FROM companies c
        INNER JOIN employee_details ed ON c.id = ed.company_id
        INNER JOIN users u ON ed.user_id = u.id
        WHERE u.id = ? OR u.email = ?`,
        [userIds.workUserId, userIds.email]
      );

      for (const row of companyRows as any[]) {
        companies.push({
          id: `work_${row.id}`,
          name: row.company_name,
          description: "Project and timesheet management",
          platform: "work",
          originalId: row.id,
          role: "team_member", // Default role for Work platform
          originalRole: "employee",
          isPrimary: false,
          source: "legacy",
          metadata: {
            userId: row.user_id,
          },
        });
      }

      return companies;
    } catch (error) {
      console.error("❌ Error fetching Work companies:", error);
      return [];
    }
  }

  /**
   * Normalize roles across platforms to standard role types
   */
  private normalizeRole(originalRole: string, platform: string): string {
    if (!originalRole) return "team_member";

    const roleMapping: Record<string, Record<string, string>> = {
      bizoforce: {
        administrator: "company_admin",
        vendor: "vendor",
        customer: "team_member",
        shop_manager: "vendor",
      },
      giglancer: {
        employer: "hr",
        freelancer: "freelancer",
        admin: "company_admin",
        hr: "hr",
      },
      screenly: {
        admin: "company_admin",
        hr: "hr",
        recruiter: "hr",
        manager: "team_lead",
        employee: "team_member",
      },
      work: {
        admin: "company_admin",
        manager: "team_lead",
        project_manager: "team_lead",
        team_lead: "team_lead",
        employee: "team_member",
        freelancer: "freelancer",
      },
      unified: {
        company_admin: "company_admin",
        hr: "hr",
        team_lead: "team_lead",
        team_member: "team_member",
        finance: "finance",
        vendor: "vendor",
        freelancer: "freelancer",
      },
    };

    const platformMapping = roleMapping[platform] || {};
    const normalizedRole = platformMapping[originalRole.toLowerCase()];

    return normalizedRole || "team_member";
  }

  /**
   * Deduplicate companies that might be the same across platforms
   */
  private deduplicateCompanies(companies: CompanyData[]): CompanyData[] {
    if (companies.length === 0) return [];

    const deduplicatedMap = new Map<string, CompanyData>();
    const similarityThreshold = 0.8;

    for (const company of companies) {
      let isDuplicate = false;
      const companyKey = this.generateCompanyKey(company);

      // Check for exact matches first
      if (deduplicatedMap.has(companyKey)) {
        const existing = deduplicatedMap.get(companyKey)!;
        // Keep the one from unified DB or the one with more data
        if (
          company.source === "unified" ||
          (existing.source !== "unified" && this.hasMoreData(company, existing))
        ) {
          deduplicatedMap.set(companyKey, company);
        }
        isDuplicate = true;
      } else {
        // Check for similar names (fuzzy matching)
        const existingCompanies = Array.from(deduplicatedMap.values());
        for (const existingCompany of existingCompanies) {
          const similarity = this.calculateNameSimilarity(
            company.name,
            existingCompany.name
          );

          if (similarity >= similarityThreshold) {
            // Companies are similar - merge them
            const mergedCompany = this.mergeCompanies(company, existingCompany);
            // Find the key for this company to update it
            const entries = Array.from(deduplicatedMap.entries());
            for (const [key, value] of entries) {
              if (value === existingCompany) {
                deduplicatedMap.set(key, mergedCompany);
                break;
              }
            }
            isDuplicate = true;
            break;
          }
        }
      }

      if (!isDuplicate) {
        deduplicatedMap.set(companyKey, company);
      }
    }

    const result = Array.from(deduplicatedMap.values());

    // Set primary company (prefer unified DB, then most recent platform)
    this.setPrimaryCompany(result);

    return result;
  }

  /**
   * Generate a normalized key for company comparison
   */
  private generateCompanyKey(company: CompanyData): string {
    // Normalize company name for comparison
    const normalizedName = company.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") // Remove special characters
      .replace(/corp|company|inc|ltd|llc/g, "") // Remove common suffixes
      .trim();

    return `${normalizedName}_${company.platform}`;
  }

  /**
   * Calculate similarity between two company names
   */
  private calculateNameSimilarity(name1: string, name2: string): number {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/corp|company|inc|ltd|llc/g, "")
        .trim();

    const norm1 = normalize(name1);
    const norm2 = normalize(name2);

    if (norm1 === norm2) return 1.0;
    if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.9;

    // Simple Levenshtein-based similarity
    const maxLen = Math.max(norm1.length, norm2.length);
    if (maxLen === 0) return 1.0;

    const distance = this.levenshteinDistance(norm1, norm2);
    return (maxLen - distance) / maxLen;
  }

  /**
   * Calculate Levenshtein distance
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i += 1) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j += 1) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Check which company has more complete data
   */
  private hasMoreData(company1: CompanyData, company2: CompanyData): boolean {
    const score1 = this.calculateDataCompletenessScore(company1);
    const score2 = this.calculateDataCompletenessScore(company2);
    return score1 > score2;
  }

  /**
   * Calculate data completeness score
   */
  private calculateDataCompletenessScore(company: CompanyData): number {
    let score = 0;
    if (company.name) score += 2;
    if (company.description) score += 1;
    if (company.metadata) score += Object.keys(company.metadata).length * 0.5;
    if (company.source === "unified") score += 2; // Prefer unified data
    return score;
  }

  /**
   * Merge two similar companies
   */
  private mergeCompanies(
    company1: CompanyData,
    company2: CompanyData
  ): CompanyData {
    // Prefer unified DB data, then more complete data
    const primary =
      company1.source === "unified"
        ? company1
        : company2.source === "unified"
        ? company2
        : this.hasMoreData(company1, company2)
        ? company1
        : company2;

    const secondary = primary === company1 ? company2 : company1;

    return {
      ...primary,
      description: primary.description || secondary.description,
      metadata: {
        ...primary.metadata,
        ...secondary.metadata,
        mergedFrom: [primary.platform, secondary.platform],
        alternativeIds: [primary.id, secondary.id],
      },
    };
  }

  /**
   * Set primary company based on priority rules
   */
  private setPrimaryCompany(companies: CompanyData[]): void {
    if (companies.length === 0) return;

    // Priority: unified > screenly > work > bizoforce > giglancer
    const platformPriority = [
      "unified",
      "screenly",
      "work",
      "bizoforce",
      "giglancer",
    ];

    companies.sort((a, b) => {
      const aPriority = platformPriority.indexOf(a.platform);
      const bPriority = platformPriority.indexOf(b.platform);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // If same platform, prefer the one with more data
      return (
        this.calculateDataCompletenessScore(b) -
        this.calculateDataCompletenessScore(a)
      );
    });

    // Set the first one as primary
    companies[0].isPrimary = true;

    // Ensure no other companies are marked as primary
    for (let i = 1; i < companies.length; i++) {
      companies[i].isPrimary = false;
    }
  }

  /**
   * Parse company ID to extract platform and original ID
   */
  private parseCompanyId(companyId: string): [string, number] {
    const parts = companyId.split("_");
    if (parts.length < 2) {
      throw new Error(`Invalid company ID format: ${companyId}`);
    }

    const platform = parts[0];
    const originalId = parseInt(parts[parts.length - 1]);

    if (isNaN(originalId)) {
      throw new Error(`Invalid original ID in company ID: ${companyId}`);
    }

    return [platform, originalId];
  }

  /**
   * Get detailed Bizoforce company data
   */
  private async getBizoforceCompanyDetails(
    company: CompanyData,
    userId: number
  ): Promise<DetailedCompanyData> {
    console.log(`📊 Fetching Bizoforce details for: ${company.name}`);

    try {
      const userIds = await this.getUserPlatformIds(userId);

      // Get vendor/shop details if it's a vendor company
      let shopData: any = null;
      if (company.role === "vendor" && userIds.bizoforceUserId) {
        const [shopRows] = await bizoforcePool.execute(
          `SELECT ws.*, u.user_email, u.display_name
           FROM wp_dokan_stores ws
           LEFT JOIN wp_users u ON ws.user_id = u.ID
           WHERE ws.user_id = ?`,
          [userIds.bizoforceUserId]
        );
        shopData = (shopRows as any[])[0];
      }

      // Get products for vendor
      const products = await this.getBizoforceProducts(userIds.bizoforceUserId);

      // Get orders/sales data
      const financials = await this.getBizoforceFinancials(
        userIds.bizoforceUserId
      );

      // Get analytics
      const analytics = await this.getBizoforceAnalytics(
        userIds.bizoforceUserId
      );

      return {
        ...company,
        logo: shopData?.gravatar || undefined,
        website: shopData?.address?.website || undefined,
        location: shopData
          ? `${shopData.address?.street_1 || ""} ${
              shopData.address?.city || ""
            } ${shopData.address?.country || ""}`.trim()
          : undefined,
        phone: shopData?.phone || undefined,
        products,
        financials,
        analytics,
        lastUpdated: new Date(),
        metadata: {
          ...company.metadata,
          shopDetails: shopData,
          storeUrl: shopData ? `/store/${shopData.store_name}` : undefined,
        },
      };
    } catch (error) {
      console.error("❌ Error fetching Bizoforce company details:", error);
      // Return basic company data if detailed fetch fails
      return {
        ...company,
        lastUpdated: new Date(),
      };
    }
  }

  /**
   * Get detailed Giglancer company data
   */
  private async getGiglancerCompanyDetails(
    company: CompanyData,
    userId: number
  ): Promise<DetailedCompanyData> {
    console.log(`📊 Fetching Giglancer details for: ${company.name}`);

    try {
      const userIds = await this.getUserPlatformIds(userId);

      // Get jobs posted by this company
      const jobs = await this.getGiglancerJobs(userIds.giglancerUserId);

      // Get projects
      const projects = await this.getGiglancerProjects(userIds.giglancerUserId);

      // Get user profile details
      let profileData: any = null;
      if (userIds.giglancerUserId) {
        const [userRows] = await giglancerPool.execute(
          `SELECT * FROM users WHERE id = ?`,
          [userIds.giglancerUserId]
        );
        profileData = (userRows as any[])[0];
      }

      return {
        ...company,
        website: profileData?.website || undefined,
        location: profileData?.location || undefined,
        phone: profileData?.phone || undefined,
        jobs,
        projects,
        lastUpdated: new Date(),
        metadata: {
          ...company.metadata,
          profileData,
          accountType: profileData?.account_type,
          isVerified: profileData?.is_verified,
        },
      };
    } catch (error) {
      console.error("❌ Error fetching Giglancer company details:", error);
      return {
        ...company,
        lastUpdated: new Date(),
      };
    }
  }

  /**
   * Get detailed Screenly company data
   * NOTE: Screenly stores company info in users table (company_name, company_id columns)
   */
  private async getScreenlyCompanyDetails(
    company: CompanyData,
    userId: number
  ): Promise<DetailedCompanyData> {
    console.log(`📊 Fetching Screenly details for: ${company.name}`);

    try {
      const userIds = await this.getUserPlatformIds(userId);

      if (!userIds.screenlyUserId) {
        return {
          ...company,
          lastUpdated: new Date(),
        };
      }

      // Get user's company data and screening activity
      const result = await screenlyPool.query(
        `SELECT u.*, 
                COUNT(DISTINCT c.id) as total_candidates,
                COUNT(DISTINCT ia.id) as total_interviews
         FROM users u
         LEFT JOIN candidates c ON u.id = c.user_id
         LEFT JOIN interview_schedules ia ON u.id = ia.user_id
         WHERE u.id = $1
         GROUP BY u.id`,
        [userIds.screenlyUserId]
      );

      const userData = result.rows[0];

      // Get analytics for this recruiter
      const analytics = await this.getScreenlyAnalytics(userIds.screenlyUserId);

      return {
        ...company,
        name: userData?.company_name || company.name,
        description: `AI Screening Platform - ${
          userData?.total_candidates || 0
        } candidates`,
        analytics,
        lastUpdated: new Date(),
        metadata: {
          ...company.metadata,
          userData,
          companyName: userData?.company_name,
          companyId: userData?.company_id,
          totalCandidates: userData?.total_candidates || 0,
          totalInterviews: userData?.total_interviews || 0,
          userRole: userData?.role,
        },
      };
    } catch (error) {
      console.error("❌ Error fetching Screenly company details:", error);
      return {
        ...company,
        lastUpdated: new Date(),
      };
    }
  }

  /**
   * Get detailed Work platform company data
   */
  private async getWorkCompanyDetails(
    company: CompanyData,
    userId: number
  ): Promise<DetailedCompanyData> {
    console.log(`📊 Fetching Work platform details for: ${company.name}`);

    try {
      const userIds = await this.getUserPlatformIds(userId);

      // Get projects
      const projects = await this.getWorkProjects(userIds.workUserId);

      // Get team members
      const employees = await this.getWorkEmployees(userIds.workUserId);

      // Get financial data (timesheets, invoices)
      const financials = await this.getWorkFinancials(userIds.workUserId);

      return {
        ...company,
        employees,
        projects,
        financials,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error("❌ Error fetching Work platform company details:", error);
      return {
        ...company,
        lastUpdated: new Date(),
      };
    }
  }

  /**
   * Get detailed unified database company data
   */
  private async getUnifiedCompanyDetails(
    company: CompanyData,
    userId: number
  ): Promise<DetailedCompanyData> {
    console.log(`📊 Fetching unified database details for: ${company.name}`);

    try {
      // Get company details from unified database
      const [companyRows] = await unifiedPool.execute(
        `SELECT * FROM companies WHERE id = ?`,
        [company.originalId]
      );

      const companyData = (companyRows as any[])[0];

      // Get employees from user_roles
      const [employeeRows] = await unifiedPool.execute(
        `SELECT ur.*, uu.first_name, uu.last_name, uu.email
         FROM user_roles ur
         JOIN unified_users uu ON ur.user_id = uu.id
         WHERE ur.company_id = ? AND ur.is_active = TRUE`,
        [company.originalId]
      );

      const employees: EmployeeData[] = (employeeRows as any[]).map((emp) => ({
        id: `unified_${emp.user_id}`,
        name:
          `${emp.first_name || ""} ${emp.last_name || ""}`.trim() || emp.email,
        email: emp.email,
        role: emp.role,
        joinDate: emp.created_at,
        isActive: emp.is_active,
        platform: "unified",
      }));

      // CRITICAL: If this company originated from Bizoforce, fetch actual listing data
      const sourcePlatform = companyData?.platform || company.metadata?.sourcePlatform || company.platform;
      console.log(`🔍 Company source platform: ${sourcePlatform}`);
      
      if (sourcePlatform === 'bizoforce') {
        console.log(`🎯 Fetching Bizoforce data via API for unified company`);
        const userIds = await this.getUserPlatformIds(userId);
        
        if (userIds.bizoforceUserId) {
          // First, get the listing ID from the database
          let listingId: number | null = null;
          
          try {
            const [listingRows] = await bizoforcePool.execute(
              `SELECT p.ID
               FROM wp_posts p
               INNER JOIN wp_wpbdp_listings l ON p.ID = l.listing_id
               WHERE p.post_type = 'wpbdp_listing' 
                 AND p.post_author = ?
                 AND p.post_status = 'publish'
               ORDER BY p.post_date DESC
               LIMIT 1`,
              [userIds.bizoforceUserId]
            );
            
            if (listingRows && (listingRows as any[]).length > 0) {
              listingId = (listingRows as any[])[0].ID;
              console.log(`📋 Found listing ID: ${listingId} for user ${userIds.bizoforceUserId}`);
            }
          } catch (dbError) {
            console.error(`❌ Error fetching listing ID from database:`, dbError);
          }
          
          // Now try to fetch from API if we have a listing ID
          if (listingId) {
            try {
              // Fetch company data from Bizoforce API using listing ID
              const apiUrl = `${process.env.BIZOFORCE_API_URL}/companies/${listingId}`;
              const apiToken = process.env.BIZOFORCE_API_TOKEN || 'bizoforce_2024_secure_token_12345';
              
              console.log(`📡 Calling Bizoforce API: ${apiUrl}`);
              
              const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${apiToken}`,
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                const apiResponse = await response.json();
                console.log(`✅ Received data from Bizoforce API for listing ${listingId}`);
                console.log(`📋 API Response:`, apiResponse);
                
                // Unwrap the API response if it has success/data structure
                const apiData = apiResponse.success && apiResponse.data ? apiResponse.data : apiResponse;
                console.log(`📋 Unwrapped API data keys:`, Object.keys(apiData));
                
                // Fetch products, jobs, and financials from local database
                const products = await this.getBizoforceProducts(userIds.bizoforceUserId);
                const jobs = await this.getBizoforceJobs(userIds.bizoforceUserId);
                const financials = await this.getBizoforceFinancials(userIds.bizoforceUserId);
                
                // Map API data to our company structure
                return {
                  ...company,
                  name: apiData.name || apiData.company_name || company.name,
                  description: apiData.description || apiData.business_description || company.description,
                  logo: apiData.logo || apiData.image || companyData?.logo,
                  website: apiData.website || apiData.url,
                  location: apiData.headquarters || apiData.address || apiData.location,
                  phone: apiData.phone || apiData.contact_phone,
                  industry: apiData.industry || apiData.category,
                  foundedYear: apiData.year_incorporated || apiData.founded_year,
                  size: apiData.company_size || apiData.employees,
                  employees,
                  products,
                  jobs,
                  financials,
                  lastUpdated: new Date(),
                  metadata: {
                  ...company.metadata,
                  companyData,
                  listingId: apiData.listing_id || apiData.id,
                  listingUrl: apiData.listing_url || `/business-directory/${apiData.slug}/`,
                  bizoforceUserId: userIds.bizoforceUserId,
                  customFields: {
                    _listing_ceo: apiData.ceo || apiData.leadership?.ceo,
                    _listing_executives: apiData.executives || apiData.leadership?.executives,
                    _listing_headquarters: apiData.headquarters || apiData.address,
                    _listing_countries: apiData.countries || apiData.operating_countries,
                    _listing_year_incorporated: apiData.year_incorporated || apiData.founded_year,
                    _listing_employees: apiData.company_size || apiData.employee_count,
                    _listing_revenue: apiData.revenue,
                    _listing_description: apiData.description || apiData.business_description,
                    _listing_services: apiData.services,
                    _listing_products: apiData.products,
                    ...apiData, // Include all API fields
                  },
                },
                analytics: {
                  ...company.analytics,
                  candidateMetrics: {
                    totalReviews: apiData.review_count || apiData.total_reviews || 0,
                    averageRating: apiData.rating || apiData.average_rating || 0,
                    totalCandidates: 0,
                    totalApplications: 0,
                    totalInterviews: 0,
                    totalHired: 0,
                  },
                },
              };
            } else {
              console.error(`❌ Bizoforce API returned error: ${response.status} ${response.statusText}`);
              // Fall back to database query
            }
          } catch (apiError) {
            console.error(`❌ Error calling Bizoforce API:`, apiError);
            // Fall back to database query
          }
          } // Close if (listingId)
          
          // Fallback: Fetch Business Directory listing from wp_posts (post_type = 'wpbdp_listing')
          console.log(`📋 Falling back to direct database query for Bizoforce listing`);
          const [listingRows] = await bizoforcePool.execute(
            `SELECT p.*, l.*, 
                    u.display_name, u.user_email
             FROM wp_posts p
             INNER JOIN wp_wpbdp_listings l ON p.ID = l.listing_id
             LEFT JOIN wp_users u ON p.post_author = u.ID
             WHERE p.post_type = 'wpbdp_listing' 
               AND p.post_author = ?
               AND p.post_status = 'publish'
             ORDER BY p.post_date DESC
             LIMIT 1`,
            [userIds.bizoforceUserId]
          );

          if (listingRows && (listingRows as any[]).length > 0) {
            const listingData = (listingRows as any[])[0];
            console.log(`✅ Found Bizoforce business listing: ${listingData.post_title}`);
            
            // Fetch listing metadata (custom fields)
            const [metaRows] = await bizoforcePool.execute(
              `SELECT meta_key, meta_value 
               FROM wp_postmeta 
               WHERE post_id = ?`,
              [listingData.ID]
            );
            
            // Parse metadata into object
            const metadata: any = {};
            for (const row of metaRows as any[]) {
              metadata[row.meta_key] = row.meta_value;
            }
            
            console.log('📋 WordPress Field 68 (CEO):', metadata['_wpbdp[fields][68]']);
            console.log('📋 WordPress Field 72 (HQ):', metadata['_wpbdp[fields][72]']);
            console.log('📋 WordPress Field 21 (Countries):', metadata['_wpbdp[fields][21]']);
            console.log('📋 WordPress Field 73 (Year):', metadata['_wpbdp[fields][73]']);
            console.log('📋 WordPress Field 34 (Reviews):', metadata['_wpbdp[fields][34]']);
            
            // Extract rating from serialized PHP object
            let reviewCount = 0;
            let averageRating = 0;
            const ratingField = metadata['_wpbdp[fields][34]'];
            if (ratingField && ratingField.includes('count')) {
              const countMatch = ratingField.match(/i:(\d+)/);
              const avgMatch = ratingField.match(/d:([\d.]+)/);
              if (countMatch) reviewCount = parseInt(countMatch[1]);
              if (avgMatch) averageRating = parseFloat(avgMatch[1]);
            }
            console.log('⭐ Extracted review count:', reviewCount);
            console.log('⭐ Extracted review average:', averageRating);
            
            // Fetch products
            const products = await this.getBizoforceProducts(userIds.bizoforceUserId);
            
            // Fetch financial data
            const financials = await this.getBizoforceFinancials(userIds.bizoforceUserId);
            
            // Fetch jobs if any
            const jobs = await this.getBizoforceJobs(userIds.bizoforceUserId);
            
            const result = {
              ...company,
              name: listingData.post_title || company.name,
              description: listingData.post_content || listingData.post_excerpt || companyData?.description,
              logo: metadata['_thumbnail_id'] ? `https://staging.bizoforce.com/wp-content/uploads/${metadata['_thumbnail_id']}` : companyData?.logo,
              website: metadata['_wpbdp[fields][5]'] || companyData?.website,
              location: metadata['_wpbdp[fields][72]'] || metadata['_wpbdp[fields][11]'] || companyData?.location,
              phone: metadata['_wpbdp[fields][6]'] || companyData?.phone,
              industry: metadata['_wpbdp[fields][22]'] || companyData?.industry,
              foundedYear: metadata['_wpbdp[fields][73]'],
              size: metadata['_wpbdp[fields][75]'],
              employees,
              products,
              jobs,
              financials,
              lastUpdated: new Date(),
              metadata: {
                ...company.metadata,
                companyData,
                listingId: listingData.ID,
                listingStatus: listingData.listing_status,
                listingUrl: `/business-directory/${listingData.post_name}/`,
                bizoforceUserId: userIds.bizoforceUserId,
                customFields: {
                  ...metadata,
                  // Add semantic field aliases from WordPress field IDs
                  _listing_ceo: metadata['_wpbdp[fields][68]'],
                  _listing_ceo_title: metadata['_wpbdp[fields][69]'],
                  _listing_headquarters: metadata['_wpbdp[fields][72]'],
                  _listing_year_incorporated: metadata['_wpbdp[fields][73]'],
                  _listing_countries: metadata['_wpbdp[fields][21]'],
                  _listing_countries_served: metadata['_wpbdp[fields][76]'],
                  _listing_employees: metadata['_wpbdp[fields][75]'],
                  _listing_phone: metadata['_wpbdp[fields][6]'],
                  _listing_website: metadata['_wpbdp[fields][5]'],
                  _listing_description: metadata['_wpbdp[fields][2]'],
                  _listing_review_count: reviewCount,
                  _listing_review_average: averageRating,
                },
              },
            };
            
            console.log('✅ Mapped semantic fields:', {
              ceo: metadata['_wpbdp[fields][68]'],
              headquarters: metadata['_wpbdp[fields][72]'],
              countries: metadata['_wpbdp[fields][21]'],
              year: metadata['_wpbdp[fields][73]'],
              reviewCount,
              averageRating
            });
            
            return result;
          }
        }
      }

      return {
        ...company,
        description: companyData?.description || company.description,
        logo: companyData?.logo || undefined,
        website: companyData?.website || undefined,
        industry: companyData?.industry || undefined,
        size: companyData?.size || undefined,
        employees,
        lastUpdated: new Date(),
        metadata: {
          ...company.metadata,
          companyData,
        },
      };
    } catch (error) {
      console.error("❌ Error fetching unified company details:", error);
      return {
        ...company,
        lastUpdated: new Date(),
      };
    }
  }

  // Helper methods for fetching specific data types

  private async getBizoforceProducts(userId?: number): Promise<ProductData[]> {
    if (!userId) return [];

    try {
      const [rows] = await bizoforcePool.execute(
        `SELECT p.*, pm.meta_value as price
         FROM wp_posts p
         LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_price'
         WHERE p.post_author = ? AND p.post_type = 'product' AND p.post_status = 'publish'
         ORDER BY p.post_date DESC
         LIMIT 20`,
        [userId]
      );

      return (rows as any[]).map((product) => ({
        id: `bizoforce_product_${product.ID}`,
        name: product.post_title,
        description: product.post_excerpt || undefined,
        price: product.price ? parseFloat(product.price) : undefined,
        status: product.post_status as "active" | "inactive" | "draft",
        platform: "bizoforce",
        createdAt: new Date(product.post_date),
      }));
    } catch (error) {
      console.error("Error fetching Bizoforce products:", error);
      return [];
    }
  }

  private async getBizoforceFinancials(
    userId?: number
  ): Promise<FinancialData> {
    if (!userId) return {};

    try {
      // Get order statistics
      const [orderRows] = await bizoforcePool.execute(
        `SELECT 
           COUNT(*) as total_orders,
           SUM(CASE WHEN p.post_status = 'wc-completed' THEN 1 ELSE 0 END) as completed_orders,
           SUM(CASE WHEN p.post_status = 'wc-pending' THEN 1 ELSE 0 END) as pending_orders
         FROM wp_posts p
         JOIN wp_postmeta pm ON p.ID = pm.post_id
         WHERE pm.meta_key = '_customer_user' AND pm.meta_value = ?
         AND p.post_type = 'shop_order'`,
        [userId]
      );

      const orderStats = (orderRows as any[])[0];

      return {
        invoices: {
          total: orderStats.total_orders || 0,
          paid: orderStats.completed_orders || 0,
          pending: orderStats.pending_orders || 0,
          overdue: 0, // WooCommerce doesn't track overdue by default
        },
      };
    } catch (error) {
      console.error("Error fetching Bizoforce financials:", error);
      return {};
    }
  }

  private async getBizoforceAnalytics(userId?: number): Promise<AnalyticsData> {
    // Basic analytics - can be enhanced
    return {
      salesMetrics: {
        totalSales: 0,
        conversionRate: 0,
        averageOrderValue: 0,
      },
    };
  }

  private async getBizoforceJobs(userId?: number): Promise<JobData[]> {
    if (!userId) return [];

    try {
      // Check for job posts in wp_posts (custom post type 'job' or similar)
      const [rows] = await bizoforcePool.execute(
        `SELECT p.*, pm.meta_value as job_type
         FROM wp_posts p
         LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_job_type'
         WHERE p.post_author = ? 
           AND p.post_type IN ('job_listing', 'job', 'wpjb_job')
           AND p.post_status IN ('publish', 'pending')
         ORDER BY p.post_date DESC
         LIMIT 20`,
        [userId]
      );

      return (rows as any[]).map((job) => ({
        id: `bizoforce_job_${job.ID}`,
        title: job.post_title,
        description: job.post_content || undefined,
        type: (job.job_type as any) || "full-time",
        status: (job.post_status === 'publish' ? 'open' : 'draft') as "open" | "closed" | "draft",
        platform: "bizoforce",
        postedAt: new Date(job.post_date),
      }));
    } catch (error) {
      console.error("Error fetching Bizoforce jobs:", error);
      return [];
    }
  }

  private async getGiglancerJobs(userId?: number): Promise<JobData[]> {
    if (!userId) return [];

    try {
      const [rows] = await giglancerPool.execute(
        `SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
        [userId]
      );

      return (rows as any[]).map((job) => ({
        id: `giglancer_job_${job.id}`,
        title: job.title,
        description: job.description || undefined,
        requirements: job.requirements || undefined,
        location: job.location || undefined,
        salary: job.budget || undefined,
        type: (job.job_type as any) || "full-time",
        status: job.status as "open" | "closed" | "draft",
        platform: "giglancer",
        postedAt: new Date(job.created_at),
      }));
    } catch (error) {
      console.error("Error fetching Giglancer jobs:", error);
      return [];
    }
  }

  private async getGiglancerProjects(userId?: number): Promise<ProjectData[]> {
    if (!userId) return [];

    try {
      const [rows] = await giglancerPool.execute(
        `SELECT * FROM projects WHERE client_id = ? OR freelancer_id = ? ORDER BY created_at DESC LIMIT 20`,
        [userId, userId]
      );

      return (rows as any[]).map((project) => ({
        id: `giglancer_project_${project.id}`,
        name: project.title,
        description: project.description || undefined,
        status: (project.status as any) || "active",
        budget: project.budget ? parseFloat(project.budget) : undefined,
        deadline: project.deadline ? new Date(project.deadline) : undefined,
        platform: "giglancer",
        createdAt: new Date(project.created_at),
      }));
    } catch (error) {
      console.error("Error fetching Giglancer projects:", error);
      return [];
    }
  }

  /**
   * Screenly has no company structure - individual recruiters only
   * NOTE: No employees to return for personal AI screening tool
   */
  private async getScreenlyEmployees(userId: number): Promise<EmployeeData[]> {
    // Screenly is for individual recruiters, no company employees
    return [];
  }

  /**
   * Screenly has no job_postings table - it's for AI screening of candidates
   * NOTE: Screenly is not a job board, just a candidate screening tool
   */
  private async getScreenlyJobs(userId: number): Promise<JobData[]> {
    // Screenly doesn't have jobs - return empty array
    return [];
  }

  /**
   * Get analytics for Screenly recruiter (candidate screening metrics)
   */
  private async getScreenlyAnalytics(userId: number): Promise<AnalyticsData> {
    try {
      const result = await screenlyPool.query(
        `SELECT 
           COUNT(DISTINCT c.id) as total_candidates,
           COUNT(DISTINCT ca.id) as total_applications,
           COUNT(DISTINCT i.id) as total_interviews,
           COUNT(DISTINCT CASE WHEN ca.status = 'hired' THEN ca.id END) as total_hired
         FROM users u
         LEFT JOIN candidates c ON u.id = c.user_id
         LEFT JOIN candidate_applications ca ON c.id = ca.candidate_id
         LEFT JOIN interview_schedules i ON ca.id = i.application_id
         WHERE u.id = $1`,
        [userId]
      );

      const stats = result.rows[0];

      return {
        candidateMetrics: {
          totalCandidates: parseInt(stats.total_candidates) || 0,
          totalApplications: parseInt(stats.total_applications) || 0,
          totalInterviews: parseInt(stats.total_interviews) || 0,
          totalHired: parseInt(stats.total_hired) || 0,
          hireRate: stats.total_applications
            ? Math.round((stats.total_hired / stats.total_applications) * 100) /
              100
            : 0,
        },
      };
    } catch (error) {
      console.error("Error fetching Screenly analytics:", error);
      return {};
    }
  }

  private async getWorkProjects(userId?: number): Promise<ProjectData[]> {
    if (!userId) return [];

    try {
      const [rows] = await workPool.execute(
        `SELECT * FROM projects WHERE created_by = ? OR client_id = ? ORDER BY created_at DESC LIMIT 20`,
        [userId, userId]
      );

      return (rows as any[]).map((project) => ({
        id: `work_project_${project.id}`,
        name: project.name,
        description: project.description || undefined,
        status: (project.status as any) || "active",
        budget: project.budget ? parseFloat(project.budget) : undefined,
        deadline: project.deadline ? new Date(project.deadline) : undefined,
        progress: project.progress || 0,
        platform: "work",
        createdAt: new Date(project.created_at),
      }));
    } catch (error) {
      console.error("Error fetching Work projects:", error);
      return [];
    }
  }

  private async getWorkEmployees(userId?: number): Promise<EmployeeData[]> {
    if (!userId) return [];

    try {
      const [rows] = await workPool.execute(
        `SELECT u.*, tm.role as team_role, tm.joined_at
         FROM users u
         JOIN team_members tm ON u.id = tm.user_id
         JOIN teams t ON tm.team_id = t.id
         WHERE t.created_by = ?`,
        [userId]
      );

      return (rows as any[]).map((emp) => ({
        id: `work_user_${emp.id}`,
        name:
          `${emp.first_name || ""} ${emp.last_name || ""}`.trim() || emp.email,
        email: emp.email,
        role: emp.team_role || emp.role,
        joinDate: emp.joined_at
          ? new Date(emp.joined_at)
          : new Date(emp.created_at),
        isActive: emp.status === "active",
        platform: "work",
      }));
    } catch (error) {
      console.error("Error fetching Work employees:", error);
      return [];
    }
  }

  private async getWorkFinancials(userId?: number): Promise<FinancialData> {
    if (!userId) return {};

    try {
      const [invoiceRows] = await workPool.execute(
        `SELECT 
           COUNT(*) as total_invoices,
           SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid_invoices,
           SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_invoices,
           SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue_invoices,
           SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as total_revenue
         FROM invoices WHERE created_by = ?`,
        [userId]
      );

      const invoiceStats = (invoiceRows as any[])[0];

      return {
        revenue: {
          monthly: 0, // Would need date-based calculation
          quarterly: 0,
          yearly: invoiceStats.total_revenue || 0,
        },
        invoices: {
          total: invoiceStats.total_invoices || 0,
          paid: invoiceStats.paid_invoices || 0,
          pending: invoiceStats.pending_invoices || 0,
          overdue: invoiceStats.overdue_invoices || 0,
        },
      };
    } catch (error) {
      console.error("Error fetching Work financials:", error);
      return {};
    }
  }
}

export const companyAggregationService = new CompanyAggregationService();
