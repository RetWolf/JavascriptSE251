const inputs = document.querySelectorAll('input');
const form = document.querySelector('#form');
const confirmation = document.querySelector('#confirmation');
const fname = document.querySelector('#firstName');
const lname = document.querySelector('#lastName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phoneNumber');

inputs.forEach(input => {
  if (input.type === 'text') {
    input.addEventListener('blur', formValidation);
  } else {
    input.addEventListener('click', formConfirmation);
  }
});

function formValidation(event) {
  let el = event.target;
  if (el.value === '') {
    setError(el);
  } else {
    if (el.id === 'emailConfirmation') {
      if (el.value !== inputs[2].value) {
        setError(el);
      } else {
        removeError(el);
      }
    } else {
      removeError(el);
    }
  }
}

const setError = (el) => {
  el.style.color = 'red';
  el.parentElement.className = 'red';
  el.nextElementSibling.innerHTML = '*';
}

const removeError = (el) => {
  el.style.color = 'black';
  el.parentElement.className = '';
  el.nextElementSibling.innerHTML = '';
}

function formConfirmation() {
  form.style.display = 'none';
  confirmation.style.display = 'block';
  confirmation.appendChild(document.createElement('section'));
  let sec = document.querySelector('section');
  sec.innerHTML += `<p>${fname.value} ${lname.value}</p>`;
  sec.innerHTML += `<p>${email.value}</p>`;
  sec.innerHTML += `<p>${phone.value}</p>`;
}