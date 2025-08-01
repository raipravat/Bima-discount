export function initChatWidget() {
  const chatWidget = document.querySelector('.chat-widget');
  const chatToggle = document.querySelector('.chat-toggle');
  const chatClose = document.querySelector('.chat-close');

  if (chatWidget && chatToggle && chatClose) {
    setTimeout(() => {
      chatWidget.classList.add('open');
      chatToggle.classList.add('hide');
    }, 10000);

    chatToggle.addEventListener('click', () => {
      chatWidget.classList.add('open');
      chatToggle.classList.add('hide');
    });

    chatClose.addEventListener('click', (e) => {
      e.stopPropagation();
      chatWidget.classList.remove('open');
      chatToggle.classList.remove('hide');
    });

    document.addEventListener('click', (e) => {
      if (!chatWidget.contains(e.target) && e.target !== chatToggle) {
        chatWidget.classList.remove('open');
        chatToggle.classList.remove('hide');
      }
    });

    const chatOptions = document.querySelectorAll('.chat-option');
    chatOptions.forEach((option) => {
      option.addEventListener('click', () => {
        alert('This feature would connect you to a live agent in the full implementation.');
      });
    });
  }
}