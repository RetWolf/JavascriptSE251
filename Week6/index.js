const getData = async () => {
  try {
    let res = await fetch('http://ict.neit.edu/evanrense/salaries.php');
    return await res.json();
  } catch (err) {
    console.error(err);
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

const searchPerson = async () => {
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const resultsDiv = document.getElementById('search_Results');
  resultsDiv.innerHTML = '';
  let data = await getData();
  let resultPerson = {};
  data.forEach(person => {
    if ((`${person.name.first} ${person.name.last}`) === (`${fname.value} ${lname.value}`)) {
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