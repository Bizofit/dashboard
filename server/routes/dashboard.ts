import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import {
  unifiedDB,
  bizoforceDB,
  giglancerDB,
  screenlyDB,
  workDB,
  bizoforcePool,
  giglancerPool,
  screenlyPool,
  workPool,
} from "../db.js";
import { unifiedUsers, userRoles } from "../../shared/schema.js";
import { eq, and } from "drizzle-orm";
import type { RowDataPacket } from "mysql2/promise";

const router = Router();

// ============================================================================
// TYPES
// ============================================================================
interface DashboardStats {
  userType: string;
  user: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  stats: Record<string, any>;
  platformStats?: Record<string, any>;
  activities?: any[];
  quickActions?: any[];
  primaryGoal?: string;
}

// ============================================================================
// DASHBOARD STATS ENDPOINT
// ============================================================================
router.get(
  "/stats",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const userId = req.user!.userId;

      // Get user info with platform IDs
      const users = await unifiedDB
        .select()
        .from(unifiedUsers)
        .where(eq(unifiedUsers.id, userId))
        .limit(1);

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = users[0];

      // Get user roles to determine what data to show
      const roles = await unifiedDB
        .select()
        .from(userRoles)
        .where(eq(userRoles.userId, userId));

      // Determine primary role
      let primaryRole = "individual";
      if (roles.length > 0) {
        const primaryRoleObj = roles.find((r) => r.isPrimary);
        primaryRole = primaryRoleObj?.role || roles[0].role;
      }

      // Route to appropriate dashboard based on primary role
      let stats: DashboardStats;

      if (primaryRole === "company_admin") {
        stats = await getCompanyAdminDashboard(user);
      } else if (primaryRole === "hr") {
        stats = await getHRDashboard(user);
      } else if (primaryRole === "team_lead") {
        stats = await getTeamLeadDashboard(user);
      } else if (primaryRole === "finance") {
        stats = await getFinanceDashboard(user);
      } else {
        stats = await getIndividualDashboard(user);
      }

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      console.error("❌ Dashboard stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard stats",
        error: error.message,
      });
    }
  }
);

// ============================================================================
// DASHBOARD HELPERS
// ============================================================================

async function getCompanyAdminDashboard(user: any): Promise<DashboardStats> {
  const stats: DashboardStats = {
    userType: "company_admin",
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    stats: {},
    platformStats: {},
    activities: [],
    quickActions: [],
  };

  // Fetch stats (wrap in try-catch to avoid breaking)
  try {
    // Hiring stats
    stats.stats.openPositions = await getOpenPositionsCount(user);
    stats.stats.applications = await getApplicationsCount(user);
    stats.stats.aiScreenings = await getAIScreeningsCount(user);
    stats.stats.interviews = await getInterviewsCount(user);

    // Project stats
    stats.stats.activeProjects = await getActiveProjectsCount(user);
    stats.stats.teamMembers = await getTeamMembersCount(user);
    stats.stats.hoursLogged = await getHoursLoggedCount(user);
    stats.stats.pendingTimesheets = await getPendingTimesheetsCount(user);

    // Marketplace stats
    stats.stats.productsListed = await getProductsListedCount(user);
    stats.stats.totalSales = await getTotalSalesAmount(user);
    stats.stats.activeOrders = await getActiveOrdersCount(user);
    stats.stats.customerViews = await getCustomerViewsCount(user);
  } catch (statError: any) {
    console.error("Error fetching stats:", statError.message);
  }

  // Platform statistics (subscription info)
  stats.platformStats = {
    jobPostingCredits: { used: 35, total: 50, percentage: 70 },
    aiScreeningCredits: { used: 342, total: 500, percentage: 68 },
    subscriptionPlan: "Enterprise",
    nextBillingDate: "Dec 15, 2025",
  };

  // Recent activities
  stats.activities = await getRecentActivities(user);

  // Quick actions
  stats.quickActions = [
    { label: "Post Job", action: "/jobs/post", icon: "briefcase" },
    { label: "Add Product", action: "/products/add", icon: "package" },
    { label: "Create Project", action: "/projects/create", icon: "folder" },
    { label: "Invite Team", action: "/team/invite", icon: "users" },
  ];

  return stats;
}

async function getHRDashboard(user: any): Promise<DashboardStats> {
  return {
    userType: "hr",
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    stats: {
      openPositions: await getOpenPositionsCount(user),
      applications: await getApplicationsCount(user),
      aiScreenings: await getAIScreeningsCount(user),
      interviews: await getInterviewsCount(user),
      pendingOffers: await getPendingOffersCount(user),
    },
    activities: await getRecentActivities(user),
  };
}

async function getTeamLeadDashboard(user: any): Promise<DashboardStats> {
  return {
    userType: "team_lead",
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    stats: {
      activeProjects: await getActiveProjectsCount(user),
      teamMembers: await getTeamMembersCount(user),
      pendingTimesheets: await getPendingTimesheetsCount(user),
      projectsOnTime: await getProjectsOnTimeCount(user),
    },
    activities: await getRecentActivities(user),
  };
}

async function getFinanceDashboard(user: any): Promise<DashboardStats> {
  return {
    userType: "finance",
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    stats: {
      pendingInvoices: await getPendingInvoicesCount(user),
      monthlyRevenue: await getMonthlyRevenue(user),
      unpaidInvoices: await getUnpaidInvoicesCount(user),
      totalEarnings: await getTotalEarnings(user),
    },
    activities: await getRecentActivities(user),
  };
}

async function getIndividualDashboard(user: any): Promise<DashboardStats> {
  return {
    userType: "individual",
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    stats: {
      jobApplications: await getUserApplicationsCount(user),
      activeProjects: await getUserActiveProjectsCount(user),
      monthlyEarnings: await getUserMonthlyEarnings(user),
      hoursLogged: await getUserHoursLogged(user),
    },
    activities: await getRecentActivities(user),
  };
}

// ============================================================================
// STAT HELPER FUNCTIONS
// ============================================================================

async function getOpenPositionsCount(user: any): Promise<number> {
  try {
    if (!user.giglancerUserId) return 0;
    
    // Giglancer uses job_status_id (foreign key) not status field
    // Active jobs typically have job_status_id = 1 (but this varies)
    // For safety, just count all jobs for the user
    const [rows] = await giglancerPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM jobs WHERE user_id = ?',
      [user.giglancerUserId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("❌ Error fetching open positions (expected if jobs table structure differs):", error.message);
    console.error("📋 This is expected for legacy database schema differences");
    return 0;
  }
}

async function getApplicationsCount(user: any): Promise<number> {
  try {
    if (!user.giglancerUserId) return 0;
    
    // Giglancer uses 'bids' table for job applications, not 'job_applications'
    const [rows] = await giglancerPool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM bids 
       WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)`,
      [user.giglancerUserId]
    );
    return rows[0]?.count || 0;
  } catch (error: any) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error("❌ Table 'bids' does not exist in Giglancer database");
      console.error("📋 This is expected if bids feature is not yet implemented");
    } else {
      console.error("❌ Error fetching job bids:", error.message);
    }
    return 0;
  }
}

async function getAIScreeningsCount(user: any): Promise<number> {
  try {
    if (!user.screenlyUserId) return 0;
    
    // Query Screenly database (PostgreSQL) for screening projects
    const result = await screenlyPool.query(
      "SELECT COUNT(*) as count FROM screening_projects WHERE created_at >= NOW() - INTERVAL '30 days'"
    );
    return result.rows[0]?.count || 0;
  } catch (error: any) {
    if (error.code === '42P01') { // PostgreSQL table does not exist
      console.error("❌ Table 'screening_projects' does not exist in Screenly database");
      console.error("📋 This is expected if screening projects feature is not yet implemented");
    } else {
      console.error("❌ Error fetching AI screening projects:", error.message);
    }
    return 0;
  }
}

async function getInterviewsCount(user: any): Promise<number> {
  try {
    if (!user.screenlyUserId) return 0;
    
    // Query Screenly database (PostgreSQL) for upcoming candidate applications
    // Screenly doesn't have a separate interviews table, use candidate_applications with status filter
    const result = await screenlyPool.query(
      "SELECT COUNT(*) as count FROM candidate_applications WHERE status = 'interview_scheduled' AND updated_at >= CURRENT_DATE"
    );
    return result.rows[0]?.count || 0;
  } catch (error: any) {
    if (error.code === '42P01') { // PostgreSQL table does not exist
      console.error("❌ Table 'candidate_applications' does not exist in Screenly database");
      console.error("📋 This is expected if candidate applications feature is not yet implemented");
    } else {
      console.error("❌ Error fetching scheduled interviews:", error.message);
    }
    return 0;
  }
}

async function getPendingOffersCount(user: any): Promise<number> {
  try {
    if (!user.giglancerUserId) return 0;
    const [rows] = await giglancerPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM job_offers WHERE status = "pending"'
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching pending offers:", error);
    return 0;
  }
}

async function getActiveProjectsCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    // Get user's company_id from unified user_roles
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return 0;

    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM projects WHERE company_id = ? AND status = "active"',
      [companyId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching active projects:", error);
    return 0;
  }
}

async function getTeamMembersCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return 0;

    const [rows] = await workPool.query<RowDataPacket[]>(
      `SELECT COUNT(DISTINCT user_id) as count FROM project_members pm
       INNER JOIN projects p ON p.id = pm.project_id
       WHERE p.company_id = ?`,
      [companyId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return 0;
  }
}

async function getHoursLoggedCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return 0;

    const [rows] = await workPool.query<RowDataPacket[]>(
      `SELECT COALESCE(SUM(hours), 0) as count FROM timesheets t
       INNER JOIN users u ON u.id = t.user_id
       WHERE u.company_id = ? AND MONTH(t.date) = MONTH(CURDATE())`,
      [companyId]
    );
    return rows[0]?.count || 0;
  } catch (error: any) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table 'timesheets' does not exist in Work database`);
      console.error(
        `📋 This is expected if timesheets feature is not yet implemented`
      );
    } else {
      console.error("Error fetching hours logged:", error);
    }
    return 0;
  }
}

async function getPendingTimesheetsCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return 0;

    const [rows] = await workPool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM timesheets t
       INNER JOIN users u ON u.id = t.user_id
       WHERE u.company_id = ? AND t.status = "pending"`,
      [companyId]
    );
    return rows[0]?.count || 0;
  } catch (error: any) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table 'timesheets' does not exist in Work database`);
      console.error(
        `📋 This is expected if timesheets feature is not yet implemented`
      );
    } else {
      console.error("Error fetching pending timesheets:", error);
    }
    return 0;
  }
}

async function getProjectsOnTimeCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM projects WHERE status = "active" AND deadline >= CURDATE()'
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching projects on time:", error);
    return 0;
  }
}

async function getProductsListedCount(user: any): Promise<number> {
  try {
    if (!user.bizoforceUserId) return 0;
    const [rows] = await bizoforcePool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM wp_posts 
       WHERE post_author = ? AND post_type = 'product' AND post_status = 'publish'`,
      [user.bizoforceUserId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching products listed:", error);
    return 0;
  }
}

async function getTotalSalesAmount(user: any): Promise<string> {
  try {
    if (!user.bizoforceUserId) return "0.00";

    // Get WooCommerce order totals
    const [rows] = await bizoforcePool.query<RowDataPacket[]>(
      `SELECT COALESCE(SUM(meta_value), 0) as total
       FROM wp_postmeta pm
       INNER JOIN wp_posts p ON p.ID = pm.post_id
       WHERE p.post_type = 'shop_order'
       AND pm.meta_key = '_order_total'
       AND p.post_status IN ('wc-completed', 'wc-processing')`
    );

    return parseFloat(rows[0]?.total || "0").toFixed(2);
  } catch (error) {
    console.error("Error fetching total sales:", error);
    return "0.00";
  }
}

async function getActiveOrdersCount(user: any): Promise<number> {
  try {
    if (!user.bizoforceUserId) return 0;
    const [rows] = await bizoforcePool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM wp_posts 
       WHERE post_type = 'shop_order' AND post_status IN ('wc-processing', 'wc-on-hold')`
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching active orders:", error);
    return 0;
  }
}

async function getCustomerViewsCount(user: any): Promise<number> {
  try {
    // This would require analytics data - returning placeholder
    return 0;
  } catch (error) {
    console.error("Error fetching customer views:", error);
    return 0;
  }
}

async function getPendingInvoicesCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return 0;

    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM invoices WHERE company_id = ? AND status = "pending"',
      [companyId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching pending invoices:", error);
    return 0;
  }
}

async function getMonthlyRevenue(user: any): Promise<string> {
  try {
    if (!user.workUserId) return "0.00";
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return "0.00";

    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COALESCE(SUM(amount), 0) as total FROM invoices WHERE company_id = ? AND MONTH(created_at) = MONTH(CURDATE()) AND status = "paid"',
      [companyId]
    );
    return parseFloat(rows[0]?.total || "0").toFixed(2);
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return "0.00";
  }
}

async function getUnpaidInvoicesCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return 0;

    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM invoices WHERE company_id = ? AND status = "unpaid"',
      [companyId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching unpaid invoices:", error);
    return 0;
  }
}

async function getTotalEarnings(user: any): Promise<string> {
  try {
    if (!user.workUserId) return "0.00";
    // Get user's company_id
    const userRolesData = await unifiedDB
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, user.id));

    const companyId = userRolesData.find((r) => r.companyId)?.companyId;
    if (!companyId) return "0.00";

    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COALESCE(SUM(amount), 0) as total FROM invoices WHERE company_id = ? AND status = "paid"',
      [companyId]
    );
    return parseFloat(rows[0]?.total || "0").toFixed(2);
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    return "0.00";
  }
}

async function getUserApplicationsCount(user: any): Promise<number> {
  try {
    if (!user.giglancerUserId) return 0;
    const [rows] = await giglancerPool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM job_applications WHERE user_id = ?",
      [user.giglancerUserId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return 0;
  }
}

async function getUserActiveProjectsCount(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM project_members pm INNER JOIN projects p ON p.id = pm.project_id WHERE pm.user_id = ? AND p.status = "active"',
      [user.workUserId]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error fetching user active projects:", error);
    return 0;
  }
}

async function getUserMonthlyEarnings(user: any): Promise<string> {
  try {
    if (!user.workUserId) return "0.00";
    const [rows] = await workPool.query<RowDataPacket[]>(
      'SELECT COALESCE(SUM(t.hours * t.hourly_rate), 0) as total FROM timesheets t WHERE t.user_id = ? AND MONTH(t.date) = MONTH(CURDATE()) AND t.status = "approved"',
      [user.workUserId]
    );
    return parseFloat(rows[0]?.total || "0").toFixed(2);
  } catch (error: any) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table 'timesheets' does not exist in Work database`);
      console.error(
        `📋 This is expected if timesheets feature is not yet implemented`
      );
    } else {
      console.error("Error fetching user monthly earnings:", error);
    }
    return "0.00";
  }
}

async function getUserHoursLogged(user: any): Promise<number> {
  try {
    if (!user.workUserId) return 0;
    const [rows] = await workPool.query<RowDataPacket[]>(
      "SELECT COALESCE(SUM(hours), 0) as count FROM timesheets WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE())",
      [user.workUserId]
    );
    return rows[0]?.count || 0;
  } catch (error: any) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      console.error(`❌ Table 'timesheets' does not exist in Work database`);
      console.error(
        `📋 This is expected if timesheets feature is not yet implemented`
      );
    } else {
      console.error("Error fetching user hours logged:", error);
    }
    return 0;
  }
}

async function getRecentActivities(user: any): Promise<any[]> {
  // Placeholder for recent activities
  // In production, this would aggregate from multiple sources
  return [
    {
      type: "job_application",
      title: "New application received",
      time: "2 hours ago",
      icon: "user-check",
    },
    {
      type: "order",
      title: "Order #12345 completed",
      time: "5 hours ago",
      icon: "shopping-cart",
    },
    {
      type: "timesheet",
      title: "Timesheet approved",
      time: "1 day ago",
      icon: "clock",
    },
  ];
}

export default router;
