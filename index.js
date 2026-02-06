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
// HERO CAROUSEL FUNCTIONALITY
// ============================================
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-control.prev');
        this.nextBtn = document.querySelector('.carousel-control.next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Add click events to controls
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add click events to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroSection.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    goToSlide(n) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = n;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slides.length) {
            next = 0;
        }
        this.goToSlide(next);
    }
    
    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.slides.length - 1;
        }
        this.goToSlide(prev);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize carousel
const carousel = new HeroCarousel();

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Fade in animations for sections
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

// Feature cards animation
gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

// Event cards animation
gsap.utils.toArray('.event-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.7,
        delay: index * 0.15,
        ease: 'power2.out'
    });
});

// Age group cards animation
gsap.utils.toArray('.age-group-card').forEach((card, index) => {
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

// Mission section animation
gsap.from('.mission-content', {
    scrollTrigger: {
        trigger: '.mission-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out'
});

// CTA section animation
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

// Hero content animation (on page load)
gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
});

gsap.from('.hero-locations', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.9,
    ease: 'power3.out'
});

gsap.from('.hero-buttons', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.2,
    ease: 'power3.out'
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
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
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
    // Disable some GSAP animations on mobile for better performance
    ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c Basketball Academy Website ', 'background: #5B0E14; color: #F1E194; font-size: 16px; padding: 10px;');
console.log('%c Developed by Jay K | jeremiahkazadi9@gmail.com ', 'background: #F1E194; color: #5B0E14; font-size: 12px; padding: 5px;');