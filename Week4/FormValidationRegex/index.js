const inputs = document.querySelectorAll('input');
const form = document.querySelector('#form');
const confirmation = document.querySelector('#confirmation');
const fname = document.querySelector('#firstName');
const lname = document.querySelector('#lastName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phoneNumber');
const fn_Message = document.getElementById('fn_Message');
const ln_Message = document.getElementById('ln_Message');
const email_Message = document.getElementById('email_Message');
const emailConfirmation_Message = document.getElementById('emailConfirmation_Message');
const phone_Message = document.getElementById('phone_Message');

inputs.forEach(input => {
  if (input.type === 'text') {
    input.addEventListener('blur', formValidation);
  } else {
    input.addEventListener('click', formConfirmation);
  }
});

function formValidation(event) {
  let el = event.target;
  let i = assignIndex(el.id);
  let regexChecks = [
    /^[a-z ,.'-]+$/i,
    /^[a-z ,.'-]+$/i,
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  ];
  let errMessages = [
    "Please enter a first name.",
    "Please enter a last name.",
    "Please enter a valid email.",
    "Please make sure your emails match.",
    "Please enter a valid phone number.",
    "Your name must not include any special characters."
  ];

  if(el.value === '') {
    setError(el);
    setErrMessage(el.id, errMessages[i])
  } else if (!regexChecks[i].test(el.value)) {
    setError(el);
    if (i < 2) {
      setErrMessage(el.id, errMessages[5])
    } else {
      setErrMessage(el.id, errMessages[i])
    }
  } else {
    if (el.id === 'emailConfirmation') {
      if (el.value !== inputs[2].value) {
        setError(el);
        setErrMessage(el.id, errMessages[i]);
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
  el.parentElement.children[2].style.display = 'none';
}

function formConfirmation() {
  if (!hasErrors()) {
    let person = {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      phone: phone.value 
    }
    form.style.display = 'none';
    confirmation.style.display = 'block';
    confirmation.appendChild(document.createElement('section'));
    let sec = document.querySelector('section');
    sec.innerHTML += `<p>${person.fname} ${person.lname}</p>`;
    sec.innerHTML += `<p>${person.email}</p>`;
    sec.innerHTML += `<p>${person.phone}</p>`; 
  }
}

const assignIndex = (id) => {
  switch (id) {
    case 'firstName':
      return 0;
    case 'lastName':
      return 1;
    case 'email':
      return 2;
    case 'emailConfirmation':
      return 3;
    case 'phoneNumber':
      return 4;
    default:
      return 0;
  }
}

const setErrMessage = (id, message) => {
  switch (id) {
    case 'firstName':
      fn_Message.style.display = "block";
      fn_Message.innerText = `Error: ${message}`;
      break;
    case 'lastName':
      ln_Message.style.display = "block";
      ln_Message.innerHTML = `Error: ${message}`;
      break;
    case 'email':
      email_Message.style.display = "block";
      email_Message.innerHTML = `Error: ${message}`;
      break;
    case 'emailConfirmation':
      emailConfirmation_Message.style.display = "block";
      emailConfirmation_Message.innerHTML = `Error: ${message}`;
      break;
    case 'phoneNumber':
      phone_Message.style.display = "block";
      phone_Message.innerHTML = `Error: ${message}`;
      break;
    default:
      break;
  }
}

const hasErrors = () => {
  let i = 0;
  inputs.forEach(input => {
   if(input.style.color === 'red') {
     i++;
   }
  })
  if (i < 1) {
    return false;
  } else {
    return true;
  }
}