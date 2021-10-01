const mapOutside = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

let game = {
  dom: document.querySelector('#background'),
  size: {
    x: 20,
    y: 20,
  },
  durationStep: 200,
  squareSize: 16,
  curMap: null,
  loadMap: function (mapName) {
    const Square = {
      passable: true,
      fightChance: 0,
      letter: '-',
    };
    const Water = {
      passable: false,
      fightChance: 0,
      letter: 'W',
    };
    const Grass = {
      passable: true,
      fightChance: 0.3,
      letter: 'G',
    };
    let mapData = null;
    switch (mapName) {
      case 'mapOutside':
        mapData = mapOutside;
        break;
      default:
        console.error(`Map not found: ${mapName}`);
        return;
    }

    const curMap = [];
    for (let i = 0; i < game.size.x; i++) {
      curMap[i] = [];
      for (let j = 0; j < game.size.y; j++) {
        const sq = document.createElement('div');
        switch (mapData[j][i]) {
          case 0:
            curMap[i][j] = Square;
            sq.classList.add('square');
            break;
          case 1:
            curMap[i][j] = Grass;
            sq.classList.add('square', 'grass');
            break;
          case 2:
            curMap[i][j] = Water;
            sq.classList.add('square', 'water');
            break;
          default:
            console.error('Wait, what ?');
        }
        game.dom.appendChild(sq);
      }
    }
    this.curMap = curMap;
  },
  checkSquare: function (x, y) {
    if (x < 0 || y < 0 || x >= this.size.x || y >= this.size.y) {
      return false;
    }
    return this.curMap[x][y].passable;
  },
  enterSquare: function (x, y) {
    const square = this.curMap[x][y];
    if (Math.random() < square.fightChance) {
      console.log('FIGHT!!!');
    }
  },
};

let player = {
  dom: document.querySelector('#player'),
  canMove: true,
  position: {
    x: 10,
    y: 10,
  },
};

const controller = {
  mapController: function (key) {
    if (!player.canMove) return;

    player.canMove = false;
    setTimeout(() => {
      player.canMove = true;
    }, game.durationStep);

    const x = player.position.x;
    const y = player.position.y;

    switch (key) {
      case 'z':
        player.dom.src = './assets/img/player/top.png';
        if (!game.checkSquare(x, y - 1)) return;
        player.position.y = y - 1;
        break;
      case 'q':
        player.dom.src = './assets/img/player/left.png';
        if (!game.checkSquare(x - 1, y)) return;
        player.position.x = x - 1;
        break;
      case 's':
        player.dom.src = './assets/img/player/bottom.png';
        if (!game.checkSquare(x, y + 1)) return;
        player.position.y = y + 1;
        break;
      case 'd':
        player.dom.src = './assets/img/player/right.png';
        if (!game.checkSquare(x + 1, y)) return;
        player.position.x = x + 1;
        break;
    }
    player.dom.style.left = `${player.position.x * game.squareSize}px`;
    player.dom.style.top = `${player.position.y * game.squareSize}px`;
    game.enterSquare(player.position.x, player.position.y);
  },
};

document.body.addEventListener('keypress', (evt) => {
  controller.mapController(evt.key);
});

game.loadMap('mapOutside');
