// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and tab contents
            navLinks.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
    
    // Animate stats on load
    animateStats();
    
    // Auto-refresh data simulation (every 5 seconds)
    setInterval(updateStats, 5000);
});

// Animate stat values on page load
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = !isNaN(parseFloat(finalValue.replace(/[^0-9.-]/g, '')));
        
        if (isNumber) {
            const numericValue = parseFloat(finalValue.replace(/[^0-9.-]/g, ''));
            const prefix = finalValue.match(/[$]/)?.[0] || '';
            const suffix = finalValue.match(/[%]/)?.[0] || '';
            
            animateValue(stat, 0, numericValue, 1000, prefix, suffix);
        }
    });
}

function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        const formattedValue = formatNumber(current);
        element.textContent = prefix + formattedValue + suffix;
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    return num.toFixed(1);
}

// Simulate real-time data updates
function updateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const statValue = card.querySelector('.stat-value');
        const statChange = card.querySelector('.stat-change');
        
        if (statValue && Math.random() > 0.7) { // 30% chance to update
            const currentValue = parseFloat(statValue.textContent.replace(/[^0-9.-]/g, ''));
            const changePercent = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
            const newValue = currentValue * (1 + changePercent / 100);
            
            const prefix = statValue.textContent.match(/[$]/)?.[0] || '';
            const suffix = statValue.textContent.match(/[%]/)?.[0] || '';
            
            statValue.textContent = prefix + formatNumber(newValue) + suffix;
            
            // Update change indicator
            if (statChange) {
                const currentChange = parseFloat(statChange.textContent.replace(/[^0-9.-]/g, ''));
                const newChange = currentChange + (Math.random() - 0.5) * 0.5;
                
                statChange.textContent = (newChange >= 0 ? '+' : '') + newChange.toFixed(1) + '%';
                statChange.className = 'stat-change ' + (newChange >= 0 ? 'positive' : 'negative');
            }
        }
    });
}

// Chart bar hover effects
document.addEventListener('DOMContentLoaded', function() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});

// Table row highlighting
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.style.background = '');
            this.style.background = '#f0f4ff';
        });
    });
});

// Settings button handler
document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('.btn-primary');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Show success message
            const originalText = this.textContent;
            this.textContent = '✓ Settings Saved!';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    }
});

// Add real-time clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    // You can add a clock element to the header if needed
    // For now, this is just a demonstration
}

setInterval(updateClock, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + 1-4 for quick tab navigation
    if (e.altKey) {
        const tabs = ['overview', 'analytics', 'reports', 'settings'];
        const num = parseInt(e.key);
        
        if (num >= 1 && num <= 4) {
            e.preventDefault();
            const navLink = document.querySelector(`[data-tab="${tabs[num - 1]}"]`);
            if (navLink) {
                navLink.click();
            }
        }
    }
});

// Console welcome message
console.log('%c🎉 Unified Dashboard Loaded Successfully!', 
    'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard shortcuts: Alt + 1-4 for quick tab navigation', 
    'color: #6c757d; font-size: 12px;');
