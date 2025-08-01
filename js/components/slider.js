export function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentIndex = 0;
  let interval;

  function createDots() {
    testimonials.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
  }

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      if (testimonial.classList.contains('active')) {
        testimonial.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
          testimonial.classList.remove('active');
          testimonial.style.animation = '';
        }, 500);
      }
    });

    setTimeout(() => {
      testimonials[index].classList.add('active');
    }, 500);

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => dot.classList.remove('active'));
    dots[index].classList.add('active');

    currentIndex = index;
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextTestimonial, 5000);
  }

  function initSlider() {
    createDots();

    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot')) {
        const index = parseInt(e.target.dataset.index);
        showTestimonial(index);
        resetInterval();
      }
    });

    showTestimonial(0);
    resetInterval();
  }

  const sliderContainer = document.querySelector('.testimonial-slider');
  if (sliderContainer && testimonials.length > 0) {
    initSlider();

    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      resetInterval();
    });
  }
}