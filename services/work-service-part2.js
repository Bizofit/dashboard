const { workDB } = require('../config/database');
const logger = require('../config/logger');

/**
 * Work.Bizoforce Service - Part 2
 * Additional business logic for:
 * - Invoices
 * - Clients
 * - Teams
 * - Reports & Earnings
 */

// ============================================
// INVOICES
// ============================================

/**
 * Get all invoices
 */
async function getAllInvoices(filters = {}) {
  try {
    let query = `
      SELECT i.*,
             cd.company_name as client_name,
             p.project_name,
             (SELECT SUM(amount) FROM invoice_items WHERE invoice_id = i.id) as total_amount,
             (SELECT SUM(amount) FROM payments WHERE invoice_id = i.id) as paid_amount
      FROM invoices i
      LEFT JOIN client_details cd ON i.client_id = cd.id
      LEFT JOIN projects p ON i.project_id = p.id
      WHERE 1=1
    `;

    const params = [];

    if (filters.client_id) {
      query += ' AND i.client_id = ?';
      params.push(filters.client_id);
    }

    if (filters.project_id) {
      query += ' AND i.project_id = ?';
      params.push(filters.project_id);
    }

    if (filters.status) {
      query += ' AND i.status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY i.invoice_date DESC';

    const [invoices] = await workDB.query(query, params);
    return invoices;
  } catch (error) {
    logger.error('Get all invoices error', { error: error.message });
    throw error;
  }
}

/**
 * Get invoice by ID
 */
async function getInvoiceById(invoiceId) {
  try {
    const [invoices] = await workDB.query(`
      SELECT i.*,
             cd.company_name as client_name, cd.email as client_email,
             p.project_name
      FROM invoices i
      LEFT JOIN client_details cd ON i.client_id = cd.id
      LEFT JOIN projects p ON i.project_id = p.id
      WHERE i.id = ?
    `, [invoiceId]);

    if (invoices.length === 0) {
      throw new Error('Invoice not found');
    }

    // Get invoice items
    const [items] = await workDB.query(`
      SELECT * FROM invoice_items WHERE invoice_id = ?
    `, [invoiceId]);

    // Get payments
    const [payments] = await workDB.query(`
      SELECT * FROM payments WHERE invoice_id = ? ORDER BY paid_on DESC
    `, [invoiceId]);

    return {
      ...invoices[0],
      items,
      payments
    };
  } catch (error) {
    logger.error('Get invoice by ID error', { invoiceId, error: error.message });
    throw error;
  }
}

/**
 * Create invoice
 */
async function createInvoice(invoiceData) {
  try {
    const [result] = await workDB.query(`
      INSERT INTO invoices (
        company_id, project_id, client_id, invoice_number,
        issue_date, due_date, sub_total, discount, discount_type,
        tax, total, currency_id, status, note,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      invoiceData.company_id,
      invoiceData.project_id || null,
      invoiceData.client_id,
      invoiceData.invoice_number,
      invoiceData.issue_date,
      invoiceData.due_date,
      invoiceData.sub_total || 0,
      invoiceData.discount || 0,
      invoiceData.discount_type || 'percent',
      invoiceData.tax || 0,
      invoiceData.total || 0,
      invoiceData.currency_id || 1,
      invoiceData.status || 'unpaid',
      invoiceData.note || null
    ]);

    // Add invoice items if provided
    if (invoiceData.items && invoiceData.items.length > 0) {
      for (const item of invoiceData.items) {
        await workDB.query(`
          INSERT INTO invoice_items (
            invoice_id, item_name, item_summary, type, quantity,
            unit_price, amount, taxes, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
          result.insertId,
          item.item_name,
          item.item_summary || null,
          item.type || 'item',
          item.quantity || 1,
          item.unit_price || 0,
          item.amount || 0,
          item.taxes || null
        ]);
      }
    }

    logger.info('Invoice created', { invoiceId: result.insertId, number: invoiceData.invoice_number });
    return { id: result.insertId, ...invoiceData };
  } catch (error) {
    logger.error('Create invoice error', { error: error.message });
    throw error;
  }
}

/**
 * Generate invoice from approved time logs
 */
async function generateInvoiceFromTimeLogs(data) {
  try {
    // Get approved time logs
    const [timeLogs] = await workDB.query(`
      SELECT ptl.*, u.name as user_name, ed.hourly_rate,
             TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time) / 3600 as hours_worked,
             TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time) / 3600 * ed.hourly_rate as amount
      FROM project_time_logs ptl
      INNER JOIN users u ON ptl.user_id = u.id
      INNER JOIN employee_details ed ON u.id = ed.user_id
      WHERE ptl.project_id = ?
        AND ptl.approved = 1
        AND ptl.invoice_id IS NULL
        AND ptl.end_time IS NOT NULL
        ${data.start_date ? 'AND ptl.start_time >= ?' : ''}
        ${data.end_date ? 'AND ptl.end_time <= ?' : ''}
    `, [data.project_id, data.start_date, data.end_date].filter(Boolean));

    if (timeLogs.length === 0) {
      throw new Error('No approved time logs found for invoicing');
    }

    // Calculate totals
    const subTotal = timeLogs.reduce((sum, log) => sum + parseFloat(log.amount || 0), 0);
    const tax = subTotal * (data.tax_rate || 0) / 100;
    const total = subTotal + tax;

    // Create invoice
    const invoiceData = {
      company_id: data.company_id,
      project_id: data.project_id,
      client_id: data.client_id,
      invoice_number: data.invoice_number || `INV-${Date.now()}`,
      issue_date: data.issue_date || new Date(),
      due_date: data.due_date,
      sub_total: subTotal,
      discount: data.discount || 0,
      discount_type: data.discount_type || 'percent',
      tax,
      total,
      currency_id: data.currency_id || 1,
      status: 'unpaid',
      note: `Generated from ${timeLogs.length} approved time log entries`
    };

    const [result] = await workDB.query(`
      INSERT INTO invoices (
        company_id, project_id, client_id, invoice_number,
        issue_date, due_date, sub_total, discount, discount_type,
        tax, total, currency_id, status, note,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      invoiceData.company_id,
      invoiceData.project_id,
      invoiceData.client_id,
      invoiceData.invoice_number,
      invoiceData.issue_date,
      invoiceData.due_date,
      invoiceData.sub_total,
      invoiceData.discount,
      invoiceData.discount_type,
      invoiceData.tax,
      invoiceData.total,
      invoiceData.currency_id,
      invoiceData.status,
      invoiceData.note
    ]);

    const invoiceId = result.insertId;

    // Group time logs by user and create invoice items
    const userGroups = {};
    timeLogs.forEach(log => {
      if (!userGroups[log.user_id]) {
        userGroups[log.user_id] = {
          user_name: log.user_name,
          hourly_rate: log.hourly_rate,
          hours: 0,
          amount: 0
        };
      }
      userGroups[log.user_id].hours += parseFloat(log.hours_worked || 0);
      userGroups[log.user_id].amount += parseFloat(log.amount || 0);
    });

    // Create invoice items
    for (const userId in userGroups) {
      const group = userGroups[userId];
      await workDB.query(`
        INSERT INTO invoice_items (
          invoice_id, item_name, item_summary, type, quantity,
          unit_price, amount, created_at, updated_at
        ) VALUES (?, ?, ?, 'hours', ?, ?, ?, NOW(), NOW())
      `, [
        invoiceId,
        `${group.user_name} - Hours Worked`,
        `${group.hours.toFixed(2)} hours @ $${group.hourly_rate}/hr`,
        group.hours,
        group.hourly_rate,
        group.amount
      ]);
    }

    // Update time logs with invoice ID
    const timeLogIds = timeLogs.map(log => log.id);
    await workDB.query(`
      UPDATE project_time_logs SET invoice_id = ? WHERE id IN (?)
    `, [invoiceId, timeLogIds]);

    logger.info('Invoice generated from time logs', { invoiceId, timeLogCount: timeLogs.length });
    return { id: invoiceId, ...invoiceData, items: Object.values(userGroups) };
  } catch (error) {
    logger.error('Generate invoice from time logs error', { error: error.message });
    throw error;
  }
}

/**
 * Update invoice
 */
async function updateInvoice(invoiceId, invoiceData) {
  try {
    const updates = [];
    const params = [];

    Object.keys(invoiceData).forEach(key => {
      if (invoiceData[key] !== undefined && key !== 'items') {
        updates.push(`${key} = ?`);
        params.push(invoiceData[key]);
      }
    });

    if (updates.length > 0) {
      updates.push('updated_at = NOW()');
      params.push(invoiceId);

      await workDB.query(`
        UPDATE invoices SET ${updates.join(', ')} WHERE id = ?
      `, params);
    }

    logger.info('Invoice updated', { invoiceId });
    return { id: invoiceId, ...invoiceData };
  } catch (error) {
    logger.error('Update invoice error', { invoiceId, error: error.message });
    throw error;
  }
}

/**
 * Update invoice status
 */
async function updateInvoiceStatus(invoiceId, status) {
  try {
    await workDB.query(`
      UPDATE invoices SET status = ?, updated_at = NOW() WHERE id = ?
    `, [status, invoiceId]);

    logger.info('Invoice status updated', { invoiceId, status });
    return { id: invoiceId, status };
  } catch (error) {
    logger.error('Update invoice status error', { invoiceId, error: error.message });
    throw error;
  }
}

/**
 * Delete invoice
 */
async function deleteInvoice(invoiceId) {
  try {
    // Delete invoice items first
    await workDB.query('DELETE FROM invoice_items WHERE invoice_id = ?', [invoiceId]);

    // Delete invoice
    await workDB.query('DELETE FROM invoices WHERE id = ?', [invoiceId]);

    logger.info('Invoice deleted', { invoiceId });
    return { id: invoiceId, deleted: true };
  } catch (error) {
    logger.error('Delete invoice error', { invoiceId, error: error.message });
    throw error;
  }
}

// ============================================
// CLIENTS
// ============================================

/**
 * Get all clients
 */
async function getAllClients(filters = {}) {
  try {
    let query = `
      SELECT cd.*,
             (SELECT COUNT(*) FROM projects WHERE client_id = cd.id) as project_count,
             (SELECT COUNT(*) FROM invoices WHERE client_id = cd.id) as invoice_count
      FROM client_details cd
      WHERE 1=1
    `;

    const params = [];

    if (filters.search) {
      query += ' AND (cd.company_name LIKE ? OR cd.email LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY cd.created_at DESC';

    const [clients] = await workDB.query(query, params);
    return clients;
  } catch (error) {
    logger.error('Get all clients error', { error: error.message });
    throw error;
  }
}

/**
 * Get client by ID
 */
async function getClientById(clientId) {
  try {
    const [clients] = await workDB.query(`
      SELECT cd.*,
             (SELECT COUNT(*) FROM projects WHERE client_id = cd.id) as project_count,
             (SELECT COUNT(*) FROM invoices WHERE client_id = cd.id) as invoice_count
      FROM client_details cd
      WHERE cd.id = ?
    `, [clientId]);

    if (clients.length === 0) {
      throw new Error('Client not found');
    }

    return clients[0];
  } catch (error) {
    logger.error('Get client by ID error', { clientId, error: error.message });
    throw error;
  }
}

/**
 * Get client projects
 */
async function getClientProjects(clientId) {
  try {
    const [projects] = await workDB.query(`
      SELECT * FROM projects WHERE client_id = ? AND deleted_at IS NULL
      ORDER BY created_at DESC
    `, [clientId]);

    return projects;
  } catch (error) {
    logger.error('Get client projects error', { clientId, error: error.message });
    throw error;
  }
}

/**
 * Get client invoices
 */
async function getClientInvoices(clientId) {
  try {
    const [invoices] = await workDB.query(`
      SELECT i.*,
             (SELECT SUM(amount) FROM invoice_items WHERE invoice_id = i.id) as total_amount
      FROM invoices i
      WHERE i.client_id = ?
      ORDER BY i.invoice_date DESC
    `, [clientId]);

    return invoices;
  } catch (error) {
    logger.error('Get client invoices error', { clientId, error: error.message });
    throw error;
  }
}

/**
 * Get client contacts
 */
async function getClientContacts(clientId) {
  try {
    const [contacts] = await workDB.query(`
      SELECT * FROM client_contacts WHERE client_id = ?
      ORDER BY created_at DESC
    `, [clientId]);

    return contacts;
  } catch (error) {
    logger.error('Get client contacts error', { clientId, error: error.message });
    throw error;
  }
}

/**
 * Get client documents
 */
async function getClientDocuments(clientId) {
  try {
    const [documents] = await workDB.query(`
      SELECT * FROM client_docs WHERE client_id = ?
      ORDER BY created_at DESC
    `, [clientId]);

    return documents;
  } catch (error) {
    logger.error('Get client documents error', { clientId, error: error.message });
    throw error;
  }
}

/**
 * Create client
 */
async function createClient(clientData) {
  try {
    const [result] = await workDB.query(`
      INSERT INTO client_details (
        company_id, company_name, company_phone, company_email,
        address, website, note, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      clientData.company_id,
      clientData.company_name,
      clientData.company_phone || null,
      clientData.company_email || null,
      clientData.address || null,
      clientData.website || null,
      clientData.note || null
    ]);

    logger.info('Client created', { clientId: result.insertId, name: clientData.company_name });
    return { id: result.insertId, ...clientData };
  } catch (error) {
    logger.error('Create client error', { error: error.message });
    throw error;
  }
}

/**
 * Update client
 */
async function updateClient(clientId, clientData) {
  try {
    const updates = [];
    const params = [];

    Object.keys(clientData).forEach(key => {
      if (clientData[key] !== undefined) {
        updates.push(`${key} = ?`);
        params.push(clientData[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    updates.push('updated_at = NOW()');
    params.push(clientId);

    await workDB.query(`
      UPDATE client_details SET ${updates.join(', ')} WHERE id = ?
    `, params);

    logger.info('Client updated', { clientId });
    return { id: clientId, ...clientData };
  } catch (error) {
    logger.error('Update client error', { clientId, error: error.message });
    throw error;
  }
}

/**
 * Delete client
 */
async function deleteClient(clientId) {
  try {
    await workDB.query('DELETE FROM client_details WHERE id = ?', [clientId]);
    logger.info('Client deleted', { clientId });
    return { id: clientId, deleted: true };
  } catch (error) {
    logger.error('Delete client error', { clientId, error: error.message });
    throw error;
  }
}

// ============================================
// TEAMS
// ============================================

/**
 * Get all teams
 */
async function getAllTeams() {
  try {
    const [teams] = await workDB.query(`
      SELECT t.*,
             (SELECT COUNT(*) FROM employee_teams WHERE team_id = t.id) as member_count
      FROM teams t
      ORDER BY t.created_at DESC
    `);

    return teams;
  } catch (error) {
    logger.error('Get all teams error', { error: error.message });
    throw error;
  }
}

/**
 * Get team by ID
 */
async function getTeamById(teamId) {
  try {
    const [teams] = await workDB.query(`
      SELECT t.*,
             (SELECT COUNT(*) FROM employee_teams WHERE team_id = t.id) as member_count
      FROM teams t
      WHERE t.id = ?
    `, [teamId]);

    if (teams.length === 0) {
      throw new Error('Team not found');
    }

    return teams[0];
  } catch (error) {
    logger.error('Get team by ID error', { teamId, error: error.message });
    throw error;
  }
}

/**
 * Get team members
 */
async function getTeamMembers(teamId) {
  try {
    const [members] = await workDB.query(`
      SELECT et.*, u.name, u.email, u.image, u.mobile,
             ed.hourly_rate, ed.designation_id
      FROM employee_teams et
      INNER JOIN users u ON et.user_id = u.id
      LEFT JOIN employee_details ed ON u.id = ed.user_id
      WHERE et.team_id = ?
      ORDER BY et.created_at ASC
    `, [teamId]);

    return members;
  } catch (error) {
    logger.error('Get team members error', { teamId, error: error.message });
    throw error;
  }
}

/**
 * Get team projects
 */
async function getTeamProjects(teamId) {
  try {
    // Get team members
    const [members] = await workDB.query(`
      SELECT user_id FROM employee_teams WHERE team_id = ?
    `, [teamId]);

    if (members.length === 0) {
      return [];
    }

    const userIds = members.map(m => m.user_id);

    // Get projects where any team member is assigned
    const [projects] = await workDB.query(`
      SELECT DISTINCT p.*
      FROM projects p
      INNER JOIN project_members pm ON p.id = pm.project_id
      WHERE pm.user_id IN (?) AND p.deleted_at IS NULL
      ORDER BY p.created_at DESC
    `, [userIds]);

    return projects;
  } catch (error) {
    logger.error('Get team projects error', { teamId, error: error.message });
    throw error;
  }
}

/**
 * Create team
 */
async function createTeam(teamData) {
  try {
    const [result] = await workDB.query(`
      INSERT INTO teams (
        company_id, team_name, created_at, updated_at
      ) VALUES (?, ?, NOW(), NOW())
    `, [
      teamData.company_id,
      teamData.team_name
    ]);

    logger.info('Team created', { teamId: result.insertId, name: teamData.team_name });
    return { id: result.insertId, ...teamData };
  } catch (error) {
    logger.error('Create team error', { error: error.message });
    throw error;
  }
}

/**
 * Update team
 */
async function updateTeam(teamId, teamData) {
  try {
    await workDB.query(`
      UPDATE teams SET team_name = ?, updated_at = NOW() WHERE id = ?
    `, [teamData.team_name, teamId]);

    logger.info('Team updated', { teamId });
    return { id: teamId, ...teamData };
  } catch (error) {
    logger.error('Update team error', { teamId, error: error.message });
    throw error;
  }
}

/**
 * Delete team
 */
async function deleteTeam(teamId) {
  try {
    await workDB.query('DELETE FROM teams WHERE id = ?', [teamId]);
    logger.info('Team deleted', { teamId });
    return { id: teamId, deleted: true };
  } catch (error) {
    logger.error('Delete team error', { teamId, error: error.message });
    throw error;
  }
}

// ============================================
// EARNINGS & REPORTS
// ============================================

/**
 * Get project earnings
 */
async function getProjectEarnings(projectId) {
  try {
    const [earnings] = await workDB.query(`
      SELECT
        p.project_name,
        p.project_budget,
        COUNT(DISTINCT ptl.id) as total_logs,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 as total_hours,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 * AVG(ed.hourly_rate) as total_cost,
        (SELECT SUM(total) FROM invoices WHERE project_id = p.id) as invoiced_amount,
        (SELECT SUM(amount) FROM payments WHERE invoice_id IN
          (SELECT id FROM invoices WHERE project_id = p.id)) as paid_amount
      FROM projects p
      LEFT JOIN project_time_logs ptl ON p.id = ptl.project_id AND ptl.end_time IS NOT NULL
      LEFT JOIN employee_details ed ON ptl.user_id = ed.user_id
      WHERE p.id = ?
      GROUP BY p.id
    `, [projectId]);

    return earnings[0] || {};
  } catch (error) {
    logger.error('Get project earnings error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get timesheet report
 */
async function getTimesheetReport(filters = {}) {
  try {
    let query = `
      SELECT
        u.name as user_name,
        p.project_name,
        DATE(ptl.start_time) as date,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 as hours_worked,
        AVG(ed.hourly_rate) as hourly_rate,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 * AVG(ed.hourly_rate) as earnings
      FROM project_time_logs ptl
      INNER JOIN users u ON ptl.user_id = u.id
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN employee_details ed ON u.id = ed.user_id
      WHERE ptl.end_time IS NOT NULL
    `;

    const params = [];

    if (filters.user_id) {
      query += ' AND ptl.user_id = ?';
      params.push(filters.user_id);
    }

    if (filters.project_id) {
      query += ' AND ptl.project_id = ?';
      params.push(filters.project_id);
    }

    if (filters.start_date) {
      query += ' AND ptl.start_time >= ?';
      params.push(filters.start_date);
    }

    if (filters.end_date) {
      query += ' AND ptl.end_time <= ?';
      params.push(filters.end_date);
    }

    query += ' GROUP BY u.id, p.id, DATE(ptl.start_time) ORDER BY date DESC';

    const [report] = await workDB.query(query, params);
    return report;
  } catch (error) {
    logger.error('Get timesheet report error', { error: error.message });
    throw error;
  }
}

/**
 * Get project profitability report
 */
async function getProjectProfitabilityReport() {
  try {
    const [report] = await workDB.query(`
      SELECT
        p.id,
        p.project_name,
        p.project_budget,
        p.status,
        (SELECT SUM(TIMESTAMPDIFF(SECOND, start_time, end_time)) / 3600
         FROM project_time_logs WHERE project_id = p.id AND end_time IS NOT NULL) as total_hours,
        (SELECT SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 * AVG(ed.hourly_rate)
         FROM project_time_logs ptl
         INNER JOIN employee_details ed ON ptl.user_id = ed.user_id
         WHERE ptl.project_id = p.id AND ptl.end_time IS NOT NULL) as total_cost,
        (SELECT SUM(total) FROM invoices WHERE project_id = p.id) as total_invoiced,
        (SELECT SUM(amount) FROM payments WHERE invoice_id IN
          (SELECT id FROM invoices WHERE project_id = p.id)) as total_paid
      FROM projects p
      WHERE p.deleted_at IS NULL
      ORDER BY p.created_at DESC
    `);

    // Calculate profitability
    const profitability = report.map(proj => ({
      ...proj,
      profit_margin: proj.total_paid ?
        ((proj.total_paid - proj.total_cost) / proj.total_paid * 100).toFixed(2) : 0,
      profit_amount: (proj.total_paid || 0) - (proj.total_cost || 0)
    }));

    return profitability;
  } catch (error) {
    logger.error('Get project profitability report error', { error: error.message });
    throw error;
  }
}

/**
 * Get user productivity stats
 */
async function getUserProductivityStats(filters = {}) {
  try {
    let query = `
      SELECT
        u.id,
        u.name,
        u.email,
        ed.hourly_rate,
        COUNT(DISTINCT ptl.project_id) as projects_worked,
        COUNT(DISTINCT ptl.task_id) as tasks_completed,
        COUNT(ptl.id) as total_logs,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 as total_hours,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 * AVG(ed.hourly_rate) as total_earnings,
        AVG(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 as avg_hours_per_log
      FROM users u
      LEFT JOIN employee_details ed ON u.id = ed.user_id
      LEFT JOIN project_time_logs ptl ON u.id = ptl.user_id AND ptl.end_time IS NOT NULL
      WHERE u.status = 'active'
    `;

    const params = [];

    if (filters.user_id) {
      query += ' AND u.id = ?';
      params.push(filters.user_id);
    }

    if (filters.start_date) {
      query += ' AND ptl.start_time >= ?';
      params.push(filters.start_date);
    }

    if (filters.end_date) {
      query += ' AND ptl.end_time <= ?';
      params.push(filters.end_date);
    }

    query += ' GROUP BY u.id ORDER BY total_hours DESC';

    const [stats] = await workDB.query(query, params);
    return stats;
  } catch (error) {
    logger.error('Get user productivity stats error', { error: error.message });
    throw error;
  }
}

module.exports = {
  // Invoices
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  generateInvoiceFromTimeLogs,
  updateInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  // Clients
  getAllClients,
  getClientById,
  getClientProjects,
  getClientInvoices,
  getClientContacts,
  getClientDocuments,
  createClient,
  updateClient,
  deleteClient,
  // Teams
  getAllTeams,
  getTeamById,
  getTeamMembers,
  getTeamProjects,
  createTeam,
  updateTeam,
  deleteTeam,
  // Reports
  getProjectEarnings,
  getTimesheetReport,
  getProjectProfitabilityReport,
  getUserProductivityStats
};
