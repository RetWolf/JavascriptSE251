let dataInput = document.querySelector('#form1 > input[type="text"]');
let saveBtn = document.querySelector('#form1 > input[value="save"]');
let deleteBtn = document.querySelector('#form1 > input[value="delete"]');
let resultsDiv = document.getElementById('results');

saveBtn.addEventListener('click', saveData);
deleteBtn.addEventListener('click', deleteData);

function saveData(e) {
  localStorage.setItem('name', dataInput.value);
}

function deleteData(e) {

}

if (typeof(Storage) !== undefined) {
  saveBtn.addEventListener('click', saveData);
  deleteBtn.addEventListener('click', deleteData);

  function saveData(e) {
    localStorage.setItem('name', dataInput.value);
  }

  function deleteData(e) {
    localStorage.removeItem('name');
  }
} else {
  console.info('No storage');
}