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
const indicatorDots = document.querySelectorAll(".current-section-indicator a");
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

  // Update indicator dots
  indicatorDots.forEach((dot) => {
    dot.classList.remove("active");
    if (dot.getAttribute("href") === `#${currentSection}`) {
      dot.classList.add("active");
    }
  });

  // Hide indicator if no active section
  if (!currentSection && activeIndicator) {
    activeIndicator.style.opacity = "0";
  }
}

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
  const statNumber = document.getElementById("happy-families");
  if (statNumber && !statNumber.dataset.animated) {
    const target = parseInt(statNumber.textContent.replace("+", ""));
    let current = 0;
    const increment = target / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
        statNumber.dataset.animated = true;
      }
      statNumber.textContent = Math.floor(current) + "+";
    }, 20);
  }
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

// Observe sections that should be animated
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
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
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (window.pageYOffset / scrollHeight) * 100;
          scrollPercentage.textContent = Math.round(scrolled) + "%";
        }
        
        scrollToTopBtn.addEventListener("click", function() {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        });
        
        window.addEventListener("scroll", toggleScrollToTopButton);
        
        // Smooth scroll for anchor links with offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href") !== "#") {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute("href"));
              if (target) {
                const headerHeight = 190; // Adjusted for fixed header
                window.scrollTo({
                  top: target.offsetTop - headerHeight,
                  behavior: "smooth",
                });
              }
            }
          });
        });
// Initialize scroll to top button visibility