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
//  GOOGLE SHEETS EVENTS SYSTEM
// ============================================

const GOOGLE_SHEET_ID = '1uR5wM6vYNhFZH4wouNiPucn8a-yN_8bxcTOk_h3hrrs'; // ← Your Sheet ID

// ============================================
// DEFAULT EVENTS (FALLBACK)
// ============================================

const DEFAULT_EVENTS = [
    {
        month: 'MAR',
        day: '15',
        title: 'Open Day - Mid-Year',
        location: 'Crawford International Sandton College, Waterstone Drive',
        time: '9:00 AM - 1:00 PM',
        description: 'Experience our academy! Free trial sessions for all age groups. Meet our coaches, tour the facilities, and see our training programs in action.'
    },
    {
        month: 'ONGOING',
        day: '<i class="fas fa-basketball-ball"></i>',
        title: 'League Competitions',
        location: 'Various Locations - Johannesburg',
        time: 'Weekends',
        description: 'Our players compete in Jr. NBA JHB League (U14) and Eagles League (U7-U18). Check schedule for upcoming games and support our teams!'
    },
    {
        month: 'SEP',
        day: '20',
        title: 'Open Day - End of Year',
        location: 'Crawford International Sandton College, Waterstone Drive',
        time: '9:00 AM - 1:00 PM',
        description: 'Join our second annual Open Day! Free sessions, skills challenges, and registration for the upcoming season. Great opportunity for new players to join!'
    }
];

// ============================================
// FETCH FROM GOOGLE SHEETS
// ============================================

async function fetchSheetEvents() {
    if (!GOOGLE_SHEET_ID || GOOGLE_SHEET_ID.trim() === '') {
        console.log('📊 No Google Sheet configured - using default events');
        return null;
    }
    
    try {
        const csvURL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=0`;
        
        console.log('📊 Fetching from Google Sheet...');
        console.log('📍 URL:', csvURL);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch(csvURL, { 
            signal: controller.signal,
            mode: 'cors'
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            console.error('❌ Sheet fetch failed:', response.status, response.statusText);
            throw new Error(`HTTP ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('✅ Raw CSV received, length:', csvText.length);
        console.log('📄 First 200 chars:', csvText.substring(0, 200));
        
        return parseFlexibleCSV(csvText);
        
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return null;
    }
}

// ============================================
// FLEXIBLE CSV PARSER
// Detects column format automatically!
// ============================================

function parseFlexibleCSV(csvText) {
    const lines = csvText.trim().split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
        console.error('⚠️ Sheet empty or invalid');
        return null;
    }
    
    // Parse header to detect columns
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
    console.log('📋 Detected columns:', headers);
    
    // Find column indices (flexible!)
    const cols = {
        date: headers.findIndex(h => h.includes('date')),
        month: headers.findIndex(h => h.includes('month')),
        day: headers.findIndex(h => h.includes('day')),
        title: headers.findIndex(h => h.includes('title')),
        location: headers.findIndex(h => h.includes('location')),
        time: headers.findIndex(h => h.includes('time')),
        description: headers.findIndex(h => h.includes('description') || h.includes('desc'))
    };
    
    console.log('🔍 Column mapping:', cols);
    
    // Parse data rows
    const events = [];
    
    for (let i = 1; i < lines.length; i++) {
        try {
            const row = parseCSVLine(lines[i]);
            
            if (row.length < 3) {
                console.warn(`⚠️ Row ${i} too short, skipping`);
                continue;
            }
            
            let month, day;
            
            // If there's a "Date" column, parse it
            if (cols.date >= 0 && row[cols.date]) {
                const dateStr = row[cols.date].trim();
                const dateParsed = parseDateString(dateStr);
                month = dateParsed.month;
                day = dateParsed.day;
            } 
            // Otherwise use Month + Day columns
            else {
                month = cols.month >= 0 ? row[cols.month]?.trim() : '';
                day = cols.day >= 0 ? row[cols.day]?.trim() : '';
            }
            
            const event = {
                month: month || 'TBA',
                day: day || '?',
                title: cols.title >= 0 ? row[cols.title]?.trim() : 'Event',
                location: cols.location >= 0 ? row[cols.location]?.trim() : 'TBA',
                time: cols.time >= 0 ? row[cols.time]?.trim() : 'TBA',
                description: cols.description >= 0 ? row[cols.description]?.trim() : ''
            };
            
            // Only add if has title
            if (event.title && event.title !== '') {
                events.push(event);
                console.log(`✅ Parsed: ${event.title}`);
            }
            
        } catch (err) {
            console.warn(`⚠️ Error parsing row ${i}:`, err.message);
        }
    }
    
    console.log(`✅ Successfully parsed ${events.length} events`);
    return events.length > 0 ? events : null;
}

// ============================================
// PARSE DATE STRING TO MONTH/DAY
// ============================================

function parseDateString(dateStr) {
    // Try different date formats
    
    // Format: "February 14th 2025" or "Februray 14th 2025"
    const longFormat = dateStr.match(/(\w+)\s+(\d+)/);
    if (longFormat) {
        const monthName = longFormat[1];
        const day = longFormat[2];
        
        // Convert month name to abbreviation
        const months = {
            'january': 'JAN', 'jan': 'JAN',
            'february': 'FEB', 'februray': 'FEB', 'feb': 'FEB',
            'march': 'MAR', 'mar': 'MAR',
            'april': 'APR', 'apr': 'APR',
            'may': 'MAY',
            'june': 'JUN', 'jun': 'JUN',
            'july': 'JUL', 'jul': 'JUL',
            'august': 'AUG', 'aug': 'AUG',
            'september': 'SEP', 'sep': 'SEP', 'sept': 'SEP',
            'october': 'OCT', 'oct': 'OCT',
            'november': 'NOV', 'nov': 'NOV',
            'december': 'DEC', 'dec': 'DEC'
        };
        
        const month = months[monthName.toLowerCase()] || monthName.substring(0, 3).toUpperCase();
        return { month, day };
    }
    
    // Format: "2025-02-14" or "14/02/2025"
    const isoFormat = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (isoFormat) {
        const monthNum = parseInt(isoFormat[2]);
        const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        return { month: months[monthNum - 1], day: isoFormat[3] };
    }
    
    // Default: use as-is
    return { month: dateStr, day: '' };
}

// ============================================
// PARSE CSV LINE (handles quotes and commas)
// ============================================

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result.map(s => s.replace(/^"|"$/g, ''));
}

// ============================================
// CREATE EVENT CARD
// ============================================

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    card.innerHTML = `
        <div class="event-date">
            <span class="month">${event.month}</span>
            <span class="day">${event.day}</span>
        </div>
        <div class="event-content">
            <h3>${event.title}</h3>
            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            <p class="event-time"><i class="far fa-clock"></i> ${event.time}</p>
            <p class="event-description">${event.description}</p>
            <a href="Contact/contact.html" class="event-link">Register Now <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    return card;
}

// ============================================
// RENDER EVENTS
// ============================================

function renderEvents(events) {
    const eventsGrid = document.querySelector('.events-grid');
    
    if (!eventsGrid) {
        console.error('❌ Events grid not found');
        return;
    }
    
    eventsGrid.innerHTML = '';
    
    if (!events || events.length === 0) {
        eventsGrid.innerHTML = `
            <div class="no-events">
                <i class="fas fa-calendar-times"></i>
                <p>No upcoming events at the moment.<br>Check back soon!</p>
            </div>
        `;
        console.log('📅 No events to display');
        return;
    }
    
    events.forEach(event => {
        eventsGrid.appendChild(createEventCard(event));
    });
    
    console.log(`✅ Displayed ${events.length} events`);
}

// ============================================
// RENDER DEFAULT EVENTS
// ============================================

function renderNoEventsMessage() {
    const eventsGrid = document.querySelector('.events-grid');

    eventsGrid.innerHTML = `
        <div class="no-events">
            <i class="fas fa-calendar-alt"></i>
            <p>
                No upcoming events scheduled right now.<br>
                New sessions and open days will be announced soon.
            </p>
        </div>
    `;
    
    console.log('📅 No events in sheet');
}

// ============================================
// INITIALIZE
// ============================================

async function initEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    
    if (!eventsGrid) {
        console.error('❌ Events grid not found');
        return;
    }
    
    // If no sheet connected at all
    if (!GOOGLE_SHEET_ID || GOOGLE_SHEET_ID.trim() === '') {
        renderNoEventsMessage();
        return;
    }
    
    // Loading state
    eventsGrid.innerHTML = `
        <div class="loading-events">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading upcoming events...</p>
        </div>
    `;
    
    const events = await fetchSheetEvents();
    
    if (events && events.length > 0) {
        renderEvents(events);
    } else {
        // If sheet exists but empty
        renderNoEventsMessage();
    }
}


// ============================================
// RUN ON LOAD
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
} else {
    initEvents();
}

// Manual refresh for testing
window.refreshEvents = () => {
    console.log('🔄 Refreshing...');
    initEvents();
};

console.log('📊 Events system loaded');
console.log('🔧 Sheet ID:', GOOGLE_SHEET_ID || 'Not configured');
console.log('💡 Type refreshEvents() to reload');
