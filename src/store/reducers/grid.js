import * as actionTypes from "../actions/actionsTypes";
import { levelOne } from "../../constants/levels";
import { weapons } from "../../constants/weapons";

const initialState = {
  playerX: 10,
  playerY: 10,
  playerHealth: 100,
  playerExp: 0,
  playerLvl: 1,
  floor: 1,
  weapon: { name: "Bare Fists", damage: 5 },
  currentLevelGrid: levelOne
};

const movePlayer = (state, action) => {
  let x = state.playerX;
  let y = state.playerY;
  let health = state.playerHealth;
  let weapon = Object.assign({}, state.weapon);
  const currentLevelGrid = [...state.currentLevelGrid];
  currentLevelGrid[x][y] = 0;

  switch (action.dir.keyCode) {
    // left
    case 38:
      x = wallStop(state, "left");
      health = gainHealth(state, x, y);
      weapon = getWeapon(state, x, y);
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: x,
        playerHealth: health,
        weapon,
        currentLevelGrid
      };
    // up
    case 37:
      y = wallStop(state, "up");
      health = gainHealth(state, x, y);
      weapon = getWeapon(state, x, y);
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: y,
        playerHealth: health,
        weapon,
        currentLevelGrid
      };
    // right
    case 40:
      x = wallStop(state, "right");
      health = gainHealth(state, x, y);
      weapon = getWeapon(state, x, y);
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: x,
        playerHealth: health,
        weapon,
        currentLevelGrid
      };
    // down
    case 39:
      y = wallStop(state, "down");
      health = gainHealth(state, x, y);
      weapon = getWeapon(state, x, y);
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: y,
        playerHealth: health,
        weapon,
        currentLevelGrid
      };
    default:
      return state;
  }
};

const wallStop = (state, dir) => {
  const { playerX, playerY, currentLevelGrid } = state;
  if (dir === "left") {
    if (playerX - 1 < 0 || currentLevelGrid[playerX - 1][playerY] === 2) {
      return playerX;
    }
    return playerX - 1;
  } else if (dir === "up") {
    if (playerY - 1 < 0 || currentLevelGrid[playerX][playerY - 1] === 2) {
      return playerY;
    }
    return playerY - 1;
  } else if (dir === "down") {
    if (playerY + 1 > 20 || currentLevelGrid[playerX][playerY + 1] === 2) {
      return playerY;
    }
    return playerY + 1;
  } else {
    if (playerX + 1 > 20 || currentLevelGrid[playerX + 1][playerY] === 2) {
      return playerX;
    }
    return playerX + 1;
  }
};

const gainHealth = (state, x, y) => {
  const { currentLevelGrid, playerHealth } = state;
  if (currentLevelGrid[x][y] === 3) {
    return playerHealth + 30;
  }
  return playerHealth;
};

const getWeapon = (state, x, y) => {
  const { currentLevelGrid, weapon, floor } = state;
  const name = weapons[floor].name;
  const damage = weapons[floor].damage;
  if (currentLevelGrid[x][y] === 4) {
    return {
      name,
      damage
    };
  }
  return weapon;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE_PLAYER:
      return movePlayer(state, action);
    default:
      return state;
  }
};

export default reducer;
