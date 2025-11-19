const { unifiedDB } = require('./config/database');

async function updateSchema() {
  console.log('🔄 Updating unified_users schema for migration...\n');

  try {
    const columns = [
      { name: 'bizoforce_user_id', type: 'BIGINT NULL', comment: 'WordPress user ID from Bizoforce' },
      { name: 'giglancer_user_id', type: 'BIGINT NULL', comment: 'User ID from Giglancer' },
      { name: 'screenly_user_id', type: 'INT NULL', comment: 'User ID from Screenly (PostgreSQL)' },
      { name: 'work_user_id', type: 'INT NULL', comment: 'User ID from Work.Bizoforce' },
      { name: 'needsRoleSelection', type: 'BOOLEAN DEFAULT FALSE', comment: 'User needs to select role on next login' },
      { name: 'pendingCompanyCreation', type: 'BOOLEAN DEFAULT FALSE', comment: 'User needs to create company' },
      { name: 'migrationSource', type: 'VARCHAR(50) NULL', comment: 'Primary platform this user came from' },
      { name: 'migrationDate', type: 'TIMESTAMP NULL', comment: 'When user was migrated' },
      { name: 'lastLogin', type: 'TIMESTAMP NULL', comment: 'Most recent login across all platforms' },
      { name: 'profileScore', type: 'INT DEFAULT 0', comment: 'Profile completeness (0-100)' },
      { name: 'isActive', type: 'BOOLEAN DEFAULT TRUE', comment: 'Account active status' },
      { name: 'isEmailConfirmed', type: 'BOOLEAN DEFAULT FALSE', comment: 'Email verification status' },
      { name: 'totalProjects', type: 'INT DEFAULT 0', comment: 'Total projects posted (employer)' },
      { name: 'totalJobApplications', type: 'INT DEFAULT 0', comment: 'Total job applications (job seeker)' },
      { name: 'totalBids', type: 'INT DEFAULT 0', comment: 'Total bids placed (freelancer)' },
      { name: 'totalTimesheets', type: 'INT DEFAULT 0', comment: 'Total timesheet entries (employee)' }
    ];

    for (const col of columns) {
      try {
        await unifiedDB.query(`
          ALTER TABLE unified_users 
          ADD COLUMN ${col.name} ${col.type} COMMENT '${col.comment}'
        `);
        console.log(`✅ Added column: ${col.name}`);
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log(`⚠️  Column already exists: ${col.name}`);
        } else {
          throw error;
        }
      }
    }

    // Create indexes
    console.log('\n📊 Creating indexes...');
    const indexes = [
      'idx_bizoforce_user',
      'idx_giglancer_user',
      'idx_screenly_user',
      'idx_work_user',
      'idx_migration_source'
    ];

    for (const idx of indexes) {
      try {
        const columnName = idx.replace('idx_', '').replace('_user', '_user_id');
        if (columnName.includes('migration')) {
          await unifiedDB.query(`CREATE INDEX ${idx} ON unified_users(migrationSource)`);
        } else {
          await unifiedDB.query(`CREATE INDEX ${idx} ON unified_users(${columnName})`);
        }
        console.log(`✅ Created index: ${idx}`);
      } catch (error) {
        if (error.code === 'ER_DUP_KEYNAME') {
          console.log(`⚠️  Index already exists: ${idx}`);
        } else {
          console.error(`❌ Failed to create index ${idx}:`, error.message);
        }
      }
    }

    // Create migration log table
    console.log('\n📋 Creating migration tables...');
    
    await unifiedDB.query(`
      CREATE TABLE IF NOT EXISTS user_migration_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        unified_user_id INT NOT NULL,
        platform VARCHAR(50) NOT NULL COMMENT 'bizoforce, giglancer, screenly, work',
        platform_user_id BIGINT NOT NULL,
        platform_email VARCHAR(255) NOT NULL,
        action VARCHAR(50) NOT NULL COMMENT 'created, merged, skipped, failed',
        role_detected VARCHAR(50) NULL COMMENT 'Role assigned during migration',
        activity_data JSON NULL COMMENT 'Activity metrics from platform',
        conflicts JSON NULL COMMENT 'Data conflicts found during merge',
        notes TEXT NULL,
        migrated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_platform_lookup (platform, platform_user_id),
        INDEX idx_migration_date (migrated_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created table: user_migration_log');

    await unifiedDB.query(`
      CREATE TABLE IF NOT EXISTS email_duplicates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        platform_count INT NOT NULL COMMENT 'Number of platforms this email appears on',
        platforms JSON NOT NULL COMMENT 'List of platforms',
        unified_user_id INT NULL COMMENT 'Final merged user ID',
        resolution_status ENUM('pending', 'auto_merged', 'manual_review', 'resolved') DEFAULT 'pending',
        resolution_notes TEXT NULL,
        detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP NULL,
        INDEX idx_email (email),
        INDEX idx_status (resolution_status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created table: email_duplicates');

    await unifiedDB.query(`
      CREATE TABLE IF NOT EXISTS migration_statistics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration_batch VARCHAR(100) NOT NULL,
        platform VARCHAR(50) NOT NULL,
        total_users INT NOT NULL,
        users_migrated INT DEFAULT 0,
        users_merged INT DEFAULT 0,
        users_skipped INT DEFAULT 0,
        users_failed INT DEFAULT 0,
        duplicates_found INT DEFAULT 0,
        start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_time TIMESTAMP NULL,
        duration_seconds INT NULL,
        status ENUM('running', 'completed', 'failed', 'paused') DEFAULT 'running',
        error_log TEXT NULL,
        INDEX idx_batch (migration_batch),
        INDEX idx_platform (platform),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created table: migration_statistics');

    console.log('\n✅ Schema update completed successfully!');

  } catch (error) {
    console.error('❌ Schema update failed:', error.message);
    throw error;
  } finally {
    await unifiedDB.end();
    process.exit(0);
  }
}

updateSchema();
