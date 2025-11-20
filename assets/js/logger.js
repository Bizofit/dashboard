/**
 * Frontend Logger Utility
 * Tracks page visits, user actions, and errors
 * Sends logs to backend API and console
 */

class FrontendLogger {
  constructor() {
    this.apiEndpoint = 'http://localhost:3000/api/logs';
    this.sessionId = this.generateSessionId();
    this.logQueue = [];
    this.batchSize = 10;
    this.flushInterval = 5000; // 5 seconds
    
    // Start auto-flush
    setInterval(() => this.flush(), this.flushInterval);
    
    // Log session start
    this.logPageVisit();
    
    // Capture browser errors
    this.setupErrorHandlers();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  getCurrentUser() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return {
        userId: user.id || 'anonymous',
        email: user.email || 'N/A',
        userType: user.userType || 'unknown'
      };
    } catch (e) {
      return {
        userId: 'anonymous',
        email: 'N/A',
        userType: 'unknown'
      };
    }
  }

  getPageInfo() {
    return {
      url: window.location.href,
      pathname: window.location.pathname,
      page: this.getPageName(),
      title: document.title,
      referrer: document.referrer || 'direct'
    };
  }

  getPageName() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const filename = parts[parts.length - 1] || 'index.html';
    return filename.replace('.html', '');
  }

  createLogEntry(level, message, data = {}) {
    const user = this.getCurrentUser();
    const page = this.getPageInfo();
    
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      sessionId: this.sessionId,
      user,
      page,
      browser: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.screen.width}x${window.screen.height}`
      },
      ...data
    };
  }

  log(level, message, data = {}) {
    const logEntry = this.createLogEntry(level, message, data);
    
    // Console output with color
    const colors = {
      info: 'color: #2563eb',
      success: 'color: #10b981',
      warning: 'color: #f59e0b',
      error: 'color: #ef4444',
      action: 'color: #8b5cf6'
    };
    
    console.log(
      `%c[${level.toUpperCase()}] ${message}`,
      colors[level] || 'color: #000',
      data
    );
    
    // Add to queue
    this.logQueue.push(logEntry);
    
    // Flush if batch size reached
    if (this.logQueue.length >= this.batchSize) {
      this.flush();
    }
  }

  info(message, data) {
    this.log('info', message, data);
  }

  success(message, data) {
    this.log('success', message, data);
  }

  warning(message, data) {
    this.log('warning', message, data);
  }

  error(message, data) {
    this.log('error', message, data);
  }

  action(actionName, data) {
    this.log('action', `User action: ${actionName}`, {
      action: actionName,
      ...data
    });
  }

  logPageVisit() {
    this.info('Page visit', {
      visitTime: new Date().toISOString(),
      loadTime: performance.now()
    });
  }

  logNavigation(fromPage, toPage) {
    this.info('Navigation', {
      from: fromPage,
      to: toPage,
      timestamp: new Date().toISOString()
    });
  }

  logApiCall(method, url, status, duration) {
    this.info('API call', {
      method,
      url,
      status,
      duration: `${duration}ms`
    });
  }

  logFormSubmit(formName, data = {}) {
    this.action('Form submit', {
      formName,
      ...data
    });
  }

  logButtonClick(buttonName, data = {}) {
    this.action('Button click', {
      buttonName,
      ...data
    });
  }

  logModalOpen(modalName) {
    this.action('Modal open', { modalName });
  }

  logModalClose(modalName) {
    this.action('Modal close', { modalName });
  }

  logSearch(query, filters = {}) {
    this.action('Search', {
      query,
      filters
    });
  }

  logFilter(filterName, value) {
    this.action('Filter applied', {
      filterName,
      value
    });
  }

  setupErrorHandlers() {
    // Capture JavaScript errors
    window.addEventListener('error', (event) => {
      this.error('JavaScript error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
      });
    });
  }

  async flush() {
    if (this.logQueue.length === 0) return;

    const logsToSend = [...this.logQueue];
    this.logQueue = [];

    try {
      // Send to backend API
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ logs: logsToSend })
      });
    } catch (error) {
      // If sending fails, log to console only
      console.error('Failed to send logs to server:', error);
      
      // Re-add to queue to try again later (max 50 logs)
      this.logQueue = [...logsToSend.slice(-25), ...this.logQueue].slice(0, 50);
    }
  }

  // Manual flush for critical events
  async forceFlush() {
    await this.flush();
  }
}

// Create global logger instance
window.logger = new FrontendLogger();

// Log page unload
window.addEventListener('beforeunload', () => {
  logger.info('Page unload');
  logger.forceFlush();
});
