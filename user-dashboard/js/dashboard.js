// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Check window width on load to set initial state
    if (window.innerWidth < 992) {
        sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('expanded');
    });
    
    // Close expanded sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 992 && 
            !sidebar.contains(event.target) && 
            !sidebarToggle.contains(event.target) && 
            sidebar.classList.contains('expanded')) {
            sidebar.classList.remove('expanded');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('expanded');
        } else {
            sidebar.classList.add('collapsed');
        }
    });
    
    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Update header title based on the clicked item
            const sectionTitle = this.querySelector('span').textContent;
            document.querySelector('.content-header h1').textContent = sectionTitle;
            
            // If mobile view, close sidebar
            if (window.innerWidth < 992) {
                sidebar.classList.remove('expanded');
            }
            
            // Handle navigation based on href
            const targetHref = this.getAttribute('href');
            
            if (targetHref === '#settings') {
                e.preventDefault();
                showSettingsSection();
            } else if (targetHref === '#dashboard') {
                e.preventDefault();
                showDashboardSections();
            }
        });
    });
    
    // Function to show settings section and hide other sections
    function showSettingsSection() {
        // Show stats cards which are always visible
        document.querySelector('.stats-cards').style.display = 'grid';
        
        // Hide all main content sections except stats-cards and settings-section
        const contentSections = document.querySelectorAll('.dashboard-content > section:not(.stats-cards):not(#settings-section)');
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show settings section
        const settingsSection = document.getElementById('settings-section');
        if (settingsSection) {
            settingsSection.style.display = 'block';
            
            // Scroll to settings section
            settingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Function to show dashboard sections and hide settings
    function showDashboardSections() {
        // Show all main content sections except settings
        const contentSections = document.querySelectorAll('.dashboard-content > section:not(#settings-section)');
        contentSections.forEach(section => {
            if (section.classList.contains('stats-cards')) {
                section.style.display = 'grid';
            } else if (section.classList.contains('service-cards')) {
                section.style.display = 'block';
            } else {
                section.style.display = 'block';
            }
        });
        
        // Hide settings section
        const settingsSection = document.getElementById('settings-section');
        if (settingsSection) {
            settingsSection.style.display = 'none';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Settings action buttons
    const settingsButtons = document.querySelectorAll('.settings-action .btn');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const settingType = this.getAttribute('href').split('/')[1];
            showNotification(`${settingType.replace('-', ' ')} settings opened`, 'info');
        });
    });
    
    // Skill tag click handler
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.backgroundColor = '#d1fae5';
            this.style.borderColor = '#10b981';
            this.querySelector('i').className = 'fas fa-check';
            this.querySelector('i').style.color = '#10b981';
            
            // Show notification
            showNotification('Skill added to your profile', 'success');
        });
    });
    
    // Show notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            padding: 12px 18px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            transform: translateY(100px);
            transition: transform 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'info' ? '#3a86ff' : '#f59e0b'};
            max-width: 300px;
        `;
        
        notification.querySelector('i').style.color = type === 'success' ? '#10b981' : type === 'info' ? '#3a86ff' : '#f59e0b';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    // Check if settings is in URL hash on page load
    if (window.location.hash === '#settings') {
        // Find the settings nav item and trigger a click
        const settingsNavItem = document.querySelector('.nav-item a[href="#settings"]');
        if (settingsNavItem) {
            settingsNavItem.click();
        }
    }
    
    // Initialize any other components or functionality
    initializeCharts();
});

// Placeholder for chart initialization
function initializeCharts() {
    // This would be where you initialize any charts or data visualizations
    // Example with a mock function, would need a charting library like Chart.js
    console.log('Charts initialized');
}