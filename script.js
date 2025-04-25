document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animation observers
    initScrollAnimations();
    
    // Reset any transforms on page load to prevent zoom issues
    document.querySelectorAll('.zoom-section').forEach(section => {
        section.style.transform = 'scale(1)';
    });

    // Function to handle scroll events for parallax effect
    initParallaxEffect();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Form submission handler
    initFormHandler();
    
    // Initialize CV preview
    initCVPreview();
    
    // Handle page refresh - scroll to top to avoid zoom issues
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
});

// Initialize scroll animations
function initScrollAnimations() {
    // Add fade-in class to elements that should animate on scroll
    const elementsToAnimate = [
        '.feature-card', 
        '.service-box', 
        '.stat-item',
        '.about-card', 
        '.testimonial',
        '.contact-item',
        '.contact-form'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });
    
    // Add stagger-in class to container elements
    const staggerContainers = [
        '.features-grid',
        '.services-container',
        '.stats-container'
    ];
    
    staggerContainers.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('stagger-in');
        });
    });
    
    // Create intersection observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Create intersection observer for stagger-in containers
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe all stagger-in containers
    document.querySelectorAll('.stagger-in').forEach(el => {
        staggerObserver.observe(el);
    });
}

// Initialize parallax effect
function initParallaxEffect() {
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
                // Scale between 0.98 and 1.02 for subtle effect
                const scale = 0.98 + (sectionProgress * 0.04);

                // Apply transform with a smooth transition
                section.style.transform = `scale(${scale})`;
            }
        });

        // Update active menu item based on scroll position
        updateActiveMenuItem();

        // Save current scroll position
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}

// Initialize mobile menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active menu item based on scroll position
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for header
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize form handler
function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.footer-section.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formElements = contactForm.elements;
            const submitButton = contactForm.querySelector('.submit-button');
            
            // Store original button text
            const originalText = submitButton.textContent;
            
            // Update button to show progress
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success state
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
                
                // Show success message
                showNotification('Your message has been sent successfully!', 'success');
            }, 1500);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            newsletterForm.reset();
            showNotification('You\'ve been subscribed to our newsletter!', 'success');
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set message and icon
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: white;
        color: #333;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        transform: translateY(100px);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #38b000';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #e63946';
    } else {
        notification.style.borderLeft = '4px solid #3a86ff';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Initialize CV Preview
function initCVPreview() {
    const resumePreview = document.querySelector('.resume-preview');
    if (!resumePreview) return;
    
    // Add hover effect alternative for touch devices
    resumePreview.addEventListener('touchstart', function() {
        this.style.transform = 'rotate(0deg)';
    });
    
    resumePreview.addEventListener('touchend', function() {
        this.style.transform = 'rotate(2deg)';
    });
    
    // Add subtle floating animation
    let floating = true;
    let floatAngle = 0;
    
    function floatAnimation() {
        if (!floating) return;
        
        floatAngle += 0.02;
        const yOffset = Math.sin(floatAngle) * 5;
        
        resumePreview.style.transform = `rotate(2deg) translateY(${yOffset}px)`;
        
        requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
    
    // Pause animation on hover
    resumePreview.addEventListener('mouseenter', function() {
        floating = false;
        this.style.transform = 'rotate(0deg) translateY(0)';
    });
    
    resumePreview.addEventListener('mouseleave', function() {
        floating = true;
        floatAnimation();
    });
}

// Initialize Stats Counter Animation
function initStatsCounter() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate counter
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                if (element.querySelector('span')) {
                    element.innerHTML = target + '<span>%</span>';
                }
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
                if (element.querySelector('span')) {
                    element.innerHTML = Math.floor(current) + '<span>%</span>';
                }
            }
        }, 16);
    }
    
    // Animate stat bars
    function animateStatBars() {
        document.querySelectorAll('.stat-bar-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    // Initialize counters when stats section is visible
    const statsSection = document.getElementById('stats');
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    // Check on scroll if stats section is visible
    window.addEventListener('scroll', function() {
        if (isInViewport(statsSection) && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                animateCounter(counter);
            });
            animateStatBars();
        }
    });
    
    // Initial check in case stats are already visible on page load
    if (isInViewport(statsSection) && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
            animateCounter(counter);
        });
        animateStatBars();
    }
}

// Add this to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // Initialize stats counter
    initStatsCounter();
});