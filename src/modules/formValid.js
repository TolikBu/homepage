const formValid = () => {
  const form = document.querySelector('.modal-form');
  const inputName = document.querySelector('[name="fio"]');
  const inputEmail = document.querySelector('[name="email"]');

  // валидация имя 
  inputName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^а-яА-Яa-zA-Z\s]/gi, '');
  });
  // заменя маленьких букв при потере фокус с инпута с именем
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
  //валидация email инпута
  inputEmail.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9\@\-\_\.\~\!\*\']/gi, '');
  });
};

export default formValid;
