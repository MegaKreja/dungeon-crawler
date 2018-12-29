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
  console.log(x, y);
  const currentLevelGrid = [...state.currentLevelGrid];
  currentLevelGrid[x][y] = 0;

  switch (action.dir.keyCode) {
    case 37:
      x = x - 1;
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: state.playerX - 1,
        currentLevelGrid
      };
    case 38:
      y = y - 1;
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: state.playerY - 1,
        currentLevelGrid
      };
    case 39:
      x = x + 1;
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerX: state.playerX + 1,
        currentLevelGrid
      };
    case 40:
      y = y + 1;
      currentLevelGrid[x][y] = 1;
      return {
        ...state,
        playerY: state.playerY + 1,
        currentLevelGrid
      };
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE_PLAYER:
      console.log(state);
      return movePlayer(state, action);
    default:
      return state;
  }
};

export default reducer;
