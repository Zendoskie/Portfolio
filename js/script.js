// ============================================
// MODERN VISIBLE CURSOR
// ============================================

const cursorAura = document.querySelector('.cursor-aura');
const cursorDot = document.body;
let mouseX = 0;
let mouseY = 0;
let auraX = 0;
let auraY = 0;
let trailX = 0;
let trailY = 0;

// Create cursor trail element
let cursorTrail = null;
if (window.innerWidth > 768) {
    cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
}

// Only enable cursor on desktop
if (window.innerWidth > 768) {
    // Initialize cursor position
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
    auraX = mouseX;
    auraY = mouseY;
    trailX = mouseX;
    trailY = mouseY;
    
    // Update cursor dot position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor dot via CSS custom properties
        document.documentElement.style.setProperty('--cursor-x', mouseX + 'px');
        document.documentElement.style.setProperty('--cursor-y', mouseY + 'px');
    });
    
    // Set initial position
    document.documentElement.style.setProperty('--cursor-x', mouseX + 'px');
    document.documentElement.style.setProperty('--cursor-y', mouseY + 'px');

    // Smooth minimalist cursor aura animation
    function animateAura() {
        auraX += (mouseX - auraX) * 0.2;
        auraY += (mouseY - auraY) * 0.2;
        
        if (cursorAura) {
            cursorAura.style.left = auraX + 'px';
            cursorAura.style.top = auraY + 'px';
        }
        
        // Minimal trail with delay
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        if (cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            cursorTrail.style.opacity = '0.2';
        }
        
        requestAnimationFrame(animateAura);
    }
    
    animateAura();
    
    // Make cursor reactive to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-icon, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorAura) {
                cursorAura.style.width = '40px';
                cursorAura.style.height = '40px';
                cursorAura.style.borderColor = 'rgba(34, 197, 94, 0.6)';
                cursorAura.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.4)';
                cursorAura.style.opacity = '0.8';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursorAura) {
                cursorAura.style.width = '30px';
                cursorAura.style.height = '30px';
                cursorAura.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                cursorAura.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.3)';
                cursorAura.style.opacity = '0.6';
            }
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursorAura) cursorAura.style.opacity = '0';
        if (cursorTrail) cursorTrail.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        if (cursorAura) cursorAura.style.opacity = '0.6';
    });
}

// ============================================
// CURSOR GLOW EFFECT ON BUTTONS
// ============================================

const cursorGlowButtons = document.querySelectorAll('.cursor-glow-btn');
const cursorReactiveCards = document.querySelectorAll('.cursor-reactive-card');

function setupCursorGlow(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const before = element.querySelector('::before') || element;
        element.style.setProperty('--mouse-x', x + 'px');
        element.style.setProperty('--mouse-y', y + 'px');
        
        // Update the ::before pseudo-element position via CSS custom properties
        const beforeElement = window.getComputedStyle(element, '::before');
        element.style.setProperty('--glow-x', x + 'px');
        element.style.setProperty('--glow-y', y + 'px');
    });
    
    // Create a glow element dynamically
    const glow = document.createElement('div');
    glow.className = 'button-glow';
    glow.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%);
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
        filter: blur(20px);
        z-index: 0;
    `;
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(glow);
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        glow.style.opacity = '1';
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    element.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
        glow.style.transform = 'translate(-50%, -50%) scale(0)';
    });
}

cursorGlowButtons.forEach(btn => setupCursorGlow(btn));

// Setup cursor reactive cards
cursorReactiveCards.forEach(card => {
    const glow = document.createElement('div');
    glow.className = 'card-glow';
    glow.style.cssText = `
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%);
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
        filter: blur(30px);
        z-index: 1;
    `;
    card.style.position = 'relative';
    card.appendChild(glow);
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        glow.style.opacity = '0.6';
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    card.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
        glow.style.transform = 'translate(-50%, -50%) scale(0)';
    });
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.getElementById('typingText');
const textToType = 'Computer Science Student | Frontend Developer | AI Enthusiast';
let charIndex = 0;
let isDeleting = false;

function typeText() {
    if (!typingText) return;
    
    if (!isDeleting && charIndex < textToType.length) {
        typingText.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 100);
    } else if (isDeleting && charIndex > 0) {
        typingText.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeText, 50);
    } else if (charIndex === textToType.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (charIndex === 0) {
        isDeleting = false;
        setTimeout(typeText, 500);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// ============================================
// NAVBAR SCROLL BEHAVIOR
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// FADE-IN ON SCROLL (Intersection Observer)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// PROGRESS BARS ANIMATION
// ============================================

const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================

navLinksArray.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link (fallback)
        const mailtoLink = `mailto:johnpaulmarquez028@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`;
        window.location.href = mailtoLink;
        
        // Show success message (optional)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ============================================
// MAGNETIC BUTTON EFFECT (BONUS)
// ============================================

const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.2;
        const moveY = y * 0.2;
        
        btn.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-2px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ============================================
// INITIALIZE ON LOAD
// ============================================

window.addEventListener('load', () => {
    // Update active nav link on initial load
    updateActiveNavLink();
    
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
let ticking = false;

function onScroll() {
    updateActiveNavLink();
    
    // Back to top visibility
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
});

