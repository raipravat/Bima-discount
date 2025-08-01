export function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');

  function isMobileView() {
    return window.innerWidth <= 992;
  }

  function handleQuestionClick(question) {
    const targetId = question.getAttribute('data-target');

    if (isMobileView()) {
      const wasActive = question.classList.contains('active');
      const mobileAnswer = question.nextElementSibling;

      questions.forEach((q) => {
        q.classList.remove('active');
        const ans = q.nextElementSibling;
        if (ans && ans.classList.contains('mobile-answer')) {
          ans.style.maxHeight = '0';
          ans.style.padding = '0 20px';
        }
      });

      if (!wasActive) {
        question.classList.add('active');
        if (mobileAnswer && mobileAnswer.classList.contains('mobile-answer')) {
          mobileAnswer.style.maxHeight = mobileAnswer.scrollHeight + 'px';
          mobileAnswer.style.padding = '20px';
        }
      }
    } else {
      questions.forEach((q) => q.classList.remove('active'));
      question.classList.add('active');

      const answers = document.querySelectorAll('.faq-answer');
      answers.forEach((answer) => {
        answer.classList.remove('active');
        if (answer.id === targetId) {
          answer.classList.add('active');
        }
      });
    }
  }

  if (isMobileView()) {
    const answers = document.querySelectorAll('.faq-answer');
    answers.forEach((answer) => {
      const question = document.querySelector(`.faq-question[data-target="${answer.id}"]`);
      if (question) {
        const mobileAnswer = answer.cloneNode(true);
        mobileAnswer.classList.add('mobile-answer');
        mobileAnswer.style.maxHeight = '0';
        mobileAnswer.style.padding = '0 20px';
        question.insertAdjacentElement('afterend', mobileAnswer);
      }
    });
  }

  questions.forEach((question) => {
    question.addEventListener('click', () => handleQuestionClick(question));
  });

  window.addEventListener('resize', function() {
    if (isMobileView()) {
      const answers = document.querySelectorAll('.faq-answer');
      answers.forEach((answer) => {
        const question = document.querySelector(`.faq-question[data-target="${answer.id}"]`);
        if (question && !question.nextElementSibling.classList.contains('mobile-answer')) {
          const mobileAnswer = answer.cloneNode(true);
          mobileAnswer.classList.add('mobile-answer');
          mobileAnswer.style.maxHeight = '0';
          mobileAnswer.style.padding = '0 20px';
          question.insertAdjacentElement('afterend', mobileAnswer);
        }
      });
    } else {
      const mobileAnswers = document.querySelectorAll('.mobile-answer');
      mobileAnswers.forEach((answer) => answer.remove());

      if (questions.length > 0) {
        questions[0].click();
      }
    }
  });
}