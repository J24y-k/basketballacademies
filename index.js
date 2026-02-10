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

// ============================================
// GOOGLE CALENDAR INTEGRATION FOR EVENTS
// ============================================

/*
HOW IT WORKS:
1. Client creates/updates events in Google Calendar
2. Makes calendar public with specific sharing settings
3. Gets Calendar ID
4. Paste Calendar ID below
5. Website automatically pulls events and displays them

SETUP INSTRUCTIONS FOR CLIENT:
1. Go to Google Calendar (calendar.google.com)
2. Create a new calendar called "Basketball Academy Events"
3. Add events with:
   - Title
   - Date
   - Time
   - Location
   - Description
4. Make calendar public:
   - Settings → Share with specific people → Make available to public
5. Get Calendar ID:
   - Settings → Integrate calendar → Calendar ID
   - Example: abc123@group.calendar.google.com
6. Paste Calendar ID in the variable below
*/

// ============================================
// CONFIGURATION
// ============================================

// PASTE YOUR GOOGLE CALENDAR ID HERE
const CALENDAR_ID = 'https://calendar.google.com/calendar/embed?src=0a12742a00dfd19247529f47d24a1c25f6b5636d597f29a5ed73f565f4b8627f%40group.calendar.google.com&ctz=Africa%2FJohannesburg';

// PASTE YOUR GOOGLE API KEY HERE (Free - get from Google Cloud Console)
const API_KEY = 'AIzaSyAq82AoypW1_AdSRmM4V24eLfB8wIwEeRM';

// Number of events to display
const MAX_EVENTS = 3;

// ============================================
// FETCH EVENTS FROM GOOGLE CALENDAR
// ============================================

async function fetchCalendarEvents() {
    try {
        // Build Google Calendar API URL
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${now}&maxResults=${MAX_EVENTS}&singleEvents=true&orderBy=startTime`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch calendar events');
        }
        
        const data = await response.json();
        return data.items || [];
        
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        return null;
    }
}

// ============================================
// RENDER EVENTS ON PAGE
// ============================================

function renderEvents(events) {
    const eventsGrid = document.querySelector('.events-grid');
    
    if (!eventsGrid) {
        console.error('Events grid not found');
        return;
    }
    
    // Clear existing events
    eventsGrid.innerHTML = '';
    
    if (!events || events.length === 0) {
        eventsGrid.innerHTML = `
            <div class="no-events">
                <p><i class="fas fa-calendar-times"></i> No upcoming events at the moment. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    // Render each event
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// ============================================
// CREATE EVENT CARD HTML
// ============================================

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    // Parse date
    const startDate = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
    const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = startDate.getDate();
    
    // Parse time
    let timeString = '';
    if (event.start.dateTime) {
        const startTime = startDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const endDate = event.end.dateTime ? new Date(event.end.dateTime) : null;
        const endTime = endDate ? endDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';
        timeString = endTime ? `${startTime} - ${endTime}` : startTime;
    } else {
        timeString = 'All Day';
    }
    
    // Get location or use default
    const location = event.location || 'Crawford International Sandton College, Waterstone Drive';
    
    // Get description or use default
    const description = event.description || event.summary;
    
    // Build card HTML
    card.innerHTML = `
        <div class="event-date">
            <span class="month">${month}</span>
            <span class="day">${day}</span>
        </div>
        <div class="event-content">
            <h3>${event.summary}</h3>
            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${location}</p>
            <p class="event-time"><i class="far fa-clock"></i> ${timeString}</p>
            <p class="event-description">${description}</p>
            <a href="Contact/contact.html" class="event-link">Register Now <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    return card;
}

// ============================================
// INITIALIZE CALENDAR INTEGRATION
// ============================================

async function initCalendarEvents() {
    // Check if API key and Calendar ID are configured
    if (CALENDAR_ID === 'YOUR_CALENDAR_ID@group.calendar.google.com' || 
        API_KEY === 'YOUR_API_KEY_HERE') {
        console.log('Google Calendar not configured yet. Using default events.');
        return;
    }
    
    // Show loading state
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid) {
        eventsGrid.innerHTML = '<div class="loading-events"><i class="fas fa-spinner fa-spin"></i> Loading events...</div>';
    }
    
    // Fetch and render events
    const events = await fetchCalendarEvents();
    
    if (events) {
        renderEvents(events);
    } else {
        // If fetch fails, keep default events
        console.log('Using default events due to fetch error');
    }
}

// ============================================
// RUN ON PAGE LOAD
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendarEvents);
} else {
    initCalendarEvents();
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchCalendarEvents, renderEvents, createEventCard };
}