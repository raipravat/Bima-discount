document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Highlight first link on page load if at top
  if (window.scrollY === 0) {
    document
      .querySelector('.nav-links a[href="#hero"]')
      .classList.add("active");
  }

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    mobileMenuBtn.textContent = navLinks.classList.contains("show") ? "✕" : "☰";
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#affiliate-link") {
      e.preventDefault();
      alert(
        "This would redirect to your affiliate link. Replace #affiliate-link with your actual link in the HTML."
      );
      return;
    }

    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu after click
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("show");
        mobileMenuBtn.textContent = "☰";
      }
    }
  });
});

// Active section indicator for navigation
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");
const activeIndicator = document.querySelector(".active-indicator");

function setActiveSection() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  // Update navigation links
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");

      // Update indicator position
      const activeItem = item.parentElement;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;

      if (activeIndicator) {
        activeIndicator.style.width = `${itemWidth}px`;
        activeIndicator.style.left = `${itemLeft}px`;
        activeIndicator.style.opacity = "1";
      }
    }
  });

  // Hide indicator if no active section
  if (!currentSection && activeIndicator) {
    activeIndicator.style.opacity = "0";
  }
}

// Testimonial Slider
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let interval;

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    // Show current testimonial
    testimonials[index].classList.add("active");

    // Update dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[index].classList.add("active");

    currentIndex = index;
  }

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showTestimonial(index);
      resetInterval();
    });
  });

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextTestimonial, 5000);
  }

  // Initialize
  showTestimonial(0);
  resetInterval();

  // Pause on hover
  const sliderContainer = document.querySelector(".testimonial-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(interval);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      resetInterval();
    });
  }
});

// FAQ accordion functionality
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");

    // Close other open items
    faqQuestions.forEach((q) => {
      if (q !== question) {
        q.parentElement.classList.remove("active");
      }
    });
  });
});

// Set initial active section and add scroll event listener
setActiveSection();
window.addEventListener("scroll", setActiveSection);

// Animation for stats counter
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach((statNumber) => {
    if (!statNumber.dataset.animated) {
      let originalText = statNumber.textContent;
      let target = 0;
      let suffix = "";
      let isLakh = false;
      
      // Extract numeric value and any suffix
      const matches = originalText.match(/([\d.]+)(.*)/);
      if (matches) {
        target = parseFloat(matches[1]);
        suffix = matches[2] || "";
        isLakh = originalText.includes("Lakh");
      }
      
      let current = 0;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
          statNumber.dataset.animated = true;
          statNumber.textContent = originalText;
        } else {
          // For Lakh values, show increasing number with Lakh+ throughout
          if (isLakh) {
            statNumber.textContent = Math.floor(current) + " Lakh+";
          } 
          // For decimal numbers (like 4.5/5)
          else if (originalText.includes(".")) {
            statNumber.textContent = current.toFixed(1) + suffix.replace(/^[^a-zA-Z]*/, '');
          } 
          // For regular numbers
          else {
            statNumber.textContent = Math.floor(current) + suffix;
          }
        }
      }, 20);
    }
  });
}


// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stats")) {
          animateStats();
        }
        entry.target.classList.add("animated");
      }
    });
  },
  { threshold: 0.1 }
);

// Observe the stats section
const statsSection = document.querySelector(".stats");
if (statsSection) {
  observer.observe(statsSection);
}


// Scroll to top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const scrollPercentage = document.getElementById("scrollPercentage");

function toggleScrollToTopButton() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }

  // Calculate scroll percentage
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / scrollHeight) * 100;
  scrollPercentage.textContent = Math.round(scrolled) + "%";
}

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", toggleScrollToTopButton);
