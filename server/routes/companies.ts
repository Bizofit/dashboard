import { Router, Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { companyAggregationService } from "../services/company-aggregation-service.js";

const router = Router();

/**
 * GET /api/companies
 * Get all companies for the authenticated user
 */
router.get(
  "/",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const userId = req.user!.userId;
      console.log(`🏢 Getting companies for user ${userId}`);

      const companies = await companyAggregationService.getUserCompanies(
        userId
      );

      console.log(`✅ Found ${companies.length} companies for user ${userId}`);
      res.json({
        success: true,
        data: companies,
        message: `Found ${companies.length} companies`,
      });
    } catch (error) {
      console.error("❌ Error getting user companies:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get companies",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId
 * Get detailed information for a specific company
 */
router.get(
  "/:companyId",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(
        `🔍 Getting detailed data for company ${companyId} for user ${userId}`
      );

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      console.log(`✅ Retrieved detailed data for ${companyDetails.name}`);
      res.json({
        success: true,
        data: companyDetails,
        message: "Company details retrieved successfully",
      });
    } catch (error) {
      console.error("❌ Error getting company details:", error);
      const statusCode =
        error instanceof Error && error.message.includes("not found")
          ? 404
          : 500;
      res.status(statusCode).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company details",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/employees
 * Get employees for a specific company
 */
router.get(
  "/:companyId/employees",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`👥 Getting employees for company ${companyId}`);

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      res.json({
        success: true,
        data: companyDetails.employees || [],
        message: `Found ${companyDetails.employees?.length || 0} employees`,
      });
    } catch (error) {
      console.error("❌ Error getting company employees:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company employees",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/products
 * Get products for a specific company
 */
router.get(
  "/:companyId/products",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`🛍️ Getting products for company ${companyId}`);

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      res.json({
        success: true,
        data: companyDetails.products || [],
        message: `Found ${companyDetails.products?.length || 0} products`,
      });
    } catch (error) {
      console.error("❌ Error getting company products:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company products",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/jobs
 * Get jobs for a specific company
 */
router.get(
  "/:companyId/jobs",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`💼 Getting jobs for company ${companyId}`);

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      res.json({
        success: true,
        data: companyDetails.jobs || [],
        message: `Found ${companyDetails.jobs?.length || 0} jobs`,
      });
    } catch (error) {
      console.error("❌ Error getting company jobs:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get company jobs",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/projects
 * Get projects for a specific company
 */
router.get(
  "/:companyId/projects",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`📋 Getting projects for company ${companyId}`);

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      res.json({
        success: true,
        data: companyDetails.projects || [],
        message: `Found ${companyDetails.projects?.length || 0} projects`,
      });
    } catch (error) {
      console.error("❌ Error getting company projects:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company projects",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/financials
 * Get financial data for a specific company
 */
router.get(
  "/:companyId/financials",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`💰 Getting financials for company ${companyId}`);

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      res.json({
        success: true,
        data: companyDetails.financials || {},
        message: "Financial data retrieved successfully",
      });
    } catch (error) {
      console.error("❌ Error getting company financials:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company financials",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/analytics
 * Get analytics data for a specific company
 */
router.get(
  "/:companyId/analytics",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`📊 Getting analytics for company ${companyId}`);

      const companyDetails = await companyAggregationService.getCompanyDetails(
        companyId,
        userId
      );

      if (!companyDetails) {
        return res.status(404).json({
          success: false,
          message: `Company ${companyId} not found or access denied`,
        });
      }

      res.json({
        success: true,
        data: companyDetails.analytics || {},
        message: "Analytics data retrieved successfully",
      });
    } catch (error) {
      console.error("❌ Error getting company analytics:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company analytics",
      });
    }
  }
);

/**
 * GET /api/companies/:companyId/candidates
 * Get candidates (bids) for company projects from Giglancer
 */
router.get(
  "/:companyId/candidates",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { companyId } = req.params;
      const userId = req.user!.userId;

      console.log(`👥 Getting candidates for company ${companyId}`);

      const candidates = await companyAggregationService.getCompanyCandidates(
        companyId,
        userId
      );

      res.json({
        success: true,
        data: candidates.candidates,
        stats: candidates.stats,
        message: `Found ${candidates.candidates.length} candidates`,
      });
    } catch (error) {
      console.error("❌ Error getting company candidates:", error);
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get company candidates",
      });
    }
  }
);

export default router;
