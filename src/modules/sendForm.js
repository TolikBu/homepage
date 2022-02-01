const sendForm = () => {
  const form = document.getElementById('modal-form');
  const statusBlock = document.createElement('div');
  const textArea = document.querySelector('.modal-form__input--mess');
  const loadText = 'Загрузка...';
  const errorText = 'Ошибка...';
  const successText = 'Наш менеджер с вами свяжется!';

  statusBlock.style.color = 'green';
  statusBlock.style.marginTop = '20px';
  statusBlock.style.fontSize = '20px';

  let formElements = form.querySelectorAll('input');

  // функция валидация при отправке формы
  const validate = (list) => {
    let success = true;

    list.forEach((inputs) => {
      formElements = form.querySelectorAll('input');
      let reg = /^([A-Za-z0-9_\-\.\_\~\!\*\'])+\@([A-Za-z0-9_\-\_\.\~\!\*\'])+\.([A-Za-z]{2,4})$/gi;

      if (inputs.classList.contains('success')) {
        success = false;
      }

      if (formElements[0].value.length < 3) {
        success = false;
      } else if (reg.test(formElements[1].value) == false) {
        success = false;
      }
    });

    return success;
  };

  // функция принимающая данные из формы 
  const sendData = (data) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };

  // функция отправки формы
  const submitForm = () => {
    formElements = form.querySelectorAll('input');

    const formData = new FormData(form);
    const formBody = {};
    //добавление блока с сообщение об отправке формы
    statusBlock.textContent = loadText;
    form.append(statusBlock);

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    // вывод разных сообщений при отправке формы либо о не правильной валидации
    if (validate(formElements)) {
      sendData(formBody)
        .then((data) => {
          statusBlock.textContent = successText;
          setInterval(() => {
            statusBlock.remove(form);
          }, 2000);

          formElements.forEach((input) => {
            input.value = '';
          });
          textArea.value = '';
          return;
        })
        .catch((error) => {
          statusBlock.textContent = errorText;
          setInterval(() => {
            statusBlock.remove(form);
          }, 1000);
        });
    } else {
      alert('Данные не валидны: имя должно быть не короче 3 симвовлов, E-mail в формате xxxx@yyyy.zzz');
      statusBlock.textContent = errorText;
      return;
    }
  };
 // проверка если форму случайно удалили другой разработчик 
  try {
    if (!form) {
      throw new Error('Верните форму на место');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      submitForm();
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default sendForm;
