const getData = async () => {
  if (localStorage.getItem('data') !== null) {
    console.info('Loaded from LocalStorage');
    return await JSON.parse(localStorage.getItem('data'));
  } else {
    try {
      let res = await fetch('http://ict.neit.edu/evanrense/salaries.php');
      console.info('Fetched Data');
      let data =  await res.json();
      localStorage.setItem('data', JSON.stringify(data));
      return data;
    } catch (err) {
      console.error(err);
    }
  }
};

const showData = async () => {
  const dbAnalyst = document.getElementById('dbAnalyst');
  const webDev = document.getElementById('webDev');
  const softwareDev = document.getElementById('softwareDev');
  let data = await getData();
  let result = parseData(data);
  let options = [dbAnalyst.children, webDev.children, softwareDev.children];
  for (let i = 0; i < options.length; i++) {
    const obj = options[i];
    Object.entries(obj).forEach(([key, val]) => {
      if (key > 0) {
        val.insertAdjacentHTML('beforeend', Object.values(result[i])[key]);
      } else {
        val.innerHTML = Object.values(result[i])[key];
      }
    });
  }
}

const liveSearch = async (e) => {
  const resultsDiv = document.getElementById('liveSearchResults');
  resultsDiv.innerHTML = '';
  const searchName = e.target.value;
  if (searchName !== '') {
    const searchRegex = new RegExp(`^${searchName}`, 'gi');
    let data = await getData();
    let results = [];
    data.forEach(person => {
      let fname = person.name.first;
      let lname = person.name.last;
      let fullName = `${person.name.first} ${person.name.last}`;
      if (fname.search(searchRegex) === 0 || lname.search(searchRegex) === 0 || fullName.search(searchRegex) === 0) {
        let result = {
          name: fullName,
          type: person.jobTitle,
          dist: 0
        };
        results.push(result);
      }
    });
    results.forEach(result => {
      result.dist = getEditDistance(result.name, searchName)
    })
    results.sort(compare);
    console.log(results);
    for (let i = 0; i < 5; i++) {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.innerHTML = results[i].name;
      div.appendChild(p)
      resultsDiv.appendChild(div);
    }
  }
}

document.getElementById('fullName').addEventListener('keyup', liveSearch);

const searchPerson = async () => {
  const fullName = document.getElementById('fullName');
  const resultsDiv = document.getElementById('search_Results');
  const liveSearchResults = document.getElementById('liveSearchResults');
  liveSearchResults.innerHTML = '';
  resultsDiv.innerHTML = '';
  let data = await getData();
  let resultPerson = {};
  data.forEach(person => {
    if ((`${person.name.first} ${person.name.last}`) === fullName.value) {
      resultPerson = person;
    }
  });
  if (resultPerson.name !== undefined) {
    Object.entries(resultPerson).forEach(([key, val]) => {
      let h3 = document.createElement('h3');
      if (key === 'name') {
        h3.innerHTML = `Name: ${val.first} ${val.last}`;
      } else if (key === 'salary') {
        h3.innerHTML = `Salary: $${Number(val).toFixed(2)}`;
      } else {
        h3.innerHTML= `Job Title: ${val}`;
      }
      resultsDiv.appendChild(h3);
    });
  } else {
    let h3 = document.createElement('h3');
    h3.innerHTML = 'No person found with that name.';
    resultsDiv.appendChild(h3);
  }
}

document.getElementById('search_Person').addEventListener('click', searchPerson);

const listResults = async (e) => {
  const listDiv = document.getElementById('list_Results');
  listDiv.innerHTML = '';
  let index = 0;
  if (e.target.id === 'listDBAnalysts') { index = 0 }
  else if (e.target.id === 'listWebDevs') { index = 1 }
  else { index = 2 }

  let data = await getData();
  let jobs = ['Database Analyst', 'Web Developer', 'Software Developer'];
  let titles = ['Name', 'Salary', 'Job Title'];

  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  for (let i = 0; i < titles.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = titles[i];
    thead.appendChild(th);
  }
  table.appendChild(thead);
  
  for (person of data) {
    if (person.jobTitle === jobs[index]) {
      let tr = document.createElement('tr');
      Object.entries(person).forEach(([key, val]) => {
        let td = document.createElement('td');
        if (key === 'name') {
          td.innerHTML = `${val.first} ${val.last}`
        } else if (key === 'salary') {
          td.innerHTML = `$${Number(val).toFixed(2)}`
        } else {
          td.innerHTML = val
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
  }
  table.appendChild(tbody);
  listDiv.appendChild(table);
}

document.getElementById('listDBAnalysts').addEventListener('click', listResults);
document.getElementById('listWebDevs').addEventListener('click', listResults);
document.getElementById('listSoftwareDevs').addEventListener('click', listResults);

function parseData (data) {
  let numOfDBAnalysts = 0;
  let numOfWebDevs = 0;
  let numOfSoftwareDevs = 0;
  let dbAnalystTotal = 0;
  let webDevTotal = 0;
  let softwareDevTotal = 0;

  let people = [];
  let index = 0;
  data.forEach(el => {
    if (el.jobTitle === 'Database Analyst') {
      numOfDBAnalysts++;
      dbAnalystTotal += Number(el.salary);
      index = 0;
    } else if (el.jobTitle === 'Web Developer') {
      numOfWebDevs++;
      webDevTotal += Number(el.salary);
      index = 1;
    } else if (el.jobTitle === 'Software Developer') {
      numOfSoftwareDevs++;
      softwareDevTotal += Number(el.salary);
      index = 2;
    } else {
      console.log('Job Title didn\'t match');
    }
    if (people[index] == null || el.salary > people[index].salary) {
      people[index] = {
        type: el.jobTitle,
        fname: el.name.first,
        lname: el.name.last,
        salary: Number(el.salary).toFixed(2)
      };
    }
  });
  people[0].averageSalary = Number(dbAnalystTotal / numOfDBAnalysts).toFixed(2);
  people[1].averageSalary = Number(webDevTotal / numOfWebDevs).toFixed(2);
  people[2].averageSalary = Number(softwareDevTotal / numOfSoftwareDevs).toFixed(2);
  return people;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showData)
} else {
  showData();
}

function getEditDistance (a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) === a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // Substitution
                       Math.min(matrix[i][j-1] + 1, // Insertion
                       matrix[i-1][j] + 1)); // Deletion
      }
    }
  }
  return matrix[b.length][a.length];
}

function compare(a, b) {
  if (a.dist < b.dist) {
    return -1;
  }
  if (a.dist > b.dist) {
    return 1;
  }
  return 0;
}