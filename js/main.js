// Main JavaScript File

// Import components
import { initMobileMenu } from './components/navigation.js';
import { initCalculator } from './components/calculator.js';
import { initTestimonialSlider } from './components/slider.js';
import { initChatWidget } from './components/chat.js';
import { initScrollToTop } from './components/scroll.js';
import { initFAQ } from './components/faq.js';
import { fetchBlogPosts } from './components/blog.js';

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Update current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize components
  initMobileMenu();
  initCalculator();
  initTestimonialSlider();
  initChatWidget();
  initScrollToTop();
  initFAQ();
  
  // Load blog posts
  fetchBlogPosts();
  
  // Countdown timer for CTA section
  function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 0);

    const diff = tomorrow - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  // Update countdown every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animation for stats counter
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach((statNumber) => {
      if (!statNumber.dataset.animated) {
        const originalText = statNumber.textContent;
        const match = originalText.match(/^([\d.]+)(.*)$/);
        if (!match) return;

        const targetNumber = parseFloat(match[1].replace(/,/g, ''));
        const suffix = match[2] || '';
        let current = 0;
        const increment = targetNumber / 100;
        const isDecimal = originalText.includes('.');

        const timer = setInterval(() => {
          current += increment;

          if (current >= targetNumber) {
            clearInterval(timer);
            statNumber.textContent = originalText;
            statNumber.dataset.animated = true;
          } else {
            let displayNumber;
            if (isDecimal) {
              displayNumber = current.toFixed(1);
            } else {
              displayNumber = Math.floor(current);
            }
            statNumber.textContent = displayNumber.toLocaleString('en-IN') + suffix;
          }
        }, 20);
      }
    });
  }

  // Trigger animation when stats section comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Lead form submission
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! We\'ll contact you shortly with your cash back estimate.');
      this.reset();
    });
  }

  // Insurance comparison filter functionality
  const filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', function() {
      alert('In a full implementation, this would filter the insurance plans based on your selection.');
    });
  }

  // Agent search functionality
  const agentSearchBtn = document.querySelector('.search-btn');
  if (agentSearchBtn) {
    agentSearchBtn.addEventListener('click', function() {
      alert('In a full implementation, this would search for agents in your area.');
    });
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#affiliate-link') {
      e.preventDefault();
      alert('Redirecting to affiliate application...');
      return;
    }

    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Active section indicator for navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

function setActiveSection() {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

setActiveSection();
window.addEventListener('scroll', setActiveSection);