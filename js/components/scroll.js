export function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const scrollPercentage = document.getElementById('scrollPercentage');

  function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }

    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;
    scrollPercentage.textContent = Math.round(scrolled) + '%';
  }

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', toggleScrollToTopButton);
  }
}