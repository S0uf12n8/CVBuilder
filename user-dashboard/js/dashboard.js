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
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
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
            border-left: 4px solid ${type === 'success' ? '#10b981' : '#3a86ff'};
            max-width: 300px;
        `;
        
        notification.querySelector('i').style.color = type === 'success' ? '#10b981' : '#3a86ff';
        
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
    
    // Initialize any other components or functionality
    initializeCharts();
});

// Placeholder for chart initialization
function initializeCharts() {
    // This would be where you initialize any charts or data visualizations
    // Example with a mock function, would need a charting library like Chart.js
    console.log('Charts initialized');
}