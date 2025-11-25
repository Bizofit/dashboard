/**
 * Platform ID Sync Service
 * Ensures all users have correct platform IDs populated across all databases
 * This service fixes the core issue where users exist in platforms but IDs aren't linked
 */

import mysql from 'mysql2/promise';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { retryDatabaseOperation } from '../server/db.js';
dotenv.config();

// Create database connections
const unifiedPool = mysql.createPool({
  host: process.env.UNIFIED_DB_HOST,
  user: process.env.UNIFIED_DB_USER,
  password: process.env.UNIFIED_DB_PASS,
  database: process.env.UNIFIED_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

const bizoforcePool = mysql.createPool({
  host: process.env.BIZOFORCE_DB_HOST,
  user: process.env.BIZOFORCE_DB_USER,
  password: process.env.BIZOFORCE_DB_PASS,
  database: process.env.BIZOFORCE_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

const giglancerPool = mysql.createPool({
  host: process.env.GIGLANCER_DB_HOST,
  user: process.env.GIGLANCER_DB_USER,
  password: process.env.GIGLANCER_DB_PASS,
  database: process.env.GIGLANCER_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

const workPool = mysql.createPool({
  host: process.env.WORK_DB_HOST,
  user: process.env.WORK_DB_USER,
  password: process.env.WORK_DB_PASS,
  database: process.env.WORK_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

const screenlyPool = new Pool({
  host: process.env.SCREENLY_DB_HOST,
  port: parseInt(process.env.SCREENLY_DB_PORT || '5432'),
  user: process.env.SCREENLY_DB_USER,
  password: process.env.SCREENLY_DB_PASS,
  database: process.env.SCREENLY_DB_NAME,
  max: 10
});

class PlatformIdSyncService {
  /**
   * Sync platform IDs for a single user by email
   */
  async syncUserPlatformIds(email) {
    console.log(`🔄 Syncing platform IDs for ${email}...`);
    
    try {
      // Get unified user
      const [unifiedUsers] = await unifiedPool.execute(
        'SELECT id, email, bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id FROM unified_users WHERE email = ?',
        [email]
      );
      
      if (unifiedUsers.length === 0) {
        throw new Error(`User ${email} not found in unified database`);
      }
      
      const user = unifiedUsers[0];
      const updates = {};
      
      // Check Bizoforce
      if (!user.bizoforce_user_id) {
        const [bizoforceUsers] = await bizoforcePool.execute(
          'SELECT ID FROM wp_users WHERE user_email = ?',
          [email]
        );
        if (bizoforceUsers.length > 0) {
          updates.bizoforce_user_id = bizoforceUsers[0].ID;
          console.log(`   ✅ Found Bizoforce ID: ${bizoforceUsers[0].ID}`);
        }
      }
      
      // Check Giglancer 
      if (!user.giglancer_user_id) {
        const [giglancerUsers] = await giglancerPool.execute(
          'SELECT id FROM users WHERE email = ?',
          [email]
        );
        if (giglancerUsers.length > 0) {
          updates.giglancer_user_id = giglancerUsers[0].id;
          console.log(`   ✅ Found Giglancer ID: ${giglancerUsers[0].id}`);
        }
      }
      
      // Check Screenly
      if (!user.screenly_user_id) {
        const screenlyResult = await screenlyPool.query(
          'SELECT id FROM users WHERE email = $1',
          [email]
        );
        if (screenlyResult.rows.length > 0) {
          updates.screenly_user_id = screenlyResult.rows[0].id;
          console.log(`   ✅ Found Screenly ID: ${screenlyResult.rows[0].id}`);
        }
      }
      
      // Check Work.Bizoforce
      if (!user.work_user_id) {
        const [workUsers] = await workPool.execute(
          'SELECT id FROM users WHERE email = ?',
          [email]
        );
        if (workUsers.length > 0) {
          updates.work_user_id = workUsers[0].id;
          console.log(`   ✅ Found Work ID: ${workUsers[0].id}`);
        }
      }
      
      // Update unified database if any IDs found
      if (Object.keys(updates).length > 0) {
        const updateFields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const updateValues = Object.values(updates);
        updateValues.push(user.id);
        
        await unifiedPool.execute(
          `UPDATE unified_users SET ${updateFields}, updated_at = NOW() WHERE id = ?`,
          updateValues
        );
        
        console.log(`   ✅ Updated unified user ${user.id} with ${Object.keys(updates).length} platform IDs`);
        return { success: true, updates, userId: user.id };
      } else {
        console.log(`   ℹ️  All platform IDs already populated`);
        return { success: true, updates: {}, userId: user.id };
      }
      
    } catch (error) {
      console.error(`❌ Error syncing platform IDs for ${email}:`, error.message);
      throw error;
    }
  }
  
  /**
   * Sync platform IDs for all users in unified database
   */
  async syncAllUsersPlatformIds() {
    console.log('🔄 Starting platform ID sync for all users...');
    
    try {
      const [allUsers] = await unifiedPool.execute(
        'SELECT id, email FROM unified_users WHERE is_active = TRUE'
      );
      
      console.log(`📊 Found ${allUsers.length} active users to sync`);
      
      const results = {
        total: allUsers.length,
        synced: 0,
        errors: 0,
        details: []
      };
      
      for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        console.log(`\n[${i + 1}/${allUsers.length}] Processing ${user.email}...`);
        
        try {
          const syncResult = await this.syncUserPlatformIds(user.email);
          results.synced++;
          results.details.push({
            email: user.email,
            success: true,
            updates: syncResult.updates
          });
        } catch (error) {
          results.errors++;
          results.details.push({
            email: user.email,
            success: false,
            error: error.message
          });
          console.error(`❌ Failed to sync ${user.email}: ${error.message}`);
        }
        
        // Small delay to avoid overwhelming database
        if (i % 10 === 0 && i > 0) {
          console.log(`⏸️  Processed ${i} users, taking a short break...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log('\n✅ Platform ID sync complete!');
      console.log(`📊 Results: ${results.synced} synced, ${results.errors} errors`);
      
      return results;
      
    } catch (error) {
      console.error('❌ Error in bulk platform ID sync:', error);
      throw error;
    }
  }
  
  /**
   * Get platform data for a user (with fresh platform ID lookup)
   */
  async getUserPlatformData(userId) {
    try {
      // First ensure platform IDs are synced
      const [users] = await unifiedPool.execute(
        'SELECT email FROM unified_users WHERE id = ?',
        [userId]
      );
      
      if (users.length === 0) {
        throw new Error(`User ${userId} not found`);
      }
      
      // Sync platform IDs
      await this.syncUserPlatformIds(users[0].email);
      
      // Get updated user with all platform IDs
      const [updatedUsers] = await unifiedPool.execute(
        'SELECT bizoforce_user_id, giglancer_user_id, screenly_user_id, work_user_id FROM unified_users WHERE id = ?',
        [userId]
      );
      
      const user = updatedUsers[0];
      const platformData = {
        bizoforce: null,
        giglancer: null,
        screenly: null,
        work: null
      };
      
      // Fetch Bizoforce data
      if (user.bizoforce_user_id) {
        try {
          const [listings] = await retryDatabaseOperation(() => 
            bizoforcePool.execute(
              'SELECT ID, post_title, post_status FROM wp_posts WHERE post_author = ? AND post_type = "listing"',
              [user.bizoforce_user_id]
            )
          );
          
          const [products] = await retryDatabaseOperation(() => 
            bizoforcePool.execute(
              'SELECT COUNT(*) as count FROM wp_posts WHERE post_type = "product" AND post_author = ?',
              [user.bizoforce_user_id]
            )
          );
          
          platformData.bizoforce = {
            userId: user.bizoforce_user_id,
            listings: listings.map(l => ({
              id: l.ID,
              title: l.post_title,
              status: l.post_status
            })),
            listingCount: listings.length,
            productCount: products[0].count,
            primaryListingId: listings.length > 0 ? listings[0].ID : null
          };
        } catch (error) {
          console.warn('⚠️ Failed to fetch Bizoforce data for user:', user.bizoforce_user_id, error.message);
          platformData.bizoforce = {
            userId: user.bizoforce_user_id,
            listings: [],
            listingCount: 0,
            productCount: 0,
            primaryListingId: null
          };
        }
      }
      
      // Fetch Giglancer data
      if (user.giglancer_user_id) {
        try {
          const [jobs] = await retryDatabaseOperation(() => 
            giglancerPool.execute(
              'SELECT COUNT(*) as count FROM jobs WHERE user_id = ?',
              [user.giglancer_user_id]
            )
          );
          
          platformData.giglancer = {
            userId: user.giglancer_user_id,
            jobCount: jobs[0].count
          };
        } catch (error) {
          console.warn('⚠️ Failed to fetch Giglancer data for user:', user.giglancer_user_id, error.message);
          platformData.giglancer = {
            userId: user.giglancer_user_id,
            jobCount: 0
          };
        }
      }
      
      // Fetch Screenly data
      if (user.screenly_user_id) {
        try {
          const companies = await retryDatabaseOperation(() => 
            screenlyPool.query(
              'SELECT id, company_name FROM users WHERE id = $1',
              [user.screenly_user_id]
            )
          );
          
          platformData.screenly = {
            userId: user.screenly_user_id,
            companyName: companies.rows.length > 0 ? companies.rows[0].company_name : null
          };
        } catch (error) {
          console.warn('⚠️ Failed to fetch Screenly data for user:', user.screenly_user_id, error.message);
          platformData.screenly = {
            userId: user.screenly_user_id,
            companyName: null
          };
        }
      }
      
      // Fetch Work data  
      if (user.work_user_id) {
        try {
          const [workData] = await retryDatabaseOperation(() => 
            workPool.execute(
              'SELECT company_id FROM users WHERE id = ?',
              [user.work_user_id]
            )
          );
          
          platformData.work = {
            userId: user.work_user_id,
            companyId: workData.length > 0 ? workData[0].company_id : null
          };
        } catch (error) {
          console.warn('⚠️ Failed to fetch Work data for user:', user.work_user_id, error.message);
          platformData.work = {
            userId: user.work_user_id,
            companyId: null
          };
        }
      }
      
      return platformData;
      
    } catch (error) {
      console.error(`❌ Error getting platform data for user ${userId}:`, error.message);
      throw error;
    }
  }
}

export default new PlatformIdSyncService();