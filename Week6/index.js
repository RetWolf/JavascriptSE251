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

function parseData(data) {
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

showData();