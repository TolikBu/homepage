const formValid = () => {
  const form = document.querySelector('.modal-form');
  const inputName = document.querySelector('[name="fio"]');
  const inputEmail = document.querySelector('[name="email"]');

  inputName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^а-яА-Яa-zA-Z\s]/gi, '');
  });

  inputName.addEventListener('blur', (e) => {
    e.target.value = e.target.value.trim();

    if (e.target.classList.contains('required') && e.target.value) {
      e.target.value = e.target.value
        .split(/\ +/)
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    e.target.value = e.target.value;
  });

  inputEmail.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9\@\-\_\.\~\!\*\']/gi, '');
  });
};

export default formValid;
