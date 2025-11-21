const { workDB } = require('../config/database');
const logger = require('../config/logger');

/**
 * Work.Bizoforce Service
 * Handles all business logic for Work platform APIs
 * - Users & Employees
 * - Projects
 * - Tasks
 * - Time Logs (Timesheets)
 * - Invoices
 * - Clients
 * - Teams
 * - Reports & Earnings
 */

// ============================================
// USERS & EMPLOYEES
// ============================================

/**
 * Get all users with optional filtering
 */
async function getAllUsers(filters = {}) {
  try {
    let query = `
      SELECT u.id, u.name, u.email, u.mobile, u.gender, u.status, u.login,
             u.created_at, u.last_login, u.company_id,
             ed.address, ed.hourly_rate, ed.slack_username, ed.department_id,
             ed.designation_id, ed.joining_date, ed.last_date
      FROM users u
      LEFT JOIN employee_details ed ON u.id = ed.user_id
      WHERE 1=1
    `;

    const params = [];

    if (filters.status) {
      query += ' AND u.status = ?';
      params.push(filters.status);
    }

    if (filters.company_id) {
      query += ' AND u.company_id = ?';
      params.push(filters.company_id);
    }

    if (filters.search) {
      query += ' AND (u.name LIKE ? OR u.email LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY u.created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));
    }

    const [users] = await workDB.query(query, params);
    return users;
  } catch (error) {
    logger.error('Get all users error', { error: error.message });
    throw error;
  }
}

/**
 * Get user by ID with full details
 */
async function getUserById(userId) {
  try {
    const [users] = await workDB.query(`
      SELECT u.*, ed.*
      FROM users u
      LEFT JOIN employee_details ed ON u.id = ed.user_id
      WHERE u.id = ?
    `, [userId]);

    if (users.length === 0) {
      throw new Error('User not found');
    }

    return users[0];
  } catch (error) {
    logger.error('Get user by ID error', { userId, error: error.message });
    throw error;
  }
}

/**
 * Get user's projects
 */
async function getUserProjects(userId) {
  try {
    const [projects] = await workDB.query(`
      SELECT DISTINCT p.*,
             c.name as client_name,
             (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) as task_count,
             (SELECT COUNT(*) FROM project_members WHERE project_id = p.id) as member_count
      FROM projects p
      LEFT JOIN client_details c ON p.client_id = c.id
      INNER JOIN project_members pm ON p.id = pm.project_id
      WHERE pm.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId]);

    return projects;
  } catch (error) {
    logger.error('Get user projects error', { userId, error: error.message });
    throw error;
  }
}

/**
 * Get user's tasks
 */
async function getUserTasks(userId) {
  try {
    const [tasks] = await workDB.query(`
      SELECT DISTINCT t.*, p.project_name,
             (SELECT COUNT(*) FROM task_comments WHERE task_id = t.id) as comment_count
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      INNER JOIN task_users tu ON t.id = tu.task_id
      WHERE tu.user_id = ?
      ORDER BY t.due_date ASC
    `, [userId]);

    return tasks;
  } catch (error) {
    logger.error('Get user tasks error', { userId, error: error.message });
    throw error;
  }
}

/**
 * Get user's time logs
 */
async function getUserTimeLogs(userId, filters = {}) {
  try {
    let query = `
      SELECT ptl.*, p.project_name, t.heading as task_name
      FROM project_time_logs ptl
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      WHERE ptl.user_id = ?
    `;

    const params = [userId];

    if (filters.start_date) {
      query += ' AND ptl.start_time >= ?';
      params.push(filters.start_date);
    }

    if (filters.end_date) {
      query += ' AND ptl.end_time <= ?';
      params.push(filters.end_date);
    }

    query += ' ORDER BY ptl.start_time DESC';

    const [timeLogs] = await workDB.query(query, params);
    return timeLogs;
  } catch (error) {
    logger.error('Get user time logs error', { userId, error: error.message });
    throw error;
  }
}

/**
 * Get user's earnings
 */
async function getUserEarnings(userId, filters = {}) {
  try {
    const [earnings] = await workDB.query(`
      SELECT
        COUNT(*) as total_logs,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 as total_hours,
        AVG(ed.hourly_rate) as hourly_rate,
        SUM(TIMESTAMPDIFF(SECOND, ptl.start_time, ptl.end_time)) / 3600 * AVG(ed.hourly_rate) as total_earnings
      FROM project_time_logs ptl
      INNER JOIN employee_details ed ON ptl.user_id = ed.user_id
      WHERE ptl.user_id = ?
        AND ptl.end_time IS NOT NULL
        ${filters.start_date ? 'AND ptl.start_time >= ?' : ''}
        ${filters.end_date ? 'AND ptl.end_time <= ?' : ''}
    `, [userId, filters.start_date, filters.end_date].filter(Boolean));

    return earnings[0] || { total_logs: 0, total_hours: 0, hourly_rate: 0, total_earnings: 0 };
  } catch (error) {
    logger.error('Get user earnings error', { userId, error: error.message });
    throw error;
  }
}

// ============================================
// PROJECTS
// ============================================

/**
 * Get all projects
 */
async function getAllProjects(filters = {}) {
  try {
    let query = `
      SELECT p.*,
             c.company_name as client_name,
             pc.category_name,
             (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) as task_count,
             (SELECT COUNT(*) FROM project_members WHERE project_id = p.id) as member_count,
             (SELECT SUM(TIMESTAMPDIFF(SECOND, start_time, end_time)) / 3600
              FROM project_time_logs WHERE project_id = p.id AND end_time IS NOT NULL) as total_hours
      FROM projects p
      LEFT JOIN client_details c ON p.client_id = c.id
      LEFT JOIN project_category pc ON p.category_id = pc.id
      WHERE p.deleted_at IS NULL
    `;

    const params = [];

    if (filters.status) {
      query += ' AND p.status = ?';
      params.push(filters.status);
    }

    if (filters.client_id) {
      query += ' AND p.client_id = ?';
      params.push(filters.client_id);
    }

    if (filters.search) {
      query += ' AND p.project_name LIKE ?';
      params.push(`%${filters.search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const [projects] = await workDB.query(query, params);
    return projects;
  } catch (error) {
    logger.error('Get all projects error', { error: error.message });
    throw error;
  }
}

/**
 * Get project by ID
 */
async function getProjectById(projectId) {
  try {
    const [projects] = await workDB.query(`
      SELECT p.*,
             c.company_name as client_name, c.email as client_email,
             pc.category_name,
             (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) as task_count,
             (SELECT COUNT(*) FROM project_members WHERE project_id = p.id) as member_count
      FROM projects p
      LEFT JOIN client_details c ON p.client_id = c.id
      LEFT JOIN project_category pc ON p.category_id = pc.id
      WHERE p.id = ? AND p.deleted_at IS NULL
    `, [projectId]);

    if (projects.length === 0) {
      throw new Error('Project not found');
    }

    return projects[0];
  } catch (error) {
    logger.error('Get project by ID error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project members
 */
async function getProjectMembers(projectId) {
  try {
    const [members] = await workDB.query(`
      SELECT pm.*, u.name, u.email, u.mobile, u.image,
             ed.hourly_rate, ed.designation_id
      FROM project_members pm
      INNER JOIN users u ON pm.user_id = u.id
      LEFT JOIN employee_details ed ON u.id = ed.user_id
      WHERE pm.project_id = ?
      ORDER BY pm.created_at ASC
    `, [projectId]);

    return members;
  } catch (error) {
    logger.error('Get project members error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project tasks
 */
async function getProjectTasks(projectId) {
  try {
    const [tasks] = await workDB.query(`
      SELECT t.*,
             (SELECT GROUP_CONCAT(u.name) FROM task_users tu
              INNER JOIN users u ON tu.user_id = u.id WHERE tu.task_id = t.id) as assigned_to,
             (SELECT COUNT(*) FROM task_comments WHERE task_id = t.id) as comment_count,
             (SELECT COUNT(*) FROM sub_tasks WHERE task_id = t.id) as subtask_count
      FROM tasks t
      WHERE t.project_id = ?
      ORDER BY t.start_date DESC
    `, [projectId]);

    return tasks;
  } catch (error) {
    logger.error('Get project tasks error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project time logs
 */
async function getProjectTimeLogs(projectId) {
  try {
    const [timeLogs] = await workDB.query(`
      SELECT ptl.*, u.name as user_name, t.heading as task_name
      FROM project_time_logs ptl
      INNER JOIN users u ON ptl.user_id = u.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      WHERE ptl.project_id = ?
      ORDER BY ptl.start_time DESC
    `, [projectId]);

    return timeLogs;
  } catch (error) {
    logger.error('Get project time logs error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project milestones
 */
async function getProjectMilestones(projectId) {
  try {
    const [milestones] = await workDB.query(`
      SELECT * FROM project_milestones
      WHERE project_id = ?
      ORDER BY milestone_date ASC
    `, [projectId]);

    return milestones;
  } catch (error) {
    logger.error('Get project milestones error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project files
 */
async function getProjectFiles(projectId) {
  try {
    const [files] = await workDB.query(`
      SELECT pf.*, u.name as uploaded_by_name
      FROM project_files pf
      INNER JOIN users u ON pf.user_id = u.id
      WHERE pf.project_id = ?
      ORDER BY pf.created_at DESC
    `, [projectId]);

    return files;
  } catch (error) {
    logger.error('Get project files error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project notes
 */
async function getProjectNotes(projectId) {
  try {
    const [notes] = await workDB.query(`
      SELECT pn.*, u.name as created_by_name
      FROM project_notes pn
      INNER JOIN users u ON pn.created_by = u.id
      WHERE pn.project_id = ?
      ORDER BY pn.created_at DESC
    `, [projectId]);

    return notes;
  } catch (error) {
    logger.error('Get project notes error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Get project activity
 */
async function getProjectActivity(projectId) {
  try {
    const [activity] = await workDB.query(`
      SELECT pa.*, u.name as user_name
      FROM project_activity pa
      INNER JOIN users u ON pa.user_id = u.id
      WHERE pa.project_id = ?
      ORDER BY pa.created_at DESC
      LIMIT 50
    `, [projectId]);

    return activity;
  } catch (error) {
    logger.error('Get project activity error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Create new project
 */
async function createProject(projectData) {
  try {
    const [result] = await workDB.query(`
      INSERT INTO projects (
        company_id, project_name, project_summary, start_date, deadline,
        category_id, client_id, project_budget, currency_id, status,
        completion_percent, manual_timelog, client_view_task,
        calculate_task_progress, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'enable', 'disable', 'true', NOW(), NOW())
    `, [
      projectData.company_id,
      projectData.project_name,
      projectData.project_summary || null,
      projectData.start_date,
      projectData.deadline || null,
      projectData.category_id || null,
      projectData.client_id || null,
      projectData.project_budget || null,
      projectData.currency_id || null,
      projectData.status || 'not started'
    ]);

    logger.info('Project created', { projectId: result.insertId, name: projectData.project_name });
    return { id: result.insertId, ...projectData };
  } catch (error) {
    logger.error('Create project error', { error: error.message });
    throw error;
  }
}

/**
 * Update project
 */
async function updateProject(projectId, projectData) {
  try {
    const updates = [];
    const params = [];

    Object.keys(projectData).forEach(key => {
      if (projectData[key] !== undefined) {
        updates.push(`${key} = ?`);
        params.push(projectData[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    updates.push('updated_at = NOW()');
    params.push(projectId);

    await workDB.query(`
      UPDATE projects SET ${updates.join(', ')} WHERE id = ?
    `, params);

    logger.info('Project updated', { projectId });
    return { id: projectId, ...projectData };
  } catch (error) {
    logger.error('Update project error', { projectId, error: error.message });
    throw error;
  }
}

/**
 * Delete project (soft delete)
 */
async function deleteProject(projectId) {
  try {
    await workDB.query(`
      UPDATE projects SET deleted_at = NOW() WHERE id = ?
    `, [projectId]);

    logger.info('Project deleted', { projectId });
    return { id: projectId, deleted: true };
  } catch (error) {
    logger.error('Delete project error', { projectId, error: error.message });
    throw error;
  }
}

// ============================================
// TASKS
// ============================================

/**
 * Get all tasks
 */
async function getAllTasks(filters = {}) {
  try {
    let query = `
      SELECT t.*, p.project_name,
             (SELECT GROUP_CONCAT(u.name) FROM task_users tu
              INNER JOIN users u ON tu.user_id = u.id WHERE tu.task_id = t.id) as assigned_to
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE 1=1
    `;

    const params = [];

    if (filters.project_id) {
      query += ' AND t.project_id = ?';
      params.push(filters.project_id);
    }

    if (filters.status) {
      query += ' AND t.board_column_id = ?';
      params.push(filters.status);
    }

    if (filters.user_id) {
      query += ' AND EXISTS (SELECT 1 FROM task_users WHERE task_id = t.id AND user_id = ?)';
      params.push(filters.user_id);
    }

    query += ' ORDER BY t.due_date ASC';

    const [tasks] = await workDB.query(query, params);
    return tasks;
  } catch (error) {
    logger.error('Get all tasks error', { error: error.message });
    throw error;
  }
}

/**
 * Get task by ID
 */
async function getTaskById(taskId) {
  try {
    const [tasks] = await workDB.query(`
      SELECT t.*, p.project_name,
             (SELECT GROUP_CONCAT(u.name) FROM task_users tu
              INNER JOIN users u ON tu.user_id = u.id WHERE tu.task_id = t.id) as assigned_to
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.id = ?
    `, [taskId]);

    if (tasks.length === 0) {
      throw new Error('Task not found');
    }

    return tasks[0];
  } catch (error) {
    logger.error('Get task by ID error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Get task comments
 */
async function getTaskComments(taskId) {
  try {
    const [comments] = await workDB.query(`
      SELECT tc.*, u.name as user_name, u.image as user_image
      FROM task_comments tc
      INNER JOIN users u ON tc.user_id = u.id
      WHERE tc.task_id = ?
      ORDER BY tc.created_at ASC
    `, [taskId]);

    return comments;
  } catch (error) {
    logger.error('Get task comments error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Get task subtasks
 */
async function getTaskSubtasks(taskId) {
  try {
    const [subtasks] = await workDB.query(`
      SELECT * FROM sub_tasks
      WHERE task_id = ?
      ORDER BY created_at ASC
    `, [taskId]);

    return subtasks;
  } catch (error) {
    logger.error('Get task subtasks error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Get task files
 */
async function getTaskFiles(taskId) {
  try {
    const [files] = await workDB.query(`
      SELECT tf.*, u.name as uploaded_by_name
      FROM task_files tf
      INNER JOIN users u ON tf.user_id = u.id
      WHERE tf.task_id = ?
      ORDER BY tf.created_at DESC
    `, [taskId]);

    return files;
  } catch (error) {
    logger.error('Get task files error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Get task history
 */
async function getTaskHistory(taskId) {
  try {
    const [history] = await workDB.query(`
      SELECT th.*, u.name as user_name
      FROM task_history th
      INNER JOIN users u ON th.user_id = u.id
      WHERE th.task_id = ?
      ORDER BY th.created_at DESC
    `, [taskId]);

    return history;
  } catch (error) {
    logger.error('Get task history error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Create new task
 */
async function createTask(taskData) {
  try {
    const [result] = await workDB.query(`
      INSERT INTO tasks (
        company_id, heading, description, start_date, due_date,
        project_id, task_category_id, priority, status,
        board_column_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      taskData.company_id,
      taskData.heading,
      taskData.description || null,
      taskData.start_date || null,
      taskData.due_date || null,
      taskData.project_id,
      taskData.task_category_id || null,
      taskData.priority || 'medium',
      taskData.status || 'incomplete',
      taskData.board_column_id || null
    ]);

    logger.info('Task created', { taskId: result.insertId, heading: taskData.heading });
    return { id: result.insertId, ...taskData };
  } catch (error) {
    logger.error('Create task error', { error: error.message });
    throw error;
  }
}

/**
 * Update task
 */
async function updateTask(taskId, taskData) {
  try {
    const updates = [];
    const params = [];

    Object.keys(taskData).forEach(key => {
      if (taskData[key] !== undefined) {
        updates.push(`${key} = ?`);
        params.push(taskData[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    updates.push('updated_at = NOW()');
    params.push(taskId);

    await workDB.query(`
      UPDATE tasks SET ${updates.join(', ')} WHERE id = ?
    `, params);

    logger.info('Task updated', { taskId });
    return { id: taskId, ...taskData };
  } catch (error) {
    logger.error('Update task error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Update task status
 */
async function updateTaskStatus(taskId, status) {
  try {
    await workDB.query(`
      UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?
    `, [status, taskId]);

    logger.info('Task status updated', { taskId, status });
    return { id: taskId, status };
  } catch (error) {
    logger.error('Update task status error', { taskId, error: error.message });
    throw error;
  }
}

/**
 * Delete task
 */
async function deleteTask(taskId) {
  try {
    await workDB.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    logger.info('Task deleted', { taskId });
    return { id: taskId, deleted: true };
  } catch (error) {
    logger.error('Delete task error', { taskId, error: error.message });
    throw error;
  }
}

// ============================================
// TIME LOGS (TIMESHEETS)
// ============================================

/**
 * Get all time logs
 */
async function getAllTimeLogs(filters = {}) {
  try {
    let query = `
      SELECT ptl.*, u.name as user_name, p.project_name, t.heading as task_name
      FROM project_time_logs ptl
      INNER JOIN users u ON ptl.user_id = u.id
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      WHERE 1=1
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

    if (filters.approved) {
      query += ' AND ptl.approved = ?';
      params.push(filters.approved);
    }

    if (filters.start_date) {
      query += ' AND ptl.start_time >= ?';
      params.push(filters.start_date);
    }

    if (filters.end_date) {
      query += ' AND ptl.end_time <= ?';
      params.push(filters.end_date);
    }

    query += ' ORDER BY ptl.start_time DESC';

    const [timeLogs] = await workDB.query(query, params);
    return timeLogs;
  } catch (error) {
    logger.error('Get all time logs error', { error: error.message });
    throw error;
  }
}

/**
 * Get time log by ID
 */
async function getTimeLogById(timeLogId) {
  try {
    const [timeLogs] = await workDB.query(`
      SELECT ptl.*, u.name as user_name, p.project_name, t.heading as task_name
      FROM project_time_logs ptl
      INNER JOIN users u ON ptl.user_id = u.id
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      WHERE ptl.id = ?
    `, [timeLogId]);

    if (timeLogs.length === 0) {
      throw new Error('Time log not found');
    }

    return timeLogs[0];
  } catch (error) {
    logger.error('Get time log by ID error', { timeLogId, error: error.message });
    throw error;
  }
}

/**
 * Get pending time logs for approval
 */
async function getPendingTimeLogs() {
  try {
    const [timeLogs] = await workDB.query(`
      SELECT ptl.*, u.name as user_name, p.project_name, t.heading as task_name
      FROM project_time_logs ptl
      INNER JOIN users u ON ptl.user_id = u.id
      LEFT JOIN projects p ON ptl.project_id = p.id
      LEFT JOIN tasks t ON ptl.task_id = t.id
      WHERE ptl.approved = 0 AND ptl.end_time IS NOT NULL
      ORDER BY ptl.created_at DESC
    `);

    return timeLogs;
  } catch (error) {
    logger.error('Get pending time logs error', { error: error.message });
    throw error;
  }
}

/**
 * Create time log (clock in)
 */
async function createTimeLog(timeLogData) {
  try {
    const [result] = await workDB.query(`
      INSERT INTO project_time_logs (
        company_id, project_id, task_id, user_id, start_time,
        memo, approved, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 0, NOW(), NOW())
    `, [
      timeLogData.company_id,
      timeLogData.project_id,
      timeLogData.task_id || null,
      timeLogData.user_id,
      timeLogData.start_time || new Date(),
      timeLogData.memo || null
    ]);

    logger.info('Time log created', { timeLogId: result.insertId });
    return { id: result.insertId, ...timeLogData };
  } catch (error) {
    logger.error('Create time log error', { error: error.message });
    throw error;
  }
}

/**
 * Update time log (clock out)
 */
async function updateTimeLog(timeLogId, timeLogData) {
  try {
    const updates = [];
    const params = [];

    Object.keys(timeLogData).forEach(key => {
      if (timeLogData[key] !== undefined) {
        updates.push(`${key} = ?`);
        params.push(timeLogData[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    updates.push('updated_at = NOW()');
    params.push(timeLogId);

    await workDB.query(`
      UPDATE project_time_logs SET ${updates.join(', ')} WHERE id = ?
    `, params);

    logger.info('Time log updated', { timeLogId });
    return { id: timeLogId, ...timeLogData };
  } catch (error) {
    logger.error('Update time log error', { timeLogId, error: error.message });
    throw error;
  }
}

/**
 * Approve time log
 */
async function approveTimeLog(timeLogId) {
  try {
    await workDB.query(`
      UPDATE project_time_logs SET approved = 1, updated_at = NOW() WHERE id = ?
    `, [timeLogId]);

    logger.info('Time log approved', { timeLogId });
    return { id: timeLogId, approved: true };
  } catch (error) {
    logger.error('Approve time log error', { timeLogId, error: error.message });
    throw error;
  }
}

/**
 * Reject time log
 */
async function rejectTimeLog(timeLogId) {
  try {
    await workDB.query(`
      UPDATE project_time_logs SET approved = 0, updated_at = NOW() WHERE id = ?
    `, [timeLogId]);

    logger.info('Time log rejected', { timeLogId });
    return { id: timeLogId, approved: false };
  } catch (error) {
    logger.error('Reject time log error', { timeLogId, error: error.message });
    throw error;
  }
}

/**
 * Delete time log
 */
async function deleteTimeLog(timeLogId) {
  try {
    await workDB.query('DELETE FROM project_time_logs WHERE id = ?', [timeLogId]);
    logger.info('Time log deleted', { timeLogId });
    return { id: timeLogId, deleted: true };
  } catch (error) {
    logger.error('Delete time log error', { timeLogId, error: error.message });
    throw error;
  }
}

// ============================================
// INVOICES
// ============================================

// Import invoice functions from part 2
const workServicePart2 = require('./work-service-part2');

module.exports = {
  // Users
  getAllUsers,
  getUserById,
  getUserProjects,
  getUserTasks,
  getUserTimeLogs,
  getUserEarnings,
  // Projects
  getAllProjects,
  getProjectById,
  getProjectMembers,
  getProjectTasks,
  getProjectTimeLogs,
  getProjectMilestones,
  getProjectFiles,
  getProjectNotes,
  getProjectActivity,
  createProject,
  updateProject,
  deleteProject,
  // Tasks
  getAllTasks,
  getTaskById,
  getTaskComments,
  getTaskSubtasks,
  getTaskFiles,
  getTaskHistory,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  // Time Logs
  getAllTimeLogs,
  getTimeLogById,
  getPendingTimeLogs,
  createTimeLog,
  updateTimeLog,
  approveTimeLog,
  rejectTimeLog,
  deleteTimeLog,
  // Invoices
  getAllInvoices: workServicePart2.getAllInvoices,
  getInvoiceById: workServicePart2.getInvoiceById,
  createInvoice: workServicePart2.createInvoice,
  generateInvoiceFromTimeLogs: workServicePart2.generateInvoiceFromTimeLogs,
  updateInvoice: workServicePart2.updateInvoice,
  updateInvoiceStatus: workServicePart2.updateInvoiceStatus,
  deleteInvoice: workServicePart2.deleteInvoice,
  // Clients
  getAllClients: workServicePart2.getAllClients,
  getClientById: workServicePart2.getClientById,
  getClientProjects: workServicePart2.getClientProjects,
  getClientInvoices: workServicePart2.getClientInvoices,
  getClientContacts: workServicePart2.getClientContacts,
  getClientDocuments: workServicePart2.getClientDocuments,
  createClient: workServicePart2.createClient,
  updateClient: workServicePart2.updateClient,
  deleteClient: workServicePart2.deleteClient,
  // Teams
  getAllTeams: workServicePart2.getAllTeams,
  getTeamById: workServicePart2.getTeamById,
  getTeamMembers: workServicePart2.getTeamMembers,
  getTeamProjects: workServicePart2.getTeamProjects,
  createTeam: workServicePart2.createTeam,
  updateTeam: workServicePart2.updateTeam,
  deleteTeam: workServicePart2.deleteTeam,
  // Reports
  getProjectEarnings: workServicePart2.getProjectEarnings,
  getTimesheetReport: workServicePart2.getTimesheetReport,
  getProjectProfitabilityReport: workServicePart2.getProjectProfitabilityReport,
  getUserProductivityStats: workServicePart2.getUserProductivityStats
};
