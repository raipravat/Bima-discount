document.addEventListener("DOMContentLoaded", function () {
  // Update the current year in the footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      mobileMenuBtn.textContent = navLinks.classList.contains("show")
        ? "✕"
        : "☰";
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#affiliate-link") {
        e.preventDefault();
        // In a real implementation, this would redirect to your affiliate link
        alert("Redirecting to affiliate application...");
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
        if (window.innerWidth <= 992) {
          navLinks.classList.remove("show");
          mobileMenuBtn.textContent = "☰";
        }
      }
    });
  });

  // Active section indicator for navigation
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links li a");

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
      }
    });
  }

  // Set initial active section and add scroll event listener
  setActiveSection();
  window.addEventListener("scroll", setActiveSection);

  // Cash back calculator functionality
  const premiumInput = document.getElementById("premium-input");
  const calculateBtn = document.getElementById("calculate-btn");
  const cashbackAmount = document.getElementById("cashback-amount");

  function calculateCashback() {
    const premium = parseFloat(premiumInput.value) || 0;
    const cashback = premium * 0.25; // 25% cash back
    cashbackAmount.textContent = `₹${cashback.toLocaleString("en-IN")}`;
  }

  calculateBtn.addEventListener("click", calculateCashback);
  premiumInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      calculateCashback();
    }
  });

  // Initialize calculator with example value
  premiumInput.value = "100000";
  calculateCashback();

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentIndex = 0;
  let interval;

  // Create navigation dots dynamically
  function createDots() {
    testimonials.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
  }

  function showTestimonial(index) {
    // Hide all testimonials with sliding out animation
    testimonials.forEach((testimonial) => {
      if (testimonial.classList.contains("active")) {
        testimonial.style.animation = "slideOut 0.5s ease forwards";
        setTimeout(() => {
          testimonial.classList.remove("active");
          testimonial.style.animation = "";
        }, 500);
      }
    });

    // Show current testimonial with sliding in animation
    setTimeout(() => {
      testimonials[index].classList.add("active");
    }, 500);

    // Update dots
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[index].classList.add("active");

    currentIndex = index;
  }

  // Initialize dots and event listeners
  function initSlider() {
    createDots();

    // Dot navigation
    dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        const index = parseInt(e.target.dataset.index);
        showTestimonial(index);
        resetInterval();
      }
    });

    showTestimonial(0);
    resetInterval();
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextTestimonial, 5000);
  }

  // Initialize slider
  initSlider();

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

  // FAQ functionality
  const questions = document.querySelectorAll(".faq-question");

  function isMobileView() {
    return window.innerWidth <= 992;
  }

  function handleQuestionClick(question) {
    const targetId = question.getAttribute("data-target");

    if (isMobileView()) {
      // Mobile behavior
      const wasActive = question.classList.contains("active");
      const mobileAnswer = question.nextElementSibling;

      // Close all questions and answers first
      questions.forEach((q) => {
        q.classList.remove("active");
        const ans = q.nextElementSibling;
        if (ans && ans.classList.contains("mobile-answer")) {
          ans.style.maxHeight = "0";
          ans.style.padding = "0 20px";
        }
      });

      // Toggle clicked question if it wasn't active
      if (!wasActive) {
        question.classList.add("active");
        if (mobileAnswer && mobileAnswer.classList.contains("mobile-answer")) {
          mobileAnswer.style.maxHeight = mobileAnswer.scrollHeight + "px";
          mobileAnswer.style.padding = "20px";
        }
      }
    } else {
      // Desktop behavior
      questions.forEach((q) => q.classList.remove("active"));
      question.classList.add("active");

      const answers = document.querySelectorAll(".faq-answer");
      answers.forEach((answer) => {
        answer.classList.remove("active");
        if (answer.id === targetId) {
          answer.classList.add("active");
        }
      });
    }
  }

  // Initialize mobile answers if in mobile view
  if (isMobileView()) {
    const answers = document.querySelectorAll(".faq-answer");
    answers.forEach((answer) => {
      const question = document.querySelector(
        `.faq-question[data-target="${answer.id}"]`
      );
      if (question) {
        const mobileAnswer = answer.cloneNode(true);
        mobileAnswer.classList.add("mobile-answer");
        mobileAnswer.style.maxHeight = "0";
        mobileAnswer.style.padding = "0 20px";
        question.insertAdjacentElement("afterend", mobileAnswer);
      }
    });
  }

  questions.forEach((question) => {
    question.addEventListener("click", () => handleQuestionClick(question));
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (isMobileView()) {
      // Switch to mobile view
      const answers = document.querySelectorAll(".faq-answer");
      answers.forEach((answer) => {
        const question = document.querySelector(
          `.faq-question[data-target="${answer.id}"]`
        );
        if (
          question &&
          !question.nextElementSibling.classList.contains("mobile-answer")
        ) {
          const mobileAnswer = answer.cloneNode(true);
          mobileAnswer.classList.add("mobile-answer");
          mobileAnswer.style.maxHeight = "0";
          mobileAnswer.style.padding = "0 20px";
          question.insertAdjacentElement("afterend", mobileAnswer);
        }
      });
    } else {
      // Switch to desktop view
      const mobileAnswers = document.querySelectorAll(".mobile-answer");
      mobileAnswers.forEach((answer) => answer.remove());

      // Activate first question
      if (questions.length > 0) {
        questions[0].click();
      }
    }
  });

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

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  // Update countdown every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animation for stats counter
  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");

    statNumbers.forEach((statNumber) => {
      if (!statNumber.dataset.animated) {
        const originalText = statNumber.textContent;

        // Extract components from the original text
        const match = originalText.match(/^([\d.]+)(.*)$/);
        if (!match) return;

        const targetNumber = parseFloat(match[1].replace(/,/g, ""));
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
            statNumber.textContent =
              displayNumber.toLocaleString("en-IN") + suffix;
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

  // Chat widget functionality
  const chatWidget = document.querySelector(".chat-widget");
  const chatToggle = document.querySelector(".chat-toggle");
  const chatClose = document.querySelector(".chat-close");

  if (chatWidget && chatToggle && chatClose) {
    // Show chat widget after delay
    setTimeout(() => {
      chatWidget.classList.add("open");
      chatToggle.classList.add("hide");
    }, 10000);

    // Toggle chat widget
    chatToggle.addEventListener("click", () => {
      chatWidget.classList.add("open");
      chatToggle.classList.add("hide");
    });

    // Close chat widget
    chatClose.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling
      chatWidget.classList.remove("open");
      chatToggle.classList.remove("hide");
    });

    // Close when clicking outside (optional)
    document.addEventListener("click", (e) => {
      if (!chatWidget.contains(e.target) && e.target !== chatToggle) {
        chatWidget.classList.remove("open");
        chatToggle.classList.remove("hide");
      }
    });

    // Chat options
    const chatOptions = document.querySelectorAll(".chat-option");
    chatOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Your chat option functionality
        alert(
          "This feature would connect you to a live agent in the full implementation."
        );
      });
    });
  }

  // Lead form submission
  const leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Thank you! We'll contact you shortly with your cash back estimate."
      );
      this.reset();
    });
  }

  // Insurance comparison filter functionality
  const filterBtn = document.querySelector(".filter-btn");
  if (filterBtn) {
    filterBtn.addEventListener("click", function () {
      alert(
        "In a full implementation, this would filter the insurance plans based on your selection."
      );
    });
  }

  // Agent search functionality
  const agentSearchBtn = document.querySelector(".search-btn");
  if (agentSearchBtn) {
    agentSearchBtn.addEventListener("click", function () {
      alert(
        "In a full implementation, this would search for agents in your area."
      );
    });
  }
});

// Blogger Feed Integration
document.addEventListener("DOMContentLoaded", function() {
    // Configuration
    const BLOG_URL = 'https://blog.prabhat.info.np';
    const POSTS_TO_SHOW = 3;
    const EXCERPT_LENGTH = 120;
    
    async function fetchBlogPosts() {
        try {
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
                month: 'short', 
                day: 'numeric'
            });
            
            const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : 'images/blog-placeholder.jpg';
            
            html += `
                <div class="blogs-card">
                    <div class="blogs-image">
                        <img src="${imageUrl}" alt="${title}" loading="lazy">
                    </div>
                    <div class="blogs-content">
                        <h3>${title}</h3>
                        <p class="post-excerpt">${excerpt}</p>
                        <div class="blogs-footer">
                            <div class="blogs-tech">
                                <i class="far fa-calendar-alt"></i>
                                <span>${date}</span>
                            </div>
                            <a href="${url}" class="blogs-link" target="_blank" rel="noopener">
                                Read More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    fetchBlogPosts();
});