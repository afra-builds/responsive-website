// ===========================================
// Loading Animation
// ===========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// ===========================================
// Scroll Progress Bar
// ===========================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ===========================================
// Navigation Bar Scrolled State
// ===========================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================================
// Mobile Menu Toggle
// ===========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
}

hamburger.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// ===========================================
// Active Navigation Link
// ===========================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-nav') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ===========================================
// Scroll Reveal Animations
// ===========================================
const revealElements = document.querySelectorAll('.service-card, .stat-card, .testimonial-card, .faq-item, .contact-form, .contact-info-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

// ===========================================
// Counter Animation for Statistics
// ===========================================
const counters = document.querySelectorAll('.counter, .stat-number');

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * target);
        
        counter.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===========================================
// FAQ Accordion (Fixed)
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// ===========================================
// Contact Form Validation
// ===========================================
const contactForm = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

function validateName() {
    const nameValue = fullName.value.trim();
    if (!nameValue) {
        fullName.classList.add('error');
        nameError.textContent = 'Full name is required';
        return false;
    } else if (nameValue.length < 2) {
        fullName.classList.add('error');
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        fullName.classList.remove('error');
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue) {
        email.classList.add('error');
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailPattern.test(emailValue)) {
        email.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        email.classList.remove('error');
        emailError.textContent = '';
        return true;
    }
}

function validatePhone() {
    const phoneValue = phone.value.trim();
    if (phoneValue && phoneValue.length < 10) {
        phone.classList.add('error');
        phoneError.textContent = 'Please enter a valid phone number';
        return false;
    } else {
        phone.classList.remove('error');
        phoneError.textContent = '';
        return true;
    }
}

function validateMessage() {
    const messageValue = message.value.trim();
    if (!messageValue) {
        message.classList.add('error');
        messageError.textContent = 'Message is required';
        return false;
    } else if (messageValue.length < 10) {
        message.classList.add('error');
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        message.classList.remove('error');
        messageError.textContent = '';
        return true;
    }
}

// Real-time validation
fullName.addEventListener('blur', validateName);
email.addEventListener('blur', validateEmail);
phone.addEventListener('blur', validatePhone);
message.addEventListener('blur', validateMessage);

fullName.addEventListener('input', () => {
    if (fullName.classList.contains('error')) {
        validateName();
    }
});

email.addEventListener('input', () => {
    if (email.classList.contains('error')) {
        validateEmail();
    }
});

phone.addEventListener('input', () => {
    if (phone.classList.contains('error')) {
        validatePhone();
    }
});

message.addEventListener('input', () => {
    if (message.classList.contains('error')) {
        validateMessage();
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        // Simulate form submission
        successMessage.classList.add('show');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

// ===========================================
// Back to Top Button
// ===========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================================
// Smooth Scrolling for Anchor Links
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});