import { Router, Request, Response } from "express";
import { authenticate } from "../auth/middleware.js";
import { bizoforcePool, unifiedPool } from "../db.js";
import type { RowDataPacket } from "mysql2/promise";

const router = Router();

/**
 * GET /api/products
 * Get all products for the authenticated user from WooCommerce (Bizoforce)
 */
router.get(
  "/",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const userId = req.user!.userId;
      
      console.log("📦 Products request for unified user:", userId);

      // First, get the user's Bizoforce ID from the unified DB
      const [userRows] = await unifiedPool.execute(
        "SELECT * FROM unified_users WHERE id = ?",
        [userId]
      ) as [RowDataPacket[], any];

      if (userRows.length === 0) {
        console.log("❌ User not found in unified DB:", userId);
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const bizoforceUserId = userRows[0].bizoforce_user_id;
      console.log("📦 Found Bizoforce user ID:", bizoforceUserId);

      if (!bizoforceUserId) {
        console.log("❌ No Bizoforce user ID found for user", userId);
        return res.json({
          success: true,
          data: {
            products: [],
            stats: {
              total_products: 0,
              published_products: 0,
              draft_products: 0,
              total_sales: 0,
            },
          },
          message: "User not linked to Bizoforce platform",
        });
      }

      // Get products with complete data from wp_posts table (WooCommerce products)
      const [products] = await bizoforcePool.execute<RowDataPacket[]>(
        `SELECT 
           p.ID,
           p.post_title as name,
           p.post_content as description,
           p.post_excerpt as short_description,
           p.post_status as status,
           p.post_date as created_at,
           p.post_modified as updated_at,
           p.post_author,
           p.guid as permalink,
           pm_price.meta_value as price,
           pm_regular_price.meta_value as regular_price,
           pm_sale_price.meta_value as sale_price,
           pm_stock.meta_value as stock_quantity,
           pm_stock_status.meta_value as stock_status,
           pm_sku.meta_value as sku,
           pm_featured.meta_value as featured
         FROM wp_posts p
         LEFT JOIN wp_postmeta pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
         LEFT JOIN wp_postmeta pm_regular_price ON p.ID = pm_regular_price.post_id AND pm_regular_price.meta_key = '_regular_price'
         LEFT JOIN wp_postmeta pm_sale_price ON p.ID = pm_sale_price.post_id AND pm_sale_price.meta_key = '_sale_price'
         LEFT JOIN wp_postmeta pm_stock ON p.ID = pm_stock.post_id AND pm_stock.meta_key = '_stock'
         LEFT JOIN wp_postmeta pm_stock_status ON p.ID = pm_stock_status.post_id AND pm_stock_status.meta_key = '_stock_status'
         LEFT JOIN wp_postmeta pm_sku ON p.ID = pm_sku.post_id AND pm_sku.meta_key = '_sku'
         LEFT JOIN wp_postmeta pm_featured ON p.ID = pm_featured.post_id AND pm_featured.meta_key = '_featured'
         WHERE p.post_type = 'product' 
         AND p.post_author = ?
         ORDER BY p.post_date DESC`,
        [bizoforceUserId]
      );

      // Get product stats
      const [stats] = await bizoforcePool.execute<RowDataPacket[]>(
        `SELECT 
           COUNT(*) as total_products,
           COUNT(CASE WHEN post_status = 'publish' THEN 1 END) as published_products,
           COUNT(CASE WHEN post_status = 'draft' THEN 1 END) as draft_products
         FROM wp_posts 
         WHERE post_type = 'product' 
         AND post_author = ?`,
        [bizoforceUserId]
      );

      // Format products data to match frontend interface
      const formattedProducts = products.map((product) => ({
        id: product.ID,
        name: product.name || "Untitled Product",
        description: product.description || "",
        status: product.status,
        permalink: product.permalink || "",
        price: product.price ? parseFloat(product.price) : 0,
        regular_price: product.regular_price ? parseFloat(product.regular_price) : 0,
        sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
        stock_status: product.stock_status || "instock",
        sku: product.sku || "",
        total_sales: 0, // Would need order data
        image: {
          url: `https://staging.bizoforce.com/wp-content/uploads/woocommerce-placeholder.png`,
          alt: product.name || "Product Image"
        },
        stock_quantity: product.stock_quantity ? parseInt(product.stock_quantity) : 0,
        featured: product.featured === "yes",
        created_at: product.created_at,
        updated_at: product.updated_at,
        author_id: product.post_author,
      }));

      const productStats = {
        total_products: stats[0]?.total_products || 0,
        published_products: stats[0]?.published_products || 0,
        draft_products: stats[0]?.draft_products || 0,
        total_sales: 0, // Would need order data to calculate this
      };

      console.log(
        `✅ Found ${formattedProducts.length} products for Bizoforce user ${bizoforceUserId}`
      );

      res.json({
        success: true,
        data: {
          products: formattedProducts,
          stats: productStats,
        },
        message: `Found ${formattedProducts.length} products`,
      });
    } catch (error: any) {
      console.error("❌ Error fetching products:", error);

      // Handle common database errors gracefully
      if (error.code === "ER_NO_SUCH_TABLE") {
        return res.json({
          success: true,
          data: { products: [], stats: { total_products: 0, published_products: 0, draft_products: 0, total_sales: 0 } },
          message: "Products table not found - WooCommerce may not be installed",
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch products",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
);

/**
 * GET /api/products/:productId
 * Get detailed information for a specific product
 */
router.get(
  "/:productId",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { productId } = req.params;
      const userId = req.user!.userId;
      
      console.log("📦 Product detail request for unified user:", userId, "product:", productId);

      // First, get the user's Bizoforce ID from the unified DB
      const [userRows] = await unifiedPool.execute(
        "SELECT * FROM unified_users WHERE id = ?",
        [userId]
      ) as [RowDataPacket[], any];

      if (userRows.length === 0) {
        console.log("❌ User not found in unified DB:", userId);
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const bizoforceUserId = userRows[0].bizoforce_user_id;

      console.log("📦 Product detail request:", { productId, userId, bizoforceUserId });

      if (!bizoforceUserId) {
        return res.status(404).json({
          success: false,
          message: "User not linked to Bizoforce platform",
        });
      }

      // Get single product with all metadata
      const [products] = await bizoforcePool.execute<RowDataPacket[]>(
        `SELECT 
           p.ID,
           p.post_title as title,
           p.post_content as description,
           p.post_excerpt as short_description,
           p.post_status as status,
           p.post_date as created_at,
           p.post_modified as updated_at,
           p.post_author,
           GROUP_CONCAT(DISTINCT CONCAT(pm.meta_key, ':', pm.meta_value) SEPARATOR '||') as metadata
         FROM wp_posts p
         LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id
         WHERE p.post_type = 'product' 
         AND p.ID = ?
         AND p.post_author = ?
         GROUP BY p.ID`,
        [productId, bizoforceUserId]
      );

      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found or access denied",
        });
      }

      const product = products[0];
      
      // Parse metadata
      const metadata: Record<string, string> = {};
      if (product.metadata) {
        product.metadata.split('||').forEach((item: string) => {
          const [key, value] = item.split(':', 2);
          if (key && value !== undefined) {
            metadata[key] = value;
          }
        });
      }

      const formattedProduct = {
        id: product.ID,
        title: product.title || "Untitled Product",
        description: product.description || "",
        short_description: product.short_description || "",
        price: metadata._price ? parseFloat(metadata._price) : 0,
        regular_price: metadata._regular_price ? parseFloat(metadata._regular_price) : 0,
        sale_price: metadata._sale_price ? parseFloat(metadata._sale_price) : null,
        stock_quantity: metadata._stock ? parseInt(metadata._stock) : 0,
        sku: metadata._sku || "",
        status: product.status,
        featured: metadata._featured === "yes",
        manage_stock: metadata._manage_stock === "yes",
        stock_status: metadata._stock_status || "instock",
        visibility: metadata._visibility || "visible",
        created_at: product.created_at,
        updated_at: product.updated_at,
        author_id: product.post_author,
        metadata: metadata,
      };

      console.log(`✅ Found product ${productId} for user ${bizoforceUserId}`);

      res.json({
        success: true,
        data: formattedProduct,
        message: "Product retrieved successfully",
      });
    } catch (error: any) {
      console.error("❌ Error fetching product detail:", error);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch product",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
);

export default router;