import { animate } from './helpers';

const modal = () => {
  const modal = document.querySelector('.modal');
  const modalDialog = document.querySelector('.modal__dialog');
  const modalOverlay = document.querySelector('.modal__overlay');
  const btn = document.querySelector('.footer-button');

  // откртие модальног окна
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    modal.style.display = 'block';
    if (document.documentElement.clientWidth > 768) {
      animate({
        duration: 300,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          modalDialog.style.top = progress * 10 + '%';
        },
      });
    }
  });

  // закрытие мддального окна
  modalOverlay.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__dialog') || e.target.classList.contains('modal-close__image')) {
      modal.style.display = 'none';
      modal.style.top = '';
    }
  });
};

export default modal;