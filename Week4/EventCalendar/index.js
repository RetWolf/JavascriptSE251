const selectMonth = document.getElementById('select_Month');
const selectYear = document.getElementById('select_Year');
const tbody = document.getElementById('calData');

const initialDate = new Date();
const thisMonth = initialDate.getMonth();
const thisYear = initialDate.getFullYear();

selectMonth.value = selectMonth.children[thisMonth].value;
selectYear.value = thisYear;
updateCalendar();

selectMonth.addEventListener('change', updateCalendar);
selectYear.addEventListener('change', updateCalendar);

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
      td.innerHTML = 1 + (i - firstDay.getDay());
    }
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}

function daysInAMonth(yearIndex, monthIndex) {
  return 32 - new Date(yearIndex, monthIndex, 32).getDate();
}