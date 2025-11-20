// Bizoforce Ecosystem - Unified Dashboard JavaScript
// Based on newdashboard patterns

// ============================================
// GLOBAL STATE
// ============================================

let currentRole = 'company-admin';
let currentUser = {
  name: 'Admin User',
  email: 'admin@bizoforce.com',
  avatar: 'AU'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Log app initialization
  if (window.logger) {
    logger.info('Dashboard initialized');
  }
  
  // Load saved role from localStorage
  const savedRole = localStorage.getItem('userRole');
  if (savedRole) {
    currentRole = savedRole;
    if (window.logger) {
      logger.info('User role loaded', { role: savedRole });
    }
  }
  
  generateNavigation();
  setActivePage();
  initializeModals();
  initializeTabs();
  initializeSectionSwitching();
  
  // Store current role globally
  window.currentRole = currentRole;
}

// ============================================
// NAVIGATION GENERATION
// ============================================

function generateNavigation() {
  const sidebar = document.querySelector('.sidebar-menu');
  if (!sidebar) return;
  
  // Check user type and role
  const userType = localStorage.getItem('userType') || 'company';
  const userRole = localStorage.getItem('userRole') || 'Company Admin';
  
  let navigationGroups;
  
  if (userType === 'individual') {
    // Individual user navigation
    navigationGroups = [
      {
        label: 'Personal',
        collapsed: false,
        items: [
          { id: 'profile', label: 'My Profile', icon: '👤', href: 'individual/profile.html' },
          { id: 'applications', label: 'My Applications', icon: '📄', href: 'individual/applications.html' }
        ]
      },
      {
        label: 'Work',
        collapsed: true,
        items: [
          { id: 'browse-jobs', label: 'Browse Jobs', icon: '🔍', href: 'individual/browse-jobs.html' },
          { id: 'my-projects', label: 'My Projects', icon: '💼', href: 'individual/my-projects.html' },
          { id: 'my-timesheets', label: 'My Timesheets', icon: '⏰', href: 'individual/my-timesheets.html' }
        ]
      },
      {
        label: 'Finance',
        collapsed: true,
        items: [
          { id: 'my-earnings', label: 'My Earnings', icon: '💰', href: 'individual/my-earnings.html' }
        ]
      },
      {
        label: 'System',
        collapsed: true,
        items: [
          { id: 'settings', label: 'Settings', icon: '⚙️', href: 'settings.html' }
        ]
      }
    ];
  } else if (userRole === 'HR') {
    // HR user navigation
    navigationGroups = [
      {
        label: 'Overview',
        collapsed: false,
        items: [
          { id: 'hr-dashboard', label: 'HR Dashboard', icon: '🏠', href: 'hr/hr-dashboard.html' }
        ]
      },
      {
        label: 'Recruitment',
        collapsed: true,
        items: [
          { id: 'hr-jobs', label: 'Job Postings', icon: '💼', href: 'hr/hr-jobs.html' },
          { id: 'hr-candidates', label: 'Candidates', icon: '👤', href: 'hr/hr-candidates.html' },
          { id: 'hr-screening', label: 'AI Screening', icon: '🤖', href: 'hr/hr-screening.html' },
          { id: 'hr-interviews', label: 'Interviews', icon: '🗓️', href: 'hr/hr-interviews.html' }
        ]
      },
      {
        label: 'Talent Management',
        collapsed: true,
        items: [
          { id: 'talent-pool', label: 'Talent Pool', icon: '👥', href: 'company-admin/talent-pool.html' },
          { id: 'onboarding', label: 'Onboarding', icon: '✓', href: 'hr/hr-onboarding.html' }
        ]
      },
      {
        label: 'Time & Attendance',
        collapsed: true,
        items: [
          { id: 'timesheets', label: 'Timesheets', icon: '⏰', href: 'company-admin/timesheets.html' }
        ]
      },
      {
        label: 'System',
        collapsed: true,
        items: [
          { id: 'settings', label: 'Settings', icon: '⚙️', href: 'settings.html' }
        ]
      }
    ];
  } else if (userRole === 'Team Lead') {
    // Team Lead navigation
    navigationGroups = [
      {
        label: 'Overview',
        collapsed: false,
        items: [
          { id: 'teamlead-dashboard', label: 'Dashboard', icon: '🏠', href: 'team-lead/teamlead-dashboard.html' },
          { id: 'team-profile', label: 'My Profile', icon: '👤', href: 'team-member/team-profile.html' }
        ]
      },
      {
        label: 'Project Management',
        collapsed: true,
        items: [
          { id: 'projects', label: 'My Projects', icon: '📁', href: 'company-admin/projects.html' },
          { id: 'team', label: 'Team Members', icon: '👥', href: 'team-lead/team-members.html' }
        ]
      },
      {
        label: 'Time & Approval',
        collapsed: true,
        items: [
          { id: 'timesheets', label: 'Timesheets', icon: '⏰', href: 'company-admin/timesheets.html' },
          { id: 'approvals', label: 'Pending Approvals', icon: '✓', href: 'team-lead/approvals.html' }
        ]
      },
      {
        label: 'Reports',
        collapsed: true,
        items: [
          { id: 'reports', label: 'Project Reports', icon: '📊', href: 'team-lead/reports.html' }
        ]
      },
      {
        label: 'System',
        collapsed: true,
        items: [
          { id: 'settings', label: 'Settings', icon: '⚙️', href: 'settings.html' }
        ]
      }
    ];
  } else if (userRole === 'Team Member') {
    // Team Member navigation
    navigationGroups = [
      {
        label: 'Overview',
        collapsed: false,
        items: [
          { id: 'teammember-dashboard', label: 'My Dashboard', icon: '🏠', href: 'team-member/teammember-dashboard.html' },
          { id: 'team-profile', label: 'My Profile', icon: '👤', href: 'team-member/team-profile.html' }
        ]
      },
      {
        label: 'Work',
        collapsed: true,
        items: [
          { id: 'my-projects', label: 'My Projects', icon: '📁', href: 'team-member/my-projects.html' },
          { id: 'my-tasks', label: 'My Tasks', icon: '✓', href: 'team-member/my-tasks.html' }
        ]
      },
      {
        label: 'Time Tracking',
        collapsed: true,
        items: [
          { id: 'timesheets', label: 'My Timesheets', icon: '⏰', href: 'company-admin/timesheets.html' }
        ]
      },
      {
        label: 'System',
        collapsed: true,
        items: [
          { id: 'settings', label: 'Settings', icon: '⚙️', href: 'settings.html' }
        ]
      }
    ];
  } else {
    // Company user navigation with grouped menu
    navigationGroups = [
      {
        label: 'Overview',
        collapsed: false,
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: 'company-admin/index.html' },
          { id: 'companies', label: 'Company Profile', icon: '🏢', href: 'company-admin/companies-list.html' },
          { id: 'business-insights', label: 'Business Insights', icon: '🎯', href: 'company-admin/business-insights.html' },
          { id: 'messages-orders', label: 'Messages & Orders', icon: '📬', href: 'company-admin/messages-orders.html' }
        ]
      },
      {
        label: 'Marketplace',
        collapsed: true,
        items: [
          { id: 'products', label: 'Products & Services', icon: '📦', href: 'company-admin/products-services.html' },
          { id: 'virtual-resources', label: 'Hire Virtual Resources', icon: '🌐', href: 'company-admin/virtual-resources.html' },
          { id: 'placements', label: 'My Placements', icon: '📊', href: 'company-admin/placements.html' }
        ]
      },
      {
        label: 'Hiring',
        collapsed: true,
        items: [
          { id: 'jobs', label: 'Job Postings', icon: '💼', href: 'company-admin/jobs.html' },
          { id: 'candidates', label: 'Candidates', icon: '👤', href: 'company-admin/candidates.html' },
          { id: 'screening', label: 'AI Screening', icon: '🤖', href: 'hr/hr-screening.html' },
          { id: 'interviews', label: 'Interviews', icon: '🗓️', href: 'hr/hr-interviews.html' },
          { id: 'talent-pool', label: 'Talent Pool', icon: '👥', href: 'company-admin/talent-pool.html' },
          { id: 'onboarding', label: 'Onboarding', icon: '✓', href: 'hr/hr-onboarding.html' }
        ]
      },
      {
        label: 'Projects & Time',
        collapsed: true,
        items: [
          { id: 'projects', label: 'Projects', icon: '📁', href: 'company-admin/projects.html' },
          { id: 'timesheets', label: 'Timesheets', icon: '⏰', href: 'company-admin/timesheets.html' }
        ]
      },
      {
        label: 'Finance',
        collapsed: true,
        items: [
          { id: 'invoices', label: 'Invoices', icon: '📄', href: 'company-admin/invoices.html' },
          { id: 'earnings', label: 'Earnings', icon: '💰', href: 'company-admin/earnings.html' }
        ]
      },
      {
        label: 'Administration',
        collapsed: true,
        items: [
          { id: 'users', label: 'Users & Roles', icon: '🔑', href: 'company-admin/users-roles.html' },
          { id: 'subscriptions', label: 'Subscriptions', icon: '📦', href: 'company-admin/subscriptions.html' },
          { id: 'settings', label: 'Settings', icon: '⚙️', href: 'company-admin/settings.html' }
        ]
      }
    ];
  }
  
  // Render grouped navigation with collapse functionality
  sidebar.innerHTML = navigationGroups.map((group, index) => {
    const isCollapsed = group.collapsed !== false;
    return `
    <div class="sidebar-menu-group ${isCollapsed ? 'collapsed' : ''}" data-group-index="${index}">
      <div class="sidebar-menu-group-label" onclick="toggleMenuGroup(${index})">
        <span>${group.label}</span>
        <span class="collapse-icon">${isCollapsed ? '▶' : '▼'}</span>
      </div>
      <div class="sidebar-menu-group-items">
        ${group.items.map(item => `
          <div class="sidebar-menu-item" data-nav-id="${item.id}" onclick="navigateTo('${item.href}')">
            <span class="menu-icon">${item.icon}</span>
            <span class="menu-label">${item.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `}).join('');
  
  // Auto-expand group containing current page
  autoExpandCurrentGroup();
}

function toggleMenuGroup(groupIndex) {
  const group = document.querySelector(`[data-group-index="${groupIndex}"]`);
  if (!group) return;
  
  const isCollapsed = group.classList.contains('collapsed');
  const collapseIcon = group.querySelector('.collapse-icon');
  
  if (isCollapsed) {
    group.classList.remove('collapsed');
    collapseIcon.textContent = '▼';
  } else {
    group.classList.add('collapsed');
    collapseIcon.textContent = '▶';
  }
}

function autoExpandCurrentGroup() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // Find the menu item for current page
  const activeItem = document.querySelector(`[data-nav-id]`);
  const allItems = document.querySelectorAll('.sidebar-menu-item');
  
  allItems.forEach(item => {
    const href = item.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    if (href && href === currentPage) {
      // Expand parent group
      const parentGroup = item.closest('.sidebar-menu-group');
      if (parentGroup && parentGroup.classList.contains('collapsed')) {
        const groupIndex = parentGroup.getAttribute('data-group-index');
        toggleMenuGroup(parseInt(groupIndex));
      }
      // Mark as active
      item.classList.add('active');
    }
  });
}

function navigateTo(href) {
  // Detect if we're in a subfolder and adjust path accordingly
  const currentPath = window.location.pathname;
  const inSubfolder = currentPath.includes('/team-member/') || 
                     currentPath.includes('/team-lead/') || 
                     currentPath.includes('/hr/') || 
                     currentPath.includes('/company-admin/') || 
                     currentPath.includes('/individual/');
  
  // If we're in a subfolder and href includes a folder path, convert to relative
  if (inSubfolder) {
    // Extract current folder
    let currentFolder = '';
    if (currentPath.includes('/team-member/')) currentFolder = 'team-member';
    else if (currentPath.includes('/team-lead/')) currentFolder = 'team-lead';
    else if (currentPath.includes('/hr/')) currentFolder = 'hr';
    else if (currentPath.includes('/company-admin/')) currentFolder = 'company-admin';
    else if (currentPath.includes('/individual/')) currentFolder = 'individual';
    
    // If href starts with the same folder, make it relative (just filename)
    if (href.startsWith(currentFolder + '/')) {
      href = href.substring(currentFolder.length + 1);
    }
    // If href points to different folder, go up one level first
    else if (href.includes('/')) {
      href = '../' + href;
    }
  }
  
  window.location.href = href;
}

function setActivePage() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    const navId = item.getAttribute('data-nav-id');
    const mapping = {
      'dashboard': 'index.html',
      'companies': ['companies.html', 'companies-list.html', 'company-detail.html'],
      'business-insights': 'companies-list.html',
      'messages-orders': 'companies-list.html',
      'products': 'products-services.html',
      'jobs': ['jobs.html', 'job-detail.html'],
      'candidates': ['candidates.html', 'candidate-detail.html'],
      'talent-pool': 'talent-pool.html',
      'projects': 'projects.html',
      'timesheets': 'timesheets.html',
      'invoices': 'invoices.html',
      'earnings': 'earnings.html',
      'subscriptions': 'subscriptions.html',
      'users': 'users-roles.html',
      'settings': 'settings.html',
      // Individual user pages
      'profile': 'profile.html',
      'applications': 'applications.html',
      'my-projects': 'my-projects.html',
      'my-timesheets': 'my-timesheets.html',
      'my-earnings': 'my-earnings.html'
    };
    
    // Check if current page matches nav item
    const navPages = Array.isArray(mapping[navId]) ? mapping[navId] : [mapping[navId]];
    if (navPages.includes(currentPage)) {
      item.classList.add('active');
    }
  });
}

// ============================================
// SECTION SWITCHING
// ============================================

function initializeSectionSwitching() {
  window.showSection = function(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('active');
    }
    
    // Update active menu item
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const activeMenuItem = document.querySelector(`[onclick*="${sectionId}"]`);
    if (activeMenuItem) {
      activeMenuItem.classList.add('active');
    }
  };
}

// ============================================
// MODAL MANAGEMENT
// ============================================

function initializeModals() {
  // Close modal when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });

  // Close modal buttons
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Make functions globally available
  window.openModal = openModal;
  window.closeModal = closeModal;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// TAB MANAGEMENT
// ============================================

function initializeTabs() {
  window.switchTab = function(tabGroup, tabName) {
    // Hide all tab contents in this group
    document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab-content`).forEach(content => {
      content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab-btn`).forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Show selected tab content
    const content = document.getElementById(`${tabName}-tab`);
    if (content) {
      content.classList.add('active');
    }
    
    // Activate selected tab button
    const btn = document.querySelector(`[data-tab-group="${tabGroup}"] [onclick*="${tabName}"]`);
    if (btn) {
      btn.classList.add('active');
    }
  };
}

// ============================================
// FORM HANDLING
// ============================================

function handleFormSubmit(formId, callback) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    if (callback) {
      callback(data);
    }
    
    showNotification('Saved successfully!', 'success');
    
    // Close modal if form is inside one
    const modal = form.closest('.modal');
    if (modal) {
      closeModal(modal.id);
    }
  });
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    padding: 16px 24px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10001;
    border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#2563eb'};
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

window.showNotification = showNotification;

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatDateTime(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function getStatusBadgeClass(status) {
  const statusMap = {
    'Active': 'badge-success',
    'Published': 'badge-success',
    'Approved': 'badge-success',
    'Paid': 'badge-success',
    'Completed': 'badge-success',
    'Hired': 'badge-success',
    'Available': 'badge-success',
    'Draft': 'badge-info',
    'Pending': 'badge-warning',
    'Sent': 'badge-warning',
    'Trial': 'badge-warning',
    'Interview': 'badge-purple',
    'In Progress': 'badge-info',
    'Planning': 'badge-info',
    'Closed': 'badge-danger',
    'Inactive': 'badge-danger',
    'Rejected': 'badge-danger',
    'Overdue': 'badge-danger'
  };
  return statusMap[status] || 'badge-info';
}

// ============================================
// TABLE UTILITIES
// ============================================

function filterTable(tableId, searchTerm) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = table.querySelectorAll('tbody tr');
  const term = searchTerm.toLowerCase();

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(term) ? '' : 'none';
  });
}

function sortTable(tableId, columnIndex, type = 'string') {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent.trim();
    const bValue = b.cells[columnIndex].textContent.trim();

    if (type === 'number') {
      return parseFloat(aValue) - parseFloat(bValue);
    } else if (type === 'date') {
      return new Date(aValue) - new Date(bValue);
    } else {
      return aValue.localeCompare(bValue);
    }
  });

  rows.forEach(row => tbody.appendChild(row));
}

// ============================================
// FILE UPLOAD HANDLERS
// ============================================

function setupFileUpload(uploadAreaId, inputId) {
  const uploadArea = document.getElementById(uploadAreaId);
  const fileInput = document.getElementById(inputId);
  
  if (!uploadArea || !fileInput) return;
  
  uploadArea.addEventListener('click', () => fileInput.click());
  
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      handleFileSelect(files[0], uploadAreaId);
    }
  });
  
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0], uploadAreaId);
    }
  });
}

function handleFileSelect(file, uploadAreaId) {
  const uploadArea = document.getElementById(uploadAreaId);
  if (uploadArea) {
    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2) + ' KB';
    uploadArea.innerHTML = `
      <div style="color: var(--success);">
        <div style="font-size: 32px; margin-bottom: 8px;">✓</div>
        <div style="font-weight: 600;">${fileName}</div>
        <div style="font-size: 12px; margin-top: 4px;">${fileSize}</div>
      </div>
    `;
  }
}

window.setupFileUpload = setupFileUpload;

// ============================================
// ANIMATION UTILITIES
// ============================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// EXPORT GLOBAL FUNCTIONS
// ============================================

window.dashboardApp = {
  openModal,
  closeModal,
  showNotification,
  filterTable,
  sortTable,
  formatCurrency,
  formatDate,
  formatDateTime,
  getStatusBadgeClass,
  setupFileUpload,
  currentRole
};
