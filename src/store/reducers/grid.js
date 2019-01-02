import * as actionTypes from "../actions/actionsTypes";
import { levelOne } from "../../dungeonGrids/levelOne/levelOne";

const initialState = {
  playerX: 10,
  playerY: 10,
  playerHealth: 100,
  playerExp: 0,
  playerLvl: 1,
  currentLevelGrid: levelOne
};

const movePlayer = (state, action) => {
  let x = state.playerX;
  let y = state.playerY;
  let health = state.playerHealth;
  const currentLevelGrid = [...state.currentLevelGrid];
  currentLevelGrid[x][y] = 0;

  switch (action.dir.keyCode) {
    // left
    case 38:
      x = wallStop(state, "left");
      health = gainHealth(state, "left");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: x,
        playerHealth: health,
        currentLevelGrid
      };
    // up
    case 37:
      y = wallStop(state, "up");
      health = gainHealth(state, "up");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: y,
        playerHealth: health,
        currentLevelGrid
      };
    // right
    case 40:
      x = wallStop(state, "right");
      health = gainHealth(state, "right");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: x,
        playerHealth: health,
        currentLevelGrid
      };
    // down
    case 39:
      y = wallStop(state, "down");
      health = gainHealth(state, "down");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: y,
        playerHealth: health,
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

const gainHealth = (state, dir) => {
  const { playerX, playerY, currentLevelGrid, playerHealth } = state;
  if (dir === "left") {
    if (currentLevelGrid[playerX - 1][playerY] === 3) {
      return playerHealth + 30;
    }
    return playerHealth;
  } else if (dir === "up") {
    if (currentLevelGrid[playerX][playerY - 1] === 3) {
      return playerHealth + 30;
    }
    return playerHealth;
  } else if (dir === "down") {
    if (currentLevelGrid[playerX][playerY + 1] === 3) {
      return playerHealth + 30;
    }
    return playerHealth;
  } else {
    if (currentLevelGrid[playerX + 1][playerY] === 3) {
      return playerHealth + 30;
    }
    return playerHealth;
  }
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
