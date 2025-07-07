 document.addEventListener('DOMContentLoaded', function() {
            // Animate stats counter
            function animateValue(id, start, end, duration) {
                const obj = document.getElementById(id);
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const value = Math.floor(progress * (end - start) + start);
                    obj.innerHTML = value.toLocaleString() + '+';
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }
            
            animateValue("happy-families", 0, 12000, 2000);
            
            // Testimonial slider
            const testimonials = [
                {
                    text: "I was skeptical at first, but receiving $1,250 back on my $5,000 premium was incredible. The process was seamless and I got the exact same policy I would have gotten directly from the insurer.",
                    author: "Michael T.",
                    role: "Dallas, TX"
                },
                {
                    text: "As a financial advisor, I recommend all my clients use this cash back program. It's essentially free money for the same coverage they need anyway.",
                    author: "Sarah K.",
                    role: "Certified Financial Planner"
                },
                {
                    text: "We used our $850 cash back to take a family vacation. It felt like getting rewarded for being responsible about our family's future.",
                    author: "James & Lisa W.",
                    role: "Chicago, IL"
                }
            ];
            
            let currentTestimonial = 0;
            const testimonialElement = document.querySelector('.testimonial');
            
            function showTestimonial(index) {
                const testimonial = testimonials[index];
                testimonialElement.innerHTML = `
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        ${testimonial.author} <span class="author-role">${testimonial.role}</span>
                    </div>
                `;
            }
            
            function nextTestimonial() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }
            
            showTestimonial(0);
            setInterval(nextTestimonial, 5000);
            
            // FAQ accordion
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                    
                    // Close other open items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            });
            
            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#affiliate-link') {
                        // This would be your actual affiliate link
                        e.preventDefault();
                        alert('This would redirect to your affiliate link. Replace #affiliate-link with your actual link in the HTML.');
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
            
            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                });
                
                // Close menu when clicking on a link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.style.display = 'none';
                    });
                });
            }
            
            // Countdown timer
            function updateCountdown() {
                const now = new Date();
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                
                const diff = endOfDay - now;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                document.querySelector('.hero p').innerHTML = 
                    `Secure your family's future while putting money back in your pocket. Our exclusive program gives you cash rewards when you purchase through our link. <strong>Offer expires in ${hours}h ${minutes}m ${seconds}s!</strong>`;
            }
            
            setInterval(updateCountdown, 1000);
            updateCountdown();
        });