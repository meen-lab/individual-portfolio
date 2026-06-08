/* ========================================
   MODERN PORTFOLIO - ENHANCED JAVASCRIPT
   ======================================== */

/**
 * Initialize all features on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeHeader();
  initializeNavigation();
  initializeTheme();
  initializeScrollAnimations();
  initializeScrollToTop();
  initializeContactForm();
});

/**
 * HEADER SCROLL EFFECT
 * Adds shadow when user scrolls down
 */
function initializeHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });
}

/**
 * NAVIGATION FUNCTIONALITY
 * Handles mobile menu toggle and active page indicator
 */
function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.toggle('open');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }

  // Set active page indicator
  setActiveNavLink();
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = getCurrentPage();

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });
}

/**
 * Get current page name from URL
 */
function getCurrentPage() {
  const pathname = window.location.pathname;

  if (pathname.includes('about.html')) return 'about';
  if (pathname.includes('blog.html')) return 'blog';
  if (pathname.includes('contact.html')) return 'contact';
  return 'home';
}

/**
 * THEME MANAGEMENT
 * Dark mode toggle with localStorage persistence
 */
function initializeTheme() {
  const themeButtons = document.querySelectorAll('.theme-toggle');

  // Load saved theme or match user OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  // Toggle theme on button click
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });
}

/**
 * Apply theme and save preference
 */
function applyTheme(theme) {
  const themeButtons = document.querySelectorAll('.theme-toggle');

  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeButtons.forEach(btn => {
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', 'Switch to light mode');
    });
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeButtons.forEach(btn => {
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    });
  }

  localStorage.setItem('theme', theme);
}

/**
 * SCROLL ANIMATIONS
 * Fade-in elements as they come into view using Intersection Observer
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * SCROLL TO TOP BUTTON
 * Shows when user scrolls down, scrolls smoothly back to top
 */
function initializeScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * CONTACT FORM VALIDATION
 * Validates form fields before submission
 */
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateContactForm()) {
      // Show success message
      showFormSuccess();
      contactForm.reset();
    }
  });

  // Real-time validation on input
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });
}

/**
 * Validate individual form field
 */
function validateField(field) {
  const errorEl = document.getElementById(field.id + 'Error');
  let isValid = true;
  let errorMsg = '';

  if (field.id === 'name') {
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = 'Please enter your name';
    }
  } else if (field.id === 'email') {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = 'Please enter your email';
    } else if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email';
    }
  } else if (field.id === 'subject') {
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = 'Please enter a subject';
    }
  } else if (field.id === 'message') {
    if (!field.value.trim() || field.value.trim().length < 10) {
      isValid = false;
      errorMsg = 'Message must be at least 10 characters';
    }
  }

  if (errorEl) {
    errorEl.textContent = errorMsg;
  }

  if (isValid) {
    field.classList.remove('invalid');
  } else {
    field.classList.add('invalid');
  }

  return isValid;
}

/**
 * Validate entire contact form
 */
function validateContactForm() {
  const form = document.getElementById('contactForm');
  const fields = form.querySelectorAll('input, textarea');
  let isFormValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

/**
 * Show success message for form submission
 */
function showFormSuccess() {
  const message = 'Thank you! Your message has been received. I will get back to you soon.';
  alert(message);
  // Optional: You can replace this with a toast notification or modal
}

/**
 * SMOOTH SCROLL BEHAVIOR
 * Enhanced smooth scrolling for anchor links
 */
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});
