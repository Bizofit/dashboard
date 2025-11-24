const {
  unifiedDB,
  bizoforceDB,
  giglancerDB,
  screenlyDB,
  workDB,
} = require("../config/database");

class DashboardService {
  /**
   * Get dashboard statistics for a user based on their role
   * @param {number} userId - Unified user ID
   * @returns {Promise<Object>} Dashboard statistics
   */
  async getDashboardStats(userId) {
    try {
      // Get user info with platform IDs
      const [userRows] = await unifiedDB.query(
        "SELECT * FROM unified_users WHERE id = ?",
        [userId]
      );

      if (userRows.length === 0) {
        throw new Error("User not found");
      }

      const user = userRows[0];

      // Get user roles to determine what data to show
      const [roleRows] = await unifiedDB.query(
        "SELECT role, is_primary FROM user_roles WHERE user_id = ? AND is_active = 1",
        [userId]
      );

      // Handle users without roles - default based on user_type
      let primaryRole = null;
      const roles = roleRows.map((r) => r.role);

      if (roles.length > 0) {
        primaryRole = roleRows.find((r) => r.is_primary)?.role || roles[0];
      } else {
        // Default role based on user_type from registration
        if (user.user_type === "company") {
          primaryRole = "company_admin";
        } else {
          primaryRole = "individual";
        }
      }

      const isCompanyAdmin =
        roles.includes("company_admin") || primaryRole === "company_admin";
      const isHR = roles.includes("hr");
      const isTeamLead = roles.includes("team_lead");
      const isFinance = roles.includes("finance");

      // Route to appropriate dashboard based on primary role
      if (isCompanyAdmin) {
        return await this.getCompanyAdminDashboard(user);
      } else if (isHR) {
        return await this.getHRDashboard(user);
      } else if (isTeamLead) {
        return await this.getTeamLeadDashboard(user);
      } else if (isFinance) {
        return await this.getFinanceDashboard(user);
      } else {
        return await this.getIndividualDashboard(user);
      }
    } catch (error) {
      console.error("Error in getDashboardStats:", error);
      throw error;
    }
  }

  /**
   * Get Company Admin Dashboard - Full ecosystem overview
   */
  async getCompanyAdminDashboard(user) {
    try {
      const stats = {
        userType: "company_admin",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        stats: {},
        platformStats: {},
        activities: [],
        quickActions: [],
      };

      // Get primary goal from user metadata (if stored)
      const primaryGoal = user.primary_goal || "all";

      // Fetch stats based on primary goal (wrap in try-catch to avoid breaking)
      try {
        if (primaryGoal === "hiring" || primaryGoal === "all") {
          stats.stats.openPositions = await this.getOpenPositionsCount(user);
          stats.stats.applications = await this.getApplicationsCount(user);
          stats.stats.aiScreenings = await this.getAIScreeningsCount(user);
          stats.stats.interviews = await this.getInterviewsCount(user);
        }

        if (primaryGoal === "projects" || primaryGoal === "all") {
          stats.stats.activeProjects = await this.getActiveProjectsCount(user);
          stats.stats.teamMembers = await this.getTeamMembersCount(user);
          stats.stats.hoursLogged = await this.getHoursLoggedCount(user);
          stats.stats.pendingTimesheets = await this.getPendingTimesheetsCount(
            user
          );
        }

        if (primaryGoal === "marketplace" || primaryGoal === "all") {
          stats.stats.productsListed = await this.getProductsListedCount(user);
          stats.stats.totalSales = await this.getTotalSalesAmount(user);
          stats.stats.activeOrders = await this.getActiveOrdersCount(user);
          stats.stats.customerViews = await this.getCustomerViewsCount(user);
        }
      } catch (statError) {
        console.error("Error fetching stats:", statError.message);
        // Continue with default stats
      }

      // Platform statistics (subscription info)
      stats.platformStats = {
        jobPostingCredits: { used: 35, total: 50, percentage: 70 },
        aiScreeningCredits: { used: 342, total: 500, percentage: 68 },
        subscriptionPlan: "Enterprise",
        nextBillingDate: "Dec 15, 2025",
      };

      // Recent activities
      stats.activities = await this.getRecentActivities(user);

      // Quick actions based on goal
      stats.quickActions = this.getQuickActions(primaryGoal);
      stats.primaryGoal = primaryGoal;

      return stats;
    } catch (error) {
      console.error("Error in getCompanyAdminDashboard:", error);
      throw error;
    }
  }

  /**
   * Get HR Dashboard - Hiring focused
   */
  async getHRDashboard(user) {
    return {
      userType: "hr",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      stats: {
        openPositions: await this.getOpenPositionsCount(user),
        applications: await this.getApplicationsCount(user),
        aiScreenings: await this.getAIScreeningsCount(user),
        interviews: await this.getInterviewsCount(user),
        pendingOffers: await this.getPendingOffersCount(user),
      },
      activities: await this.getRecentActivities(user),
    };
  }

  /**
   * Get Team Lead Dashboard - Project focused
   */
  async getTeamLeadDashboard(user) {
    return {
      userType: "team_lead",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      stats: {
        activeProjects: await this.getActiveProjectsCount(user),
        teamMembers: await this.getTeamMembersCount(user),
        pendingTimesheets: await this.getPendingTimesheetsCount(user),
        projectsOnTime: await this.getProjectsOnTimeCount(user),
      },
      activities: await this.getRecentActivities(user),
    };
  }

  /**
   * Get Finance Dashboard - Billing focused
   */
  async getFinanceDashboard(user) {
    return {
      userType: "finance",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      stats: {
        pendingInvoices: await this.getPendingInvoicesCount(user),
        monthlyRevenue: await this.getMonthlyRevenue(user),
        unpaidInvoices: await this.getUnpaidInvoicesCount(user),
        totalEarnings: await this.getTotalEarnings(user),
      },
      activities: await this.getRecentActivities(user),
    };
  }

  /**
   * Get Individual User Dashboard - Job seeker/Freelancer
   */
  async getIndividualDashboard(user) {
    return {
      userType: "individual",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      stats: {
        jobApplications: await this.getUserApplicationsCount(user),
        activeProjects: await this.getUserActiveProjectsCount(user),
        monthlyEarnings: await this.getUserMonthlyEarnings(user),
        hoursLogged: await this.getUserHoursLogged(user),
      },
      activities: await this.getRecentActivities(user),
    };
  }

  // ==================== Helper Methods for Stats ====================

  async getOpenPositionsCount(user) {
    try {
      if (!user.giglancer_user_id) return 0;
      const [rows] = await giglancerDB.query(
        'SELECT COUNT(*) as count FROM jobs WHERE status = "active"'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching open positions:", error);
      return 0;
    }
  }

  async getApplicationsCount(user) {
    try {
      if (!user.giglancer_user_id) return 0;
      const [rows] = await giglancerDB.query(
        'SELECT COUNT(*) as count FROM job_applications WHERE status IN ("pending", "under_review")'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching applications:", error);
      return 0;
    }
  }

  async getAIScreeningsCount(user) {
    try {
      if (!user.screenly_user_id) return 0;
      const result = await screenlyDB.query(
        "SELECT COUNT(*) as count FROM screenings WHERE status = $1",
        ["completed"]
      );
      return result.rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching AI screenings:", error);
      return 0;
    }
  }

  async getInterviewsCount(user) {
    try {
      if (!user.giglancer_user_id) return 0;
      const [rows] = await giglancerDB.query(
        'SELECT COUNT(*) as count FROM interviews WHERE status = "scheduled"'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching interviews:", error);
      return 0;
    }
  }

  async getActiveProjectsCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COUNT(*) as count FROM projects WHERE status IN ("active", "in_progress")'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching active projects:", error);
      return 0;
    }
  }

  async getTeamMembersCount(user) {
    try {
      const [rows] = await unifiedDB.query(
        'SELECT COUNT(DISTINCT user_id) as count FROM user_roles WHERE role IN ("team_member", "team_lead") AND is_active = 1'
      );
      return rows[0].count || 1; // At least the admin
    } catch (error) {
      console.error("Error fetching team members:", error);
      return 1;
    }
  }

  async getHoursLoggedCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        "SELECT COALESCE(SUM(hours), 0) as total FROM timesheets WHERE MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE())"
      );
      return Math.round(rows[0].total || 0);
    } catch (error) {
      console.error("Error fetching hours logged:", error);
      return 0;
    }
  }

  async getPendingTimesheetsCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COUNT(*) as count FROM timesheets WHERE status = "pending"'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching pending timesheets:", error);
      return 0;
    }
  }

  async getProductsListedCount(user) {
    try {
      if (!user.bizoforce_user_id) return 0;
      const [rows] = await bizoforceDB.query(
        'SELECT COUNT(*) as count FROM wp_posts WHERE post_type = "product" AND post_status = "publish" AND post_author = ?',
        [user.bizoforce_user_id]
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching products listed:", error);
      return 0;
    }
  }

  async getTotalSalesAmount(user) {
    try {
      if (!user.bizoforce_user_id) return 0;
      const [rows] = await bizoforceDB.query(
        `SELECT COALESCE(SUM(meta_value), 0) as total 
         FROM wp_postmeta 
         WHERE meta_key = '_order_total' 
         AND post_id IN (
           SELECT ID FROM wp_posts 
           WHERE post_type = 'shop_order' 
           AND post_status IN ('wc-completed', 'wc-processing')
         )`
      );
      return parseFloat(rows[0].total || 0).toFixed(2);
    } catch (error) {
      console.error("Error fetching total sales:", error);
      return 0;
    }
  }

  async getActiveOrdersCount(user) {
    try {
      if (!user.bizoforce_user_id) return 0;
      const [rows] = await bizoforceDB.query(
        `SELECT COUNT(*) as count 
         FROM wp_posts 
         WHERE post_type = 'shop_order' 
         AND post_status IN ('wc-processing', 'wc-on-hold')`
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching active orders:", error);
      return 0;
    }
  }

  async getCustomerViewsCount(user) {
    // Placeholder - would need analytics tracking
    return 0;
  }

  async getPendingOffersCount(user) {
    try {
      if (!user.giglancer_user_id) return 0;
      const [rows] = await giglancerDB.query(
        'SELECT COUNT(*) as count FROM job_offers WHERE status = "pending"'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching pending offers:", error);
      return 0;
    }
  }

  async getProjectsOnTimeCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COUNT(*) as count FROM projects WHERE status = "active" AND deadline >= CURRENT_DATE()'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching projects on time:", error);
      return 0;
    }
  }

  async getPendingInvoicesCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COUNT(*) as count FROM invoices WHERE status = "pending"'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching pending invoices:", error);
      return 0;
    }
  }

  async getMonthlyRevenue(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        `SELECT COALESCE(SUM(amount), 0) as total 
         FROM invoices 
         WHERE status = 'paid' 
         AND MONTH(paid_date) = MONTH(CURRENT_DATE()) 
         AND YEAR(paid_date) = YEAR(CURRENT_DATE())`
      );
      return parseFloat(rows[0].total || 0).toFixed(2);
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
      return 0;
    }
  }

  async getUnpaidInvoicesCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COUNT(*) as count FROM invoices WHERE status IN ("pending", "overdue")'
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching unpaid invoices:", error);
      return 0;
    }
  }

  async getTotalEarnings(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COALESCE(SUM(amount), 0) as total FROM invoices WHERE status = "paid"'
      );
      return parseFloat(rows[0].total || 0).toFixed(2);
    } catch (error) {
      console.error("Error fetching total earnings:", error);
      return 0;
    }
  }

  async getUserApplicationsCount(user) {
    try {
      if (!user.giglancer_user_id) return 0;
      const [rows] = await giglancerDB.query(
        "SELECT COUNT(*) as count FROM job_applications WHERE user_id = ?",
        [user.giglancer_user_id]
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching user applications:", error);
      return 0;
    }
  }

  async getUserActiveProjectsCount(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        'SELECT COUNT(*) as count FROM project_members WHERE user_id = ? AND status = "active"',
        [user.work_user_id]
      );
      return rows[0].count || 0;
    } catch (error) {
      console.error("Error fetching user active projects:", error);
      return 0;
    }
  }

  async getUserMonthlyEarnings(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        `SELECT COALESCE(SUM(amount), 0) as total 
         FROM earnings 
         WHERE user_id = ? 
         AND MONTH(date) = MONTH(CURRENT_DATE()) 
         AND YEAR(date) = YEAR(CURRENT_DATE())`,
        [user.work_user_id]
      );
      return parseFloat(rows[0].total || 0).toFixed(2);
    } catch (error) {
      console.error("Error fetching user monthly earnings:", error);
      return 0;
    }
  }

  async getUserHoursLogged(user) {
    try {
      if (!user.work_user_id) return 0;
      const [rows] = await workDB.query(
        `SELECT COALESCE(SUM(hours), 0) as total 
         FROM timesheets 
         WHERE user_id = ? 
         AND MONTH(date) = MONTH(CURRENT_DATE()) 
         AND YEAR(date) = YEAR(CURRENT_DATE())`,
        [user.work_user_id]
      );
      return Math.round(rows[0].total || 0);
    } catch (error) {
      console.error("Error fetching user hours logged:", error);
      return 0;
    }
  }

  async getRecentActivities(user) {
    // Placeholder for recent activities - would need activity tracking
    return [
      {
        icon: "👤",
        title: "Profile Updated",
        description: `Welcome ${user.first_name || user.email}`,
        time: "Just now",
        color: "blue",
      },
      {
        icon: "🔐",
        title: "Login Successful",
        description: "You are now logged in",
        time: "Just now",
        color: "green",
      },
    ];
  }

  getQuickActions(primaryGoal) {
    if (primaryGoal === "hiring") {
      return [
        { icon: "📝", label: "Post Job", link: "/jobs" },
        { icon: "👥", label: "View Candidates", link: "/candidates" },
        { icon: "🤖", label: "AI Screening", link: "/screening" },
        { icon: "📅", label: "Schedule Interview", link: "/interviews" },
      ];
    } else if (primaryGoal === "projects") {
      return [
        { icon: "📁", label: "New Project", link: "/projects" },
        { icon: "👥", label: "Assign Team", link: "/team" },
        { icon: "⏱️", label: "Review Timesheets", link: "/timesheets" },
        { icon: "📊", label: "View Reports", link: "/reports" },
      ];
    } else if (primaryGoal === "marketplace") {
      return [
        { icon: "🛍️", label: "Add Product", link: "/products" },
        { icon: "📦", label: "View Orders", link: "/orders" },
        { icon: "💰", label: "Sales Report", link: "/sales" },
        { icon: "📈", label: "Analytics", link: "/analytics" },
      ];
    } else {
      return [
        { icon: "📝", label: "Post Job", link: "/jobs" },
        { icon: "📁", label: "New Project", link: "/projects" },
        { icon: "🛍️", label: "Add Product", link: "/products" },
        { icon: "👥", label: "Team Management", link: "/team" },
      ];
    }
  }
}

module.exports = new DashboardService();
