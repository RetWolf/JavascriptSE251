const jsonInfoReviews = '[{"gameId":9,"gameTitle":"Overwatch","consoles":"PS4, Xbox One, PC","rating":"T","score":5,"imageName":"Overwatch.jpg"},{"gameId":10,"gameTitle":"Civilization VI","consoles":"PC","rating":"E10+","score":5,"imageName":"civ6.jpg"},{"gameId":11,"gameTitle":"NBA 2K17","consoles":"PS4, Xbox One, PC","rating":"E","score":5,"imageName":"NBA2k17.jpg"},{"gameId":12,"gameTitle":"TitanFall 2","consoles":"PS4, Xbox One, PC","rating":"M","score":5,"imageName":"Titanfall2.jpg"},{"gameId":13,"gameTitle":"Uncharted 4: a thief\'s end","consoles":"PS4","rating":"T","score":5,"imageName":"Uncharted4.jpg"},{"gameId":14,"gameTitle":"XCom 2","consoles":"PS4, Xbox One, PC","rating":"T","score":5,"imageName":"Xcom2.jpg"},{"gameId":15,"gameTitle":"Battlefield 1","consoles":"PS4, Xbox One, PC","rating":"M","score":5,"imageName":"Battlefield1.jpg"},{"gameId":16,"gameTitle":"Dark Souls 3","consoles":"PS4, Xbox One, PC","rating":"M","score":5,"imageName":"DarkSouls3.jpg"},{"gameId":17,"gameTitle":"Dishonored 2","consoles":"PS4, Xbox One, PC","rating":"M","score":5,"imageName":"DisHonored2.jpg"},{"gameId":18,"gameTitle":"Fire Emblem Fates: Conquest","consoles":"3DS","rating":"T","score":4,"imageName":"FireEmblemFates.jpg"},{"gameId":19,"gameTitle":"Forza Horizon 3","consoles":"Xbox One, PC","rating":"E","score":5,"imageName":"ForzaHorizon3.jpg"},{"gameId":20,"gameTitle":"Gears of War 4","consoles":"Xbox One, PC","rating":"M","score":5,"imageName":"GearsofWar4.jpg"},{"gameId":21,"gameTitle":"Call of Duty: Infinite Warfare","consoles":"Xbox One, PC","rating":"M","score":5,"imageName":"CoDIW.jpg"},{"gameId":22,"gameTitle":"Dead Rising 4","consoles":"Xbox One","rating":"M","score":5,"imageName":"DeadRising4.jpg"},{"gameId":23,"gameTitle":"Doom","consoles":"Xbox One, PC","rating":"T","score":5,"imageName":"Doom.jpg"},{"gameId":24,"gameTitle":"Fifa 17","consoles":"Xbox One, PC","rating":"E","score":5,"imageName":"FIFA17.jpg"},{"gameId":25,"gameTitle":"Madden NFL 17","consoles":"PS4, Xbox One, PC","rating":"E","score":4,"imageName":"Madden17.jpg"}]';
const reviews = JSON.parse(jsonInfoReviews);

const tbody = document.querySelector('#reviewsBody');

reviews.forEach(review => {
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  Object.entries(review).forEach(([key, val]) => {
    let td = document.createElement('td');
    if (key !== 'gameId' && key !== 'imageName' && key !== 'gameTitle') {
      td.textContent = val;
      tr.appendChild(td);
    } else if (key === 'gameTitle') {
      td.innerHTML += `<a class="preview" data-img="${review.imageName}">${val}</a>`;
      tr.appendChild(td);
    }
  });
});

const previews = document.querySelectorAll('.preview');

previews.forEach(preview => {
  preview.addEventListener('click', showPreview);
});

function showPreview() {
  let gamePreview = document.querySelector('#gamePreview');
  gamePreview.style.display = 'block';
  gamePreview.childNodes[1].innerHTML = this.innerHTML;
  gamePreview.childNodes[3].src = `images/${this.dataset.img}`;
}