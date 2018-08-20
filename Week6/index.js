fetch('http://ict.neit.edu/evanrense/salaries.php')
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Network broke');
    }
  }).then((myJson) => {
    console.log(myJson);
  }).catch((err) => {
    console.log(err);
  })

