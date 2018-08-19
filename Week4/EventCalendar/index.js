const selectMonth = document.getElementById('select_Month');
const selectYear = document.getElementById('select_Year');

selectMonth.addEventListener('change', getSelected);

function getSelected(e) {
  let el = e.target;
  Object.entries(el.children).forEach(([key, val]) => {
    if (val.selected === true) {
      console.log(key);
    }
  });
}