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
      const originalText = statNumber.textContent;

      // Extract components from the original text
      const match = originalText.match(/^([\d.]+)(.*)$/);
      if (!match) return;

      const targetNumber = parseFloat(match[1]);
      const suffix = match[2] || "";

      let current = 0;
      const increment = targetNumber / 100; // Controls animation speed
      const isDecimal = originalText.includes(".");

      const timer = setInterval(() => {
        current += increment;

        if (current >= targetNumber) {
          clearInterval(timer);
          statNumber.textContent = originalText; // Show exact original text
          statNumber.dataset.animated = true;
        } else {
          // Format the currently animating number
          let displayNumber;
          if (isDecimal) {
            displayNumber = current.toFixed(1); // For decimals like 4.5/5
          } else {
            displayNumber = Math.floor(current); // For whole numbers
          }
          statNumber.textContent = displayNumber + suffix; // Keep suffix during animation
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
        observer.unobserve(entry.target); // Stop observing after triggering
      }
    });
  },
  { threshold: 0.1 }
);

// Start observing the stats section
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

// Blogger Feed Integration
document.addEventListener("DOMContentLoaded", function() {
    // Configuration - Replace with your blog details
    const BLOG_URL = 'https://blog.prabhat.info.np';
    const POSTS_TO_SHOW = 3; // Number of posts to display
    const EXCERPT_LENGTH = 120; // Character length for excerpts
    
    async function fetchBlogPosts() {
        try {
            // Using JSONP approach to avoid CORS issues
            const callbackName = 'handleBloggerResponse' + Date.now();
            window[callbackName] = function(data) {
                displayPosts(data.feed.entry);
                delete window[callbackName];
            };
            
            const script = document.createElement('script');
            script.src = `${BLOG_URL}/feeds/posts/default?alt=json-in-script&callback=${callbackName}`;
            script.onerror = () => {
                document.getElementById('blog-posts').innerHTML = `
                    <div class="error" style="text-align:center; padding:40px; color:#e74c3c;">
                        Could not load blog posts. 
                        <a href="${BLOG_URL}" style="color:#3498db;">Visit blog directly</a>
                    </div>`;
            };
            document.head.appendChild(script);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }
    
    function displayPosts(posts) {
        const container = document.getElementById('blog-posts');
        
        if (!posts || posts.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:40px;">No posts found.</div>';
            return;
        }
        
        let html = '';
        posts.slice(0, POSTS_TO_SHOW).forEach(post => {
            const title = post.title.$t;
            const fullContent = post.content.$t;
            const excerpt = stripHtml(fullContent).substring(0, EXCERPT_LENGTH) + '...';
            const url = post.link.find(link => link.rel === 'alternate').href;
            const date = new Date(post.published.$t).toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });
            
            // Try to find the first image in the post
            const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : null;
            
            html += `
                <div class="project-card">
                    ${imageUrl ? `
                    <div class="blogs-image">
                        <img src="${imageUrl}" alt="${title}" loading="lazy">
                    </div>
                    ` : ''}
                    <div class="blogs-content">
                        <h3>${title}</h3>
                        <p class="post-excerpt">${excerpt}</p>
                        <div class="project-tech">
                            <span>${date}</span>
                        </div>
                        <a href="${url}" class="project-link" target="_blank" rel="noopener">Read Post</a>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Helper function to remove HTML tags
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    // Load posts when page is ready
    fetchBlogPosts();
});
