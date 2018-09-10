
let people =[
  {first:"Jason", last:"Vorhees", credit:"Friday the 13th"},
  {first:"Freddy", last:"Krueger", credit:"A Nightmare on Elm Street" },
  {first:"Roger", last:"Rabbit", credit:"Who Framed Roger Rabbit" },
  {first:"Kevin", last:"McCallister", credit:"Home Alone" },
  {first:"Godzilla", last:"King of The Monsters", credit:"Godzilla" },
  {first:"Buzz", last:"Lightyear", credit:"Toy Story" },
  {first:"Marion", last:"Cobretti", credit:"Cobra" }
];

/* for (let i = 0; i < people.length; i++) {
  let body = document.querySelector('body');
  let tempDiv = document.createElement('div');
  
  body.appendChild(tempDiv);
  
  for (const key in people[i]) {
    let p = document.createElement('p');
    let val = document.createTextNode(people[i][key]);

    tempDiv.appendChild(p);
    p.appendChild(val);
  }

  tempDiv.setAttribute('id', String(i));
  tempDiv.className = 'border';
} */

const body = document.querySelector('body');

let str = '';

for (let i = 0; i < people.length; i++) {
  str += `<div id='${i}' class='border'>`
  for (const key in people[i]) {
    str += `<p>${people[i][key]}</p>`
  }
  str += `</div>`
}

body.innerHTML = `Matt Conway ${str}`;

