// 0-empty field
// 1-player
// 2-wall
// 3-potion
// 4-weapon
// 5-enemy
// 6-stairs
// 7-boss

// map with random walk algorithm
// create 2d matrix
const createMatrix = (num, width, height) => {
  let array = [];
  for (let i = 0; i < width; i++) {
    array.push([]);
    for (let j = 0; j < height; j++) {
      array[i].push(num);
    }
  }
  return array;
};

const createMap = () => {
  // width and height of grid
  let width = 30,
    height = 30,
    maxTunnels = 120,
    // max length of tunnels
    maxLength = 40,
    // create matrix with given parameters
    map = createMatrix(2, width, height),
    // starting point
    currentRow = Math.floor(Math.random() * width),
    currentColumn = Math.floor(Math.random() * height),
    // possible directions of tunnels
    directions = [[-1, 0], [1, 0], [0, -1], [0, 1]],
    lastDirection = [],
    // next direction
    randomDirection;

  while (maxTunnels && width && height && maxLength) {
    do {
      randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
    } while (
      (randomDirection[0] === -lastDirection[0] &&
        randomDirection[1] === -lastDirection[1]) ||
      (randomDirection[0] === lastDirection[0] &&
        randomDirection[1] === lastDirection[1])
    );

    let randomLength = Math.ceil(Math.random() * maxLength),
      tunnelLength = 0;

    while (tunnelLength < randomLength) {
      if (
        (currentRow === 0 && randomDirection[0] === -1) ||
        (currentColumn === 0 && randomDirection[1] === -1) ||
        (currentRow === width - 1 && randomDirection[0] === 1) ||
        (currentColumn === height - 1 && randomDirection[1] === 1)
      ) {
        break;
      } else {
        map[currentRow][currentColumn] = 0;
        currentRow += randomDirection[0];
        currentColumn += randomDirection[1];
        tunnelLength++;
      }
    }

    if (tunnelLength) {
      lastDirection = randomDirection;
      maxTunnels--;
    }
  }

  // player is added to grid
  map[currentRow][currentColumn] = 1;

  // return map with coordinates
  return {
    map,
    x: currentRow,
    y: currentColumn
  };
};

const withoutItems = createMap();
let grid = withoutItems.map;

// add items to grid (type - type of item, legend is on top, numOfItems - number of selected item in grid)
const seedWithItems = (type, numOfItems) => {
  for (let i = 0; i < numOfItems; i++) {
    let x = Math.floor(Math.random() * 30);
    let y = Math.floor(Math.random() * 30);
    if (grid[x][y] === 0) {
      grid[x][y] = type;
    } else {
      i -= 1;
    }
  }
};

// health
seedWithItems(3, 5);
// weapon
seedWithItems(4, 3);
// enemy
seedWithItems(5, 5);
// stairs to next floor
seedWithItems(6, 1);

export const map = grid;
export const player = {
  x: withoutItems.x,
  y: withoutItems.y
};
