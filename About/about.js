// ============================================
// GSAP ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// PAGE HEADER ANIMATION
// ============================================
gsap.from('.header-content h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.header-content p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
});

gsap.from('.breadcrumb', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.9,
    ease: 'power3.out'
});

// ============================================
// STORY SECTION ANIMATIONS
// ============================================
gsap.from('.story-image', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power2.out'
});

gsap.from('.story-content', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power2.out'
});

// Animate stats with counter
const animateCounter = (element, target) => {
    const obj = { value: 0 };
    gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
            element.textContent = Math.ceil(obj.value) + (target >= 100 ? '+' : '+');
        },
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
};

// Counter for stats (adjust numbers based on actual stats)
document.querySelectorAll('.stat-number').forEach((stat, index) => {
    const numbers = [200, 15, 1]; // 200+ students, 15+ coaches, 1 location
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => animateCounter(stat, numbers[index])
    });
});

// ============================================
// MVV CARDS ANIMATION
// ============================================
gsap.utils.toArray('.mvv-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out'
    });
});

// ============================================
// OFFERINGS CARDS ANIMATION
// ============================================
gsap.utils.toArray('.offering-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.2)'
    });
});

// ============================================
// WHY CHOOSE US ANIMATION
// ============================================
gsap.utils.toArray('.why-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        delay: index * 0.15,
        ease: 'power2.out'
    });
});

gsap.from('.why-image', {
    scrollTrigger: {
        trigger: '.why-choose-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power2.out'
});

// ============================================
// TESTIMONIALS ANIMATION
// ============================================
gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: index * 0.2,
        ease: 'power2.out'
    });
});

// ============================================
// SECTION HEADERS ANIMATION
// ============================================
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// ============================================
// CTA SECTION ANIMATION
// ============================================
gsap.from('.cta-content', {
    scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power2.out'
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR LAZY LOADING
// ============================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// PERFORMANCE: Reduce animations on mobile
// ============================================
if (window.innerWidth < 768) {
    ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });
}

// ============================================
// HOVER EFFECTS FOR TESTIMONIAL CARDS
// ============================================
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c Basketball Academy - About Page ', 'background: #5B0E14; color: #F1E194; font-size: 16px; padding: 10px;');
console.log('%c Developed by Jay K | jeremiahkazadi9@gmail.com ', 'background: #F1E194; color: #5B0E14; font-size: 12px; padding: 5px;');