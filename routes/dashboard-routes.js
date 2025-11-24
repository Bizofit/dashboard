const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth-middleware");
const dashboardService = require("../services/dashboard-service");

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard statistics for the authenticated user
 * @access  Private
 */
router.get("/stats", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("[Dashboard Stats] Fetching for user ID:", userId);

    const stats = await dashboardService.getDashboardStats(userId);

    console.log("[Dashboard Stats] Success, userType:", stats.userType);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("[Dashboard Stats] Error:", error.message);
    console.error("[Dashboard Stats] Stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/dashboard/user
 * @desc    Get current user info (from session via JWT)
 * @access  Private
 */
router.get("/user", authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        userId: req.user.userId,
        email: req.user.email,
        userType: req.user.userType,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user information",
    });
  }
});

module.exports = router;
