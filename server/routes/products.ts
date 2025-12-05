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
        `SELECT DISTINCT
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
         GROUP BY p.ID
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

      // Get related products (same author, exclude current product)
      const [relatedProducts] = await bizoforcePool.execute<RowDataPacket[]>(
        `SELECT DISTINCT
           p.ID,
           p.post_title as name,
           p.post_excerpt as short_description,
           pm_price.meta_value as price,
           pm_regular_price.meta_value as regular_price,
           pm_sale_price.meta_value as sale_price
         FROM wp_posts p
         LEFT JOIN wp_postmeta pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
         LEFT JOIN wp_postmeta pm_regular_price ON p.ID = pm_regular_price.post_id AND pm_regular_price.meta_key = '_regular_price'
         LEFT JOIN wp_postmeta pm_sale_price ON p.ID = pm_sale_price.post_id AND pm_sale_price.meta_key = '_sale_price'
         WHERE p.post_type = 'product' 
         AND p.post_author = ?
         AND p.ID != ?
         AND p.post_status = 'publish'
         GROUP BY p.ID
         ORDER BY p.post_date DESC
         LIMIT 3`,
        [bizoforceUserId, productId]
      );

      const formattedRelatedProducts = relatedProducts.map((p: any) => ({
        id: p.ID,
        name: p.name || "Untitled Product",
        short_description: p.short_description || "",
        price: p.price ? parseFloat(p.price) : 0,
        regular_price: p.regular_price ? parseFloat(p.regular_price) : 0,
        sale_price: p.sale_price ? parseFloat(p.sale_price) : null,
        image: {
          url: `https://staging.bizoforce.com/wp-content/uploads/woocommerce-placeholder.png`,
          alt: p.name || "Product Image"
        }
      }));

      console.log(`✅ Found product ${productId} for user ${bizoforceUserId}`);

      res.json({
        success: true,
        data: {
          product: formattedProduct,
          relatedProducts: formattedRelatedProducts
        },
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

/**
 * POST /api/products
 * Create a new product in WooCommerce (Bizoforce)
 */
router.post(
  "/",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const userId = req.user!.userId;
      const {
        name,
        description,
        categories,
        regular_price,
        sale_price,
        sale_schedule,
        files,
        status = 'draft'
      } = req.body;

      console.log("📦 Creating product for unified user:", userId);

      // Validate required fields
      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: "Product name and description are required"
        });
      }

      // Get the user's Bizoforce ID
      const [userRows] = await unifiedPool.execute(
        "SELECT bizoforce_user_id FROM unified_users WHERE id = ?",
        [userId]
      ) as [RowDataPacket[], any];

      if (userRows.length === 0 || !userRows[0].bizoforce_user_id) {
        return res.status(404).json({
          success: false,
          message: "User not linked to Bizoforce platform"
        });
      }

      const bizoforceUserId = userRows[0].bizoforce_user_id;
      console.log("📦 Creating product for Bizoforce user:", bizoforceUserId);

      // Insert the product post
      const [productResult] = await bizoforcePool.execute(
        `INSERT INTO wp_posts (
          post_author,
          post_date,
          post_date_gmt,
          post_content,
          post_title,
          post_excerpt,
          post_status,
          comment_status,
          ping_status,
          post_password,
          post_name,
          to_ping,
          pinged,
          post_modified,
          post_modified_gmt,
          post_content_filtered,
          post_parent,
          guid,
          menu_order,
          post_type,
          post_mime_type,
          comment_count,
          company_listing_id,
          is_giglancer_company
        ) VALUES (?, NOW(), UTC_TIMESTAMP(), ?, ?, '', ?, 'open', 'closed', '', ?, '', '', NOW(), UTC_TIMESTAMP(), '', 0, '', 0, 'product', '', 0, 0, 0)`,
        [
          bizoforceUserId,
          description,
          name,
          status,
          name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        ]
      ) as any;

      const productId = productResult.insertId;
      console.log("✅ Created product with ID:", productId);

      // Insert product metadata
      const metadata = [
        ['_price', regular_price || '0'],
        ['_regular_price', regular_price || '0'],
        ['_sale_price', sale_price || ''],
        ['_stock_status', 'instock'],
        ['_manage_stock', 'no'],
        ['_virtual', 'yes'],
        ['_downloadable', 'no'],
        ['_tax_status', 'taxable'],
        ['_tax_class', ''],
        ['_visibility', 'visible'],
        ['_featured', 'no'],
        ['_sold_individually', 'no']
      ];

      // Insert all metadata
      for (const [key, value] of metadata) {
        await bizoforcePool.execute(
          `INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (?, ?, ?)`,
          [productId, key, value]
        );
      }

      // Handle categories if provided
      if (categories && Array.isArray(categories) && categories.length > 0) {
        for (const categoryId of categories) {
          // Link product to category in wp_term_relationships
          await bizoforcePool.execute(
            `INSERT INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) 
             VALUES (?, ?, 0)
             ON DUPLICATE KEY UPDATE term_order = term_order`,
            [productId, categoryId]
          );
        }
      }

      // Handle file attachments if provided
      if (files && Array.isArray(files) && files.length > 0) {
        // Store file information in product meta
        await bizoforcePool.execute(
          `INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (?, '_product_files', ?)`,
          [productId, JSON.stringify(files)]
        );
      }

      console.log(`✅ Product created successfully: ${productId}`);

      res.status(201).json({
        success: true,
        data: {
          id: productId,
          name,
          description,
          status,
          regular_price: parseFloat(regular_price || '0'),
          sale_price: sale_price ? parseFloat(sale_price) : null,
        },
        message: "Product created successfully"
      });

    } catch (error: any) {
      console.error("❌ Error creating product:", error);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to create product",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
);

/**
 * PUT /api/products/:productId
 * Update an existing product in WooCommerce (Bizoforce)
 */
router.put(
  "/:productId",
  authenticate,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const { productId } = req.params;
      const userId = req.user!.userId;
      const {
        name,
        description,
        short_description,
        categories,
        tags,
        regular_price,
        sale_price,
        product_type,
        status
      } = req.body;

      console.log("📦 Updating product:", productId, "for user:", userId);

      // Get the user's Bizoforce ID
      const [userRows] = await unifiedPool.execute(
        "SELECT bizoforce_user_id FROM unified_users WHERE id = ?",
        [userId]
      ) as [RowDataPacket[], any];

      if (userRows.length === 0 || !userRows[0].bizoforce_user_id) {
        return res.status(404).json({
          success: false,
          message: "User not linked to Bizoforce platform"
        });
      }

      const bizoforceUserId = userRows[0].bizoforce_user_id;

      // Verify user owns the product
      const [productCheck] = await bizoforcePool.execute(
        `SELECT ID FROM wp_posts WHERE ID = ? AND post_author = ? AND post_type = 'product'`,
        [productId, bizoforceUserId]
      ) as [RowDataPacket[], any];

      if (productCheck.length === 0) {
        return res.status(403).json({
          success: false,
          message: "Product not found or access denied"
        });
      }

      // Update the product post
      const updateFields: string[] = [];
      const updateValues: any[] = [];

      if (name !== undefined) {
        updateFields.push('post_title = ?');
        updateValues.push(name);
      }

      if (description !== undefined) {
        updateFields.push('post_content = ?');
        updateValues.push(description);
      }

      if (short_description !== undefined) {
        updateFields.push('post_excerpt = ?');
        updateValues.push(short_description);
      }

      if (status !== undefined) {
        updateFields.push('post_status = ?');
        updateValues.push(status);
      }

      if (name !== undefined) {
        updateFields.push('post_name = ?');
        updateValues.push(name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      }

      if (updateFields.length > 0) {
        updateFields.push('post_modified = NOW()');
        updateFields.push('post_modified_gmt = UTC_TIMESTAMP()');
        updateValues.push(productId);

        await bizoforcePool.execute(
          `UPDATE wp_posts SET ${updateFields.join(', ')} WHERE ID = ?`,
          updateValues
        );
      }

      // Update product metadata
      const updateMeta = async (metaKey: string, metaValue: string) => {
        await bizoforcePool.execute(
          `INSERT INTO wp_postmeta (post_id, meta_key, meta_value) 
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE meta_value = ?`,
          [productId, metaKey, metaValue, metaValue]
        );
      };

      if (regular_price !== undefined) {
        await updateMeta('_regular_price', regular_price);
        await updateMeta('_price', regular_price);
      }

      if (sale_price !== undefined) {
        await updateMeta('_sale_price', sale_price);
        if (sale_price) {
          await updateMeta('_price', sale_price);
        }
      }

      // Handle categories
      if (categories && Array.isArray(categories)) {
        // Remove existing category relationships
        await bizoforcePool.execute(
          `DELETE FROM wp_term_relationships 
           WHERE object_id = ? 
           AND term_taxonomy_id IN (
             SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = 'product_cat'
           )`,
          [productId]
        );

        // Add new categories
        for (const categoryId of categories) {
          await bizoforcePool.execute(
            `INSERT INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) 
             VALUES (?, ?, 0)
             ON DUPLICATE KEY UPDATE term_order = term_order`,
            [productId, categoryId]
          );
        }
      }

      // Handle tags
      if (tags && Array.isArray(tags)) {
        // Store tags as comma-separated string in meta
        await updateMeta('_product_tags', tags.join(','));
      }

      console.log(`✅ Product ${productId} updated successfully`);

      res.json({
        success: true,
        data: {
          id: parseInt(productId),
          name,
          description,
          short_description,
          status,
          regular_price: regular_price ? parseFloat(regular_price) : null,
          sale_price: sale_price ? parseFloat(sale_price) : null,
        },
        message: "Product updated successfully"
      });

    } catch (error: any) {
      console.error("❌ Error updating product:", error);

      res.status(500).json({
        success: false,
        message: error.message || "Failed to update product",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }
);

export default router;