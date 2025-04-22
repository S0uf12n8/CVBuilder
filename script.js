document.addEventListener('DOMContentLoaded', function() {
    // Reset any transforms on page load to prevent zoom issues
    document.querySelectorAll('.zoom-section').forEach(section => {
        section.style.transform = 'scale(1)';
    });
    
    // Initialize variables to track scroll position
    let lastScrollTop = 0;
    const sections = document.querySelectorAll('.zoom-section');
    
    // Function to handle scroll events
    window.addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        // For each section, apply parallax effect
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate how far the section is through the viewport
                const sectionProgress = 1 - (rect.top / viewportHeight);
                
                // Apply subtle zoom effect based on scroll position
                // Scale between 0.95 and 1.05 for subtle effect
                const scale = 0.98 + (sectionProgress * 0.04);
                
                // Apply transform with a smooth transition
                section.style.transform = `scale(${scale})`;
            }
        });
        
        // Save current scroll position
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
    
    // Handle page refresh - scroll to top to avoid zoom issues
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
});