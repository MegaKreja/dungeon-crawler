import * as actionTypes from "../actions/actionsTypes";
import { levelOne } from "../../dungeonGrids/levelOne/levelOne";

const initialState = {
  playerX: 10,
  playerY: 10,
  currentLevelGrid: levelOne
};

const movePlayer = (state, action) => {
  switch (action.dir.keyCode) {
    case 37:
      return {
        ...state,
        playerX: state.playerX - 1
      };
    case 38:
      return {
        ...state,
        playerX: state.playerY - 1
      };
    case 39:
      return {
        ...state,
        playerX: state.playerX + 1
      };
    case 40:
      return {
        ...state,
        playerX: state.playerY + 1
      };
    default:
      return state;
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
