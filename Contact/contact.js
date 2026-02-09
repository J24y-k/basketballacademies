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

// Form submission handling - WHATSAPP VERSION (CROSS-PLATFORM OPTIMIZED)
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide previous messages
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Validate required fields
    if (!data.parentName || !data.phone || !data.email || !data.inquiryType || !data.message) {
        formError.querySelector('p').textContent = 'Please fill in all required fields marked with *';
        formError.style.display = 'flex';
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    // Additional validation for registration
    if (data.inquiryType === 'registration') {
        if (!data.childName || !data.childAge || !data.gender) {
            formError.querySelector('p').textContent = 'Please fill in all child information fields for registration.';
            formError.style.display = 'flex';
            formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }
    
    // Build WhatsApp message
    let whatsappMessage = `🏀 *NEW BASKETBALL ACADEMY INQUIRY*\n\n`;
    whatsappMessage += `📋 *Inquiry Type:* ${formatInquiryType(data.inquiryType)}\n\n`;
    whatsappMessage += `👤 *Parent/Guardian Information:*\n`;
    whatsappMessage += `Name: ${data.parentName}\n`;
    whatsappMessage += `Phone: ${data.phone}\n`;
    whatsappMessage += `Email: ${data.email}\n\n`;
    
    // Add child information if registration
    if (data.inquiryType === 'registration' && data.childName) {
        whatsappMessage += `👶 *Child's Information:*\n`;
        whatsappMessage += `Name: ${data.childName}\n`;
        whatsappMessage += `Age: ${data.childAge} years old\n`;
        whatsappMessage += `Gender: ${capitalizeFirst(data.gender)}\n`;
        if (data.experience) {
            whatsappMessage += `Experience: ${capitalizeFirst(data.experience)}\n`;
        }
        if (data.preferredProgram) {
            whatsappMessage += `Preferred Program: ${formatProgram(data.preferredProgram)}\n`;
        }
        whatsappMessage += `\n`;
    }
    
    // Add message
    whatsappMessage += `💬 *Message:*\n${data.message}\n\n`;
    
    // Add how they heard about us
    if (data.hearAbout) {
        whatsappMessage += `📢 *How they heard about us:* ${capitalizeFirst(data.hearAbout)}\n`;
    }
    
    // WhatsApp number (TEST: 0832688029, PRODUCTION: 0839682191)
    const whatsappNumber = '27745192332'; // Change to '27839682191' for production
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Detect device and browser to use appropriate WhatsApp URL
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    let whatsappURL;
    
    if (isMobile) {
        // Mobile devices - Use app deep link
        if (isIOS) {
            // iOS - Try app first, fallback to web
            whatsappURL = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
        } else if (isAndroid) {
            // Android - Use intent that works on all Android browsers
            whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        } else {
            // Other mobile OS
            whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        }
    } else {
        // Desktop - Use WhatsApp Web (works on all browsers)
        whatsappURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    }
    
    // Try to open WhatsApp
    try {
        const whatsappWindow = window.open(whatsappURL, '_blank');
        
        // Check if popup was blocked
        if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed == 'undefined') {
            // Popup blocked - show manual link
            showManualWhatsAppLink(whatsappURL, isMobile);
        } else {
            // Success - show confirmation
            showSuccessMessage(whatsappURL, isMobile);
        }
    } catch (error) {
        // Error opening WhatsApp - show manual link
        showManualWhatsAppLink(whatsappURL, isMobile);
    }
    
    // Reset form after submission
    setTimeout(() => {
        contactForm.reset();
        childInfoSection.style.display = 'none';
    }, 3000);
});

// Show success message with fallback link
function showSuccessMessage(whatsappURL, isMobile) {
    const deviceText = isMobile ? 'WhatsApp app' : 'WhatsApp Web';
    
    formSuccess.querySelector('p').innerHTML = `
        ✅ Your message has been prepared!<br><br>
        ${deviceText} should open automatically. Please click "Send" to complete your inquiry.<br><br>
        <small>If it didn't open, <a href="${whatsappURL}" target="_blank" style="color: #28a745; font-weight: bold; text-decoration: underline;">click here to open WhatsApp</a></small>
    `;
    formSuccess.style.display = 'flex';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Animate success message
    gsap.from(formSuccess, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// Show manual WhatsApp link if auto-open failed
function showManualWhatsAppLink(whatsappURL, isMobile) {
    const deviceText = isMobile ? 'WhatsApp app' : 'WhatsApp Web';
    
    formSuccess.querySelector('p').innerHTML = `
        📱 Your message is ready!<br><br>
        <a href="${whatsappURL}" target="_blank" class="btn-whatsapp-manual" style="
            display: inline-block;
            background-color: #25D366;
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            margin: 15px 0;
        ">
            <i class="fab fa-whatsapp"></i> Click Here to Open ${deviceText}
        </a><br><br>
        <small>Then click "Send" to complete your inquiry</small>
    `;
    formSuccess.style.display = 'flex';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Animate success message
    gsap.from(formSuccess, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// Helper function to format inquiry type
function formatInquiryType(type) {
    const types = {
        'registration': 'Register My Child',
        'enquiry': 'Make an Enquiry',
        'question': 'Ask a Question',
        'visit': 'Schedule a Visit',
        'other': 'Other'
    };
    return types[type] || type;
}

// Helper function to format program
function formatProgram(program) {
    const programs = {
        '6-12': 'Foundation Program (6-12 years)',
        '13-15': 'Development Program (13-15 years)',
        '15-18': 'Advanced Program (15-18 years)'
    };
    return programs[program] || program;
}

// Helper function to capitalize first letter
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
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
// WHATSAPP INTEGRATION COMPLETE
// ============================================

/*
HOW IT WORKS:

1. User fills out the form
2. Form data is formatted into a nice WhatsApp message
3. WhatsApp opens with pre-filled message
4. User just clicks "Send" in WhatsApp
5. Message goes directly to your WhatsApp number

TO CHANGE TO PRODUCTION NUMBER:
- Find this line: const whatsappNumber = '27832688029';
- Change to: const whatsappNumber = '27839682191';

ADVANTAGES:
✅ No backend needed
✅ No email setup
✅ Instant notifications on phone
✅ Can reply directly in WhatsApp
✅ See sender's phone number
✅ Simple and reliable
✅ Works on mobile and desktop

The form will open WhatsApp with a perfectly formatted message
containing all the inquiry details!
*/