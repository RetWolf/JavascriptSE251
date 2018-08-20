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
  drawCalendar(yearIndex, monthIndex);
}

function drawCalendar(yearIndex, monthIndex) {
  let date1 = new Date(yearIndex, monthIndex);
  let numOfDays = daysInAMonth(yearIndex, monthIndex);
  console.log(date1);
  // Working here on figuring out how to best draw the dates into the table
}

function daysInAMonth(yearIndex, monthIndex) {
  return 32 - new Date(yearIndex, monthIndex, 32).getDate();
}