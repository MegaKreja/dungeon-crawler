import * as actionTypes from "../actions/actionsTypes";
import { levelOne } from "../../dungeonGrids/levelOne/levelOne";

const initialState = {
  playerX: 10,
  playerY: 10,
  currentLevelGrid: levelOne
};

const movePlayer = (state, action) => {
  let x = state.playerX;
  let y = state.playerY;
  const currentLevelGrid = [...state.currentLevelGrid];
  currentLevelGrid[x][y] = 0;

  switch (action.dir.keyCode) {
    // left
    case 38:
      x = wallStop(x, "left");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: x,
        currentLevelGrid
      };
    // up
    case 37:
      y = wallStop(y, "up");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: y,
        currentLevelGrid
      };
    // right
    case 40:
      x = wallStop(x, "right");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: x,
        currentLevelGrid
      };
    // down
    case 39:
      y = wallStop(y, "down");
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: y,
        currentLevelGrid
      };
    default:
      return state;
  }
};

const wallStop = (coord, dir) => {
  if (dir === "left" || dir === "up") {
    if (coord - 1 < 0 || coord - 1 === 2) {
      return coord;
    }
    return coord - 1;
  } else {
    if (coord + 1 > 20 || coord + 1 === 2) {
      return coord;
    }
    return coord + 1;
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
