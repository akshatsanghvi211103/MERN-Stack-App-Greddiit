const wrapper = document.getElementById('tiles');

let columns = 0, rows = 0, toggled = false;

const toggle = () => {
  toggled = !toggled;
  
  document.getElementsByClassName('boxes')[0].classList.toggle('toggled');
}
let opacity1 = 0;
let opacity2 = 1;

const button = document.getElementsByClassName('boxes')[0];
button.onclick = e => {
  document.getElementById('title').style.opacity = opacity1;
  document.getElementById('icon').style.opacity = opacity2;
  opacity1 = 1 - opacity1;
  opacity2 = 1 - opacity2;
}

const handleOnClick = index => {
  toggle();
  anime({
    targets: '.tile',
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.style.opacity = toggled ? 0 : 1;
  tile.onclick = e => handleOnClick(index);
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = '';
  const size = document.getElementsByClassName('boxes')[0].clientWidth > 800 ? 40 : 50;
  columns = Math.floor(document.getElementsByClassName('boxes')[0].clientWidth / size);
  rows = Math.floor(document.getElementsByClassName('boxes')[0].clientHeight / size);
  wrapper.style.setProperty('--columns', columns);
  wrapper.style.setProperty('--rows', rows);
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();