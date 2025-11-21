const { workDB } = require('../config/database');

async function analyzeWorkTables() {
  console.log('\n📊 Analyzing Work.Bizoforce Database Structure...\n');

  const keyTables = [
    'users',
    'projects',
    'tasks',
    'project_time_logs',
    'invoices',
    'invoice_items',
    'client_details',
    'teams',
    'project_members',
    'task_users',
    'employee_details',
    'payments'
  ];

  try {
    for (const table of keyTables) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Table: ${table}`);
      console.log(`${'='.repeat(60)}`);

      // Get column structure
      const [columns] = await workDB.query(`DESCRIBE ${table}`);
      console.log('\nColumns:');
      columns.forEach(col => {
        console.log(`  - ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key ? `[${col.Key}]` : ''}`);
      });

      // Get row count
      const [count] = await workDB.query(`SELECT COUNT(*) as total FROM ${table}`);
      console.log(`\nTotal Rows: ${count[0].total}`);

      // Get sample data (first 2 rows)
      if (count[0].total > 0) {
        const [sample] = await workDB.query(`SELECT * FROM ${table} LIMIT 2`);
        console.log('\nSample Data:');
        console.log(JSON.stringify(sample, null, 2));
      }
    }

    console.log('\n\n✅ Analysis Complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error analyzing tables:', error.message);
    process.exit(1);
  }
}

analyzeWorkTables();
