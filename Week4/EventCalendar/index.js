const selectMonth = document.getElementById('select_Month');
const selectYear = document.getElementById('select_Year');
const tbody = document.getElementById('calData');
const allAvailable = document.getElementById('setAllAvailable');
const allUnavailable = document.getElementById('setAllUnavailable');

const initialDate = new Date();
const thisMonth = initialDate.getMonth();
const thisYear = initialDate.getFullYear();

selectMonth.value = selectMonth.children[thisMonth].value;
selectYear.value = thisYear;
updateCalendar();

selectMonth.addEventListener('change', updateCalendar);
selectYear.addEventListener('change', updateCalendar);
allAvailable.addEventListener('click', setAll);
allUnavailable.addEventListener('click', setAll);

function getSelectedMonth(el) {
  let index = 0;
  Object.entries(el.children).forEach(([key, val]) => {
    if (val.selected === true) {
      index = key;
    }
  });
  return index;
}

function updateCalendar() {
  let yearIndex = selectYear.value;
  let monthIndex = getSelectedMonth(selectMonth);
  tbody.innerHTML = '';
  drawCalendar(yearIndex, monthIndex);
}

function drawCalendar(yearIndex, monthIndex) {
  let firstDay = new Date(yearIndex, monthIndex);
  let numOfDays = daysInAMonth(yearIndex, monthIndex);
  let tr = document.createElement('tr');
  for (let i = 0; i < numOfDays + firstDay.getDay(); i++) {
    if (i % 7 === 0 && i !== 0) {
      tbody.appendChild(tr);
      tr = document.createElement('tr');
    }
    let td = document.createElement('td');
    if (i >= firstDay.getDay()) {
      td.classList.add('day');
      td.innerHTML = 1 + (i - firstDay.getDay());
      td.addEventListener('click', (e) => {
        let el = e.target;
        if (el.style.background === '') {el.style.background = 'green';} 
        else if (el.style.background === 'green') {el.style.background = 'red'} 
        else {el.style.background = '';}
      });
    }
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}

function daysInAMonth(yearIndex, monthIndex) {
  return 32 - new Date(yearIndex, monthIndex, 32).getDate();
}

function setAll(e) {
  let days = document.getElementsByClassName('day');
  for(day of days) {
    if (e.target.id === 'setAllAvailable') {
      day.style.background = 'green'
    } else {
      day.style.background = 'red';
    }
  }
}