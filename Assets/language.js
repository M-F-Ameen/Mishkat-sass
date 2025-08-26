// Language and Navigation Management
let currentLanguage = localStorage.getItem('mishkat-language') || 'en';

const translations = {
    en: { dir: 'ltr', lang: 'en' },
    ar: { dir: 'rtl', lang: 'ar' }
};

// Theme Management
let currentTheme = localStorage.getItem('mishkat-theme') || 'light';

function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    
    // Save language preference to localStorage
    localStorage.setItem('mishkat-language', currentLanguage);
    
    document.documentElement.dir = translations[currentLanguage].dir;
    document.documentElement.lang = translations[currentLanguage].lang;
    
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) element.textContent = text;
    });
    
    // Update navigation menu direction
    updateNavigationDirection();
    
    // Update form placeholders
    updateFormPlaceholders();
    
    // Update contact form placeholders (if on contact page)
    updateContactFormPlaceholders();
    
    const currentLangElement = document.getElementById('currentLang');
    if (currentLanguage === 'en') {
        currentLangElement.textContent = 'عربي';
    } else {
        currentLangElement.textContent = 'English';
    }
}

function updateFormPlaceholders() {
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const subjectInput = document.querySelectorAll('input[type="text"]')[1];
    const messageTextarea = document.querySelector('textarea');
    
    if (currentLanguage === 'ar') {
        if (nameInput) nameInput.placeholder = 'اسمك الكامل';
        if (emailInput) emailInput.placeholder = 'بريدك الإلكتروني';
        if (subjectInput) subjectInput.placeholder = 'موضوع الرسالة';
        if (messageTextarea) messageTextarea.placeholder = 'اكتب رسالتك هنا...';
    } else {
        if (nameInput) nameInput.placeholder = 'Your Full Name';
        if (emailInput) emailInput.placeholder = 'your.email@example.com';
        if (subjectInput) subjectInput.placeholder = 'Message Subject';
        if (messageTextarea) messageTextarea.placeholder = 'Write your message here...';
    }
}

// Mobile Menu Management
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
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
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('show');
            }
        });
    });
}

// Intersection Observer for Fade-in Animations
function initializeFadeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Navigation Active State Management
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Case-insensitive comparison for filename matching
        if (href.toLowerCase() === currentPage.toLowerCase()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeScrollBasedNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert(currentLanguage === 'en' ? 
                'Thank you for your message! We will get back to you soon.' : 
                'شكراً لك على رسالتك! سنتواصل معك قريباً.'
            );
            
            // Reset form
            this.reset();
        });
    }
}

// Contact Form Placeholders (for Contact.html)
function updateContactFormPlaceholders() {
    const placeholders = {
        en: {
            name: 'Your Full Name',
            email: 'your.email@example.com',
            phone: '+1 (555) 123-4567',
            company: 'Your Company Name',
            message: 'Tell us about your project requirements...'
        },
        ar: {
            name: 'اسمك الكامل',
            email: 'your.email@example.com',
            phone: '+1 (555) 123-4567',
            company: 'اسم شركتك',
            message: 'أخبرنا عن متطلبات مشروعك...'
        }
    };
    
    const inputs = {
        name: document.querySelector('input[name="name"]'),
        email: document.querySelector('input[name="email"]'),
        phone: document.querySelector('input[name="phone"]'),
        company: document.querySelector('input[name="company"]'),
        message: document.querySelector('textarea[name="message"]')
    };
    
    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            inputs[key].placeholder = placeholders[currentLanguage][key];
        }
    });
}

// FAQ Toggle Function (for Contact.html)
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Portfolio Filtering (for Portfolio.html)
function initializePortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Theme Management Functions
function switchTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Save theme preference to localStorage
    localStorage.setItem('mishkat-theme', currentTheme);
    
    // Apply theme to document
    applyTheme();
    
    // Update theme toggle icon
    updateThemeToggleIcon();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            icon.setAttribute('title', 'Switch to Light Mode');
        } else {
            icon.className = 'fas fa-moon';
            icon.setAttribute('title', 'Switch to Dark Mode');
        }
    }
}

function createThemeToggle() {
    // Check if toggle already exists
    if (document.getElementById('themeToggle')) {
        return;
    }
    
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    const icon = document.createElement('i');
    icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    icon.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    
    themeToggle.appendChild(icon);
    document.body.appendChild(themeToggle);
    
    // Add click event
    themeToggle.addEventListener('click', switchTheme);
}

// Update navigation menu direction based on current language
function updateNavigationDirection() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileNavContent = document.querySelector('.mobile-nav-content');
    
    // Define the correct order for both desktop and mobile
    const correctOrder = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'career.html', 'contact.html'];
    
    if (currentLanguage === 'ar') {
        // For Arabic, reverse only the desktop navigation (RTL layout)
        if (navMenu) {
            const navLinks = Array.from(navMenu.children);
            navLinks.reverse();
            navLinks.forEach(link => navMenu.appendChild(link));
        }
        // Keep mobile navigation in logical order (top to bottom)
        if (mobileNavContent) {
            const mobileLinks = Array.from(mobileNavContent.children);
            mobileLinks.sort((a, b) => {
                const aHref = a.getAttribute('href').toLowerCase();
                const bHref = b.getAttribute('href').toLowerCase();
                return correctOrder.indexOf(aHref) - correctOrder.indexOf(bHref);
            });
            mobileLinks.forEach(link => mobileNavContent.appendChild(link));
        }
    } else {
        // For English, maintain logical order for both desktop and mobile
        if (navMenu) {
            const navLinks = Array.from(navMenu.children);
            navLinks.sort((a, b) => {
                const aHref = a.getAttribute('href').toLowerCase();
                const bHref = b.getAttribute('href').toLowerCase();
                return correctOrder.indexOf(aHref) - correctOrder.indexOf(bHref);
            });
            navLinks.forEach(link => navMenu.appendChild(link));
        }
        if (mobileNavContent) {
            const mobileLinks = Array.from(mobileNavContent.children);
            mobileLinks.sort((a, b) => {
                const aHref = a.getAttribute('href').toLowerCase();
                const bHref = b.getAttribute('href').toLowerCase();
                return correctOrder.indexOf(aHref) - correctOrder.indexOf(bHref);
            });
            mobileLinks.forEach(link => mobileNavContent.appendChild(link));
        }
    }
}

// Apply saved language on page load
function applySavedLanguage() {
    document.documentElement.dir = translations[currentLanguage].dir;
    document.documentElement.lang = translations[currentLanguage].lang;
    
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) element.textContent = text;
    });
    
    // Update navigation direction
    updateNavigationDirection();
    
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        if (currentLanguage === 'en') {
            currentLangElement.textContent = 'عربي';
        } else {
            currentLangElement.textContent = 'English';
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme first
    applyTheme();
    
    // Apply saved language
    applySavedLanguage();
    
    // Create and initialize theme toggle
    createThemeToggle();
    updateThemeToggleIcon();
    
    // Initialize language switcher
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', switchLanguage);
    }
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize fade animations
    initializeFadeAnimations();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize portfolio filtering (if on portfolio page)
    initializePortfolioFiltering();
    
    // Set initial form placeholders
    updateFormPlaceholders();
    
    // Set initial contact form placeholders (if on contact page)
    updateContactFormPlaceholders();
    
    // Set active navigation item based on current page
    setActiveNavItem();
    
    // Initialize scroll-based navigation
    initializeScrollBasedNavigation();
});

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        applySavedLanguage,
        updateNavigationDirection,
        updateFormPlaceholders,
        updateContactFormPlaceholders,
        initializeMobileMenu,
        initializeSmoothScrolling,
        initializeFadeAnimations,
        setActiveNavItem,
        initializeScrollBasedNavigation,
        initializeFormHandling,
        toggleFAQ,
        initializePortfolioFiltering,
        switchTheme,
        applyTheme,
        updateThemeToggleIcon,
        createThemeToggle
    };
} 