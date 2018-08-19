const selectMonth = document.getElementById('select_Month');
const selectYear = document.getElementById('select_Year');

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
  console.log(numOfDays);
}

function daysInAMonth(yearIndex, monthIndex) {
  return 32 - new Date(yearIndex, monthIndex, 32).getDate();
}