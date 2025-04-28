document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    
    document.querySelectorAll('.zoom-section').forEach(section => {
        section.style.transform = 'scale(1)';
    });

    initParallaxEffect();
    
    initMobileMenu();
    
    initSmoothScrolling();
    
    initFormHandler();
    
    initCVPreview();
    
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
});

function initScrollAnimations() {
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
    
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });
    
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
    
    document.querySelectorAll('.stagger-in').forEach(el => {
        staggerObserver.observe(el);
    });
}

function initParallaxEffect() {
    let lastScrollTop = 0;
    const sections = document.querySelectorAll('.zoom-section');

    window.addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.top < viewportHeight && rect.bottom > 0) {
                const sectionProgress = 1 - (rect.top / viewportHeight);

                const scale = 0.98 + (sectionProgress * 0.04);

                section.style.transform = `scale(${scale})`;
            }
        });

        updateActiveMenuItem();

        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
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

function initServicesAnimation() {
    const servicesContainer = document.querySelector('.services-container');
    if (!servicesContainer) return;
    
    servicesContainer.classList.add('stagger-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    observer.observe(servicesContainer);
}

document.addEventListener('DOMContentLoaded', function() {
    initServicesAnimation();
});

function initFeaturesAnimation() {
    const featuresContainer = document.querySelector('.features-container');
    if (!featuresContainer) return;
    
    featuresContainer.classList.add('stagger-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    observer.observe(featuresContainer);
}

document.addEventListener('DOMContentLoaded', function() {
    initFeaturesAnimation();
});

function initContactAnimation() {
    const contactContainer = document.querySelector('.contact-container');
    if (!contactContainer) return;
    
    contactContainer.classList.add('stagger-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    observer.observe(contactContainer);
}

document.addEventListener('DOMContentLoaded', function() {
    initContactAnimation();
});

function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
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

function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.footer-section.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formElements = contactForm.elements;
            const submitButton = contactForm.querySelector('.submit-button');
            
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                contactForm.reset();
                
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
                
                showNotification('Your message has been sent successfully!', 'success');
            }, 1500);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            newsletterForm.reset();
            showNotification('You\'ve been subscribed to our newsletter!', 'success');
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function initCVPreview() {
    const resumePreview = document.querySelector('.resume-preview');
    if (!resumePreview) return;
    
    resumePreview.addEventListener('touchstart', function() {
        this.style.transform = 'rotate(0deg)';
    });
    
    resumePreview.addEventListener('touchend', function() {
        this.style.transform = 'rotate(2deg)';
    });
    
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
    
    resumePreview.addEventListener('mouseenter', function() {
        floating = false;
        this.style.transform = 'rotate(0deg) translateY(0)';
    });
    
    resumePreview.addEventListener('mouseleave', function() {
        floating = true;
        floatAnimation();
    });
}

function initStatsCounter() {
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
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
    
    function animateStatBars() {
        document.querySelectorAll('.stat-bar-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    const statsSection = document.getElementById('stats');
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    window.addEventListener('scroll', function() {
        if (isInViewport(statsSection) && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                animateCounter(counter);
            });
            animateStatBars();
        }
    });
    
    if (isInViewport(statsSection) && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
            animateCounter(counter);
        });
        animateStatBars();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initStatsCounter();
});
