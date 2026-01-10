// ==========================================
// Preloader
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// ==========================================
// Mobile Navigation Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Prevent body scroll when mobile menu is open
    function lockBodyScroll(lock) {
        if (lock) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            lockBodyScroll(navMenu.classList.contains('active'));
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                lockBodyScroll(false);
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                lockBodyScroll(false);
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                lockBodyScroll(false);
            }
        });
    } else {
        console.error('Hamburger or navMenu not found');
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                lockBodyScroll(false);
            }
        }, 250);
    });
});

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
const navbar = document.querySelector('.navbar');

// Enhanced smooth scroll with mobile support
function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight - offset;
    
    // Use native smooth scroll with fallback
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        // Fallback for older browsers
        window.scrollTo(0, targetPosition);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        smoothScrollTo(targetId);
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// Navbar Enhanced Effects on Scroll
// ==========================================
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.scrollY;

    // Add scrolled class and glassmorphism effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide navbar on scroll down, show on scroll up (only on desktop)
    if (window.innerWidth > 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        // Always show navbar on mobile
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbar();
        });
        ticking = true;
    }
});

// Initial call
updateNavbar();

// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation with smoother timing
            setTimeout(() => {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);

            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements with enhanced selectors
const animatedElements = document.querySelectorAll(`
    .feature-card,
    .stat-item,
    .ps-card,
    .vi-item,
    .step-item,
    .team-card,
    .spec-item,
    .sf-item
`);

animatedElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(element);
});

// ==========================================
// Section Headers Professional Animation
// ==========================================
const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    headerObserver.observe(header);
});

// ==========================================
// Contact Form Enhanced Validation
// ==========================================
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');

    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        // Enhanced validation
        let isValid = true;
        let errorMessage = '';

        if (!name || name.length < 2) {
            isValid = false;
            errorMessage = 'Please enter a valid name (minimum 2 characters).';
        } else if (!email || !validateEmail(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (!message || message.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a message (minimum 10 characters).';
        }

        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }

        // Show success animation
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();

        // Add confetti effect
        createConfetti();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✗'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88, #00d4ff)' : 'linear-gradient(135deg, #ff3366, #ff6b35)'};
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        font-size: 1rem;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// ==========================================
// Confetti Effect
// ==========================================
function createConfetti() {
    const colors = ['#00d4ff', '#a855f7', '#ff0080', '#00ff88', '#ffd700'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 9999;
                border-radius: 50%;
                animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
            `;

            document.body.appendChild(confetti);

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = 200 + Math.random() * 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            confetti.style.setProperty('--tx', `${tx}px`);
            confetti.style.setProperty('--ty', `${ty}px`);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translate(var(--tx), var(--ty)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ==========================================
// Active Navigation Link Highlighting
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Animated Counter for Stats
// ==========================================
const animateCounter = (element, target, suffix = '', duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');

            // Animate the large stat in about section
            const statLarge = entry.target.querySelector('.stat-large');
            if (statLarge) {
                const targetValue = parseInt(statLarge.textContent);
                statLarge.textContent = '0';
                animateCounter(statLarge, targetValue, '%');
            }

            // Animate hero stats
            const heroStats = entry.target.querySelectorAll('.stat h3');
            heroStats.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('-')) {
                    // Handle range (e.g., "0.5-16")
                    return;
                }
                const value = parseFloat(text);
                if (!isNaN(value)) {
                    stat.textContent = '0';
                    animateCounter(stat, value, text.includes('%') ? '%' : '');
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe stats sections
const aboutProblem = document.querySelector('.about-card.problem');
if (aboutProblem) {
    statsObserver.observe(aboutProblem);
}

const heroStatsSection = document.querySelector('.hero-stats');
if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
}

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
const heroSection = document.querySelector('.hero');
const videoContainer = document.querySelector('.video-container');

if (heroSection && videoContainer) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.3;
            videoContainer.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(${1 + scrolled * 0.0001})`;
        }
    });
}

// ==========================================
// Button Click Handlers with Animation
// ==========================================
const heroButtons = document.querySelectorAll('.hero-buttons .btn');

heroButtons.forEach(button => {
    // Add ripple effect
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();

        // Create ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Scroll to section
        if (buttonText === 'Get Started') {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        } else if (buttonText === 'Safety Warnings') {
            document.querySelector('#safety').scrollIntoView({ behavior: 'smooth' });
        } else if (buttonText === 'Technical Specs') {
            document.querySelector('#technology').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==========================================
// Card Tilt Effect on Mouse Move
// ==========================================
const cards = document.querySelectorAll('.feature-card, .about-card, .team-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ==========================================
// Video Auto-Play on Viewport
// ==========================================
const videos = document.querySelectorAll('video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    videoObserver.observe(video);
});

// ==========================================
// Loading Animation
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Create page load animation
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;

    const loaderText = document.createElement('h1');
    loaderText.textContent = 'MiahSphere';
    loaderText.style.cssText = `
        font-size: 4rem;
        font-weight: 900;
        background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: pulse 1.5s ease infinite;
    `;

    loader.appendChild(loaderText);
    document.body.insertBefore(loader, document.body.firstChild);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});

// ==========================================
// Cursor Trail Effect (Desktop Only)
// ==========================================
if (window.innerWidth > 768) {
    const cursorTrail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: radial-gradient(circle, rgba(0, 212, 255, ${0.8 - i * 0.08}), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        cursorTrail.push(dot);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrail() {
        cursorTrail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = `${mouseX - dot.offsetWidth / 2}px`;
                dot.style.top = `${mouseY - dot.offsetHeight / 2}px`;
            }, index * 20);
        });

        requestAnimationFrame(updateTrail);
    }

    updateTrail();
}

// ==========================================
// Modern Scroll Progress Bar
// ==========================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #0066FF 0%, #00A8FF 50%, #6366F1 100%);
    z-index: 10001;
    transform-origin: left;
    transition: transform 0.1s ease;
    box-shadow: 0 2px 10px rgba(0, 102, 255, 0.4);
`;
document.body.appendChild(progressBar);

let progressTicking = false;

window.addEventListener('scroll', () => {
    if (!progressTicking) {
        window.requestAnimationFrame(() => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.transform = `scaleX(${scrolled / 100})`;
            progressTicking = false;
        });
        progressTicking = true;
    }
});

// ==========================================
// Enhanced Section Transitions
// ==========================================
const allSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

allSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// ==========================================
// Professional Console Branding
// ==========================================
console.log('%c MiahSphere ', 'background: linear-gradient(135deg, #0066FF, #6366F1); color: white; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 10px;');
console.log('%c Advanced AI-Powered Water Leak Detection ', 'color: #0066FF; font-size: 16px; font-weight: bold;');
console.log('%c Website loaded successfully ✓ ', 'color: #00D68F; font-size: 14px;');
console.log('%c Built with precision for Jordan\'s water infrastructure ', 'color: #6366F1; font-size: 12px;');

// ==========================================
// Professional Performance Monitoring
// ==========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log(`%c Performance Metrics `, 'background: #0066FF; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;');
            console.log(`%c DOM Ready: ${domReadyTime}ms | Full Load: ${pageLoadTime}ms `, 'color: #00D68F; padding: 5px; font-size: 12px;');
            
            if (pageLoadTime < 3000) {
                console.log('%c ⚡ Excellent performance! ', 'color: #00D68F; font-weight: bold;');
            }
        }, 100);
    });
}

// ==========================================
// Add Parallax Effect to Hero Video
// ==========================================
const heroVideo = document.querySelector('.hero-bg-video');
if (heroVideo) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallax = scrolled * 0.5;
        heroVideo.style.transform = `translateY(${parallax}px) scale(1.1)`;
    });
}

// ==========================================
// Enhanced Button Ripple Effect
// ==========================================
const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-nav');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
