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
// ANIMATED COUNTER
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters on scroll
const statCards = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => observer.observe(card));

// ============================================
// GALLERY FILTER
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach((item, index) => {
            const categories = item.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                // Show item with animation
                setTimeout(() => {
                    item.classList.remove('hide');
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 10);
                }, index * 50);
            } else {
                // Hide item
                item.classList.add('hide');
            }
        });
    });
});

// ============================================
// LIGHTBOX VIEWER
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
let galleryData = [];

// Build gallery data array
function buildGalleryData() {
    galleryData = [];
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        const h3 = item.querySelector('.gallery-caption h3');
        const p = item.querySelector('.gallery-caption p');
        const isVideo = item.classList.contains('video-item');
        
        galleryData.push({
            type: isVideo ? 'video' : 'image',
            src: isVideo ? video.querySelector('source').src : img.src,
            title: h3 ? h3.textContent : '',
            description: p ? p.textContent : '',
            poster: isVideo ? video.getAttribute('poster') : null
        });
    });
}

buildGalleryData();

// Open lightbox
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = parseInt(btn.getAttribute('data-index'));
        openLightbox(currentIndex);
    });
});

function openLightbox(index) {
    currentIndex = index;
    const item = galleryData[index];
    
    lightboxContent.innerHTML = '';
    
    if (item.type === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        if (item.poster) {
            video.poster = item.poster;
        }
        
        const source = document.createElement('source');
        source.src = item.src;
        source.type = 'video/mp4';
        
        video.appendChild(source);
        lightboxContent.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        lightboxContent.appendChild(img);
    }
    
    lightboxCaption.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
    `;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
}

function closeLightbox() {
    // Stop any playing videos
    const video = lightboxContent.querySelector('video');
    if (video) {
        video.pause();
    }
    
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentIndex);
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    openLightbox(currentIndex);
}

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    }
});

// ============================================
// GALLERY ITEMS SCROLL ANIMATION
// ============================================
gsap.utils.toArray('.gallery-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: 'power2.out'
    });
});

// ============================================
// STATS ANIMATION
// ============================================
gsap.utils.toArray('.stat-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.gallery-stats',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

// ============================================
// FILTER BUTTONS ANIMATION
// ============================================
gsap.from('.filter-btn', {
    scrollTrigger: {
        trigger: '.filter-container',
        start: 'top 85%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            }
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

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
// CONSOLE MESSAGE
// ============================================
console.log('%c Basketball Academy - Gallery ', 'background: #5B0E14; color: #F1E194; font-size: 16px; padding: 10px;');
console.log('%c ' + galleryData.length + ' items loaded | Developed by Jay K ', 'background: #F1E194; color: #5B0E14; font-size: 12px; padding: 5px;');