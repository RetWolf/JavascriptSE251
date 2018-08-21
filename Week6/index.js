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
  console.log(result);
  console.log(dbAnalyst.children);
  Object.entries(dbAnalyst.children).forEach(([key, val]) => {
    if (key > 0) {
      val.insertAdjacentHTML('beforeend', Object.values(result[0])[key]);
    } else {
      val.innerHTML = Object.values(result[0])[key];
    }
  });
}

function parseData(data) {
  let numOfDBAnalysts = 0;
  let numOfWebDevs = 0;
  let numOfSoftwareDevs = 0;
  let dbAnalystTotal = 0;
  let webDevTotal = 0;
  let softwareDevTotal = 0;

  let people = [];

  data.forEach(el => {
    if (el.jobTitle === 'Database Analyst') {
      numOfDBAnalysts++;
      dbAnalystTotal += Number(el.salary);
      if (people[0] == null || el.salary > people[0].salary) {
        people[0] = {
          type: el.jobTitle,
          fname: el.name.first,
          lname: el.name.last,
          salary: Number(el.salary).toFixed(2),
        };
      }
    } else if (el.jobTitle === 'Web Developer') {
      numOfWebDevs++;
      webDevTotal += Number(el.salary);
      if (people[1] == null || el.salary > people[1].salary) {
        people[1] = {
          type: el.jobTitle,
          salary: Number(el.salary).toFixed(2),
          fname: el.name.first,
          lname: el.name.last
        };
      }
    } else if (el.jobTitle === 'Software Developer') {
      numOfSoftwareDevs++;
      softwareDevTotal += Number(el.salary);
      if (people[2] == null || el.salary > people[2].salary) {
        people[2] = {
          type: el.jobTitle,
          salary: Number(el.salary).toFixed(2),
          fname: el.name.first,
          lname: el.name.last
        };
      }
    } else {
      console.log('Job Title didn\'t match');
    }
  });
  people[0].averageSalary = Number(dbAnalystTotal / numOfDBAnalysts).toFixed(2);
  people[1].averageSalary = Number(webDevTotal / numOfWebDevs).toFixed(2);
  people[2].averageSalary = Number(softwareDevTotal / numOfSoftwareDevs).toFixed(2);
  return people;
}

showData();