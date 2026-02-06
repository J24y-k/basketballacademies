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
// CONTACT CARDS ANIMATION
// ============================================
gsap.utils.toArray('.contact-card').forEach((card, index) => {
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

// ============================================
// FORM ANIMATIONS
// ============================================
gsap.from('.form-container', {
    scrollTrigger: {
        trigger: '.form-map-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power2.out'
});

gsap.from('.map-container', {
    scrollTrigger: {
        trigger: '.form-map-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power2.out'
});

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Animate FAQ items on scroll
gsap.utils.toArray('.faq-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const inquiryType = document.getElementById('inquiryType');
const childInfoSection = document.getElementById('childInfoSection');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

// Show/hide child information section based on inquiry type
inquiryType.addEventListener('change', function() {
    if (this.value === 'registration') {
        childInfoSection.style.display = 'block';
        
        // Make child fields required
        document.getElementById('childName').required = true;
        document.getElementById('childAge').required = true;
        document.getElementById('gender').required = true;
        
        // Animate the section
        gsap.from(childInfoSection, {
            opacity: 0,
            height: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    } else {
        childInfoSection.style.display = 'none';
        
        // Make child fields optional
        document.getElementById('childName').required = false;
        document.getElementById('childAge').required = false;
        document.getElementById('gender').required = false;
    }
});

// Form submission handling
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Hide previous messages
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
    // Show loading state
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const submitBtn = document.querySelector('.btn-submit');
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Simulate form submission (replace with actual backend endpoint)
    try {
        // This is where you would send data to your backend
        // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        
        // For demonstration, we'll simulate a successful submission
        await simulateFormSubmission(data);
        
        // Show success message
        formSuccess.style.display = 'flex';
        contactForm.reset();
        childInfoSection.style.display = 'none';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Animate success message
        gsap.from(formSuccess, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
        
    } catch (error) {
        // Show error message
        formError.style.display = 'flex';
        
        // Scroll to error message
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Animate error message
        gsap.from(formError, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Simulate form submission (remove in production and use actual backend)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Log form data to console for testing
        console.log('Form Data Submitted:', data);
        
        // Simulate network delay
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// ============================================
// FORM VALIDATION & UX ENHANCEMENTS
// ============================================

// Phone number formatting (South African format)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    // Format: 083 123 4567
    if (value.length > 3 && value.length <= 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length > 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
    }
    
    e.target.value = value;
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        this.style.borderColor = '#dc3545';
    } else {
        this.style.borderColor = '';
    }
});

// Character counter for message
const messageInput = document.getElementById('message');
messageInput.addEventListener('input', function() {
    const length = this.value.length;
    const label = this.previousElementSibling;
    
    if (length > 500) {
        label.textContent = `Your Message (${length}/1000 characters)`;
    }
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
// PERFORMANCE: Reduce animations on mobile
// ============================================
if (window.innerWidth < 768) {
    ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });
}

// ============================================
// AUTO-FILL DETECTION (for better UX)
// ============================================
window.addEventListener('load', () => {
    // Check if browser autofilled any fields
    document.querySelectorAll('input:-webkit-autofill').forEach(input => {
        input.style.borderColor = 'var(--burgundy)';
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c Basketball Academy - Contact Page ', 'background: #5B0E14; color: #F1E194; font-size: 16px; padding: 10px;');
console.log('%c Developed by Jay K | jeremiahkazadi9@gmail.com ', 'background: #F1E194; color: #5B0E14; font-size: 12px; padding: 5px;');

// ============================================
// FORM DATA TO EMAIL (BACKEND INTEGRATION)
// ============================================

/*
BACKEND INTEGRATION NOTES FOR DEVELOPER:

To make this form functional, you need to:

1. SET UP EMAIL SERVICE:
   - Use FormSubmit.co (easiest, free)
   - Or use EmailJS
   - Or build your own PHP/Node.js backend

2. FORMSUBMIT.CO SETUP (RECOMMENDED):
   Replace the simulateFormSubmission function with:
   
   contactForm.setAttribute('action', 'https://formsubmit.co/ballacademy.za@gmail.com');
   contactForm.setAttribute('method', 'POST');
   
   Add these hidden fields to the form:
   <input type="hidden" name="_subject" value="New Basketball Academy Inquiry">
   <input type="hidden" name="_captcha" value="false">
   <input type="hidden" name="_next" value="https://basketballacademies.com/thank-you.html">

3. EMAILJS SETUP:
   - Sign up at emailjs.com
   - Get your Service ID, Template ID, and User ID
   - Replace simulateFormSubmission with EmailJS send function

4. CUSTOM BACKEND:
   - Create PHP/Node.js endpoint
   - Use fetch() to POST data
   - Handle email sending on backend

EXAMPLE WITH FORMSUBMIT:

contactForm.addEventListener('submit', async function(e) {
    // Remove e.preventDefault() to allow normal form submission
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Form will submit to FormSubmit.co automatically
});

*/