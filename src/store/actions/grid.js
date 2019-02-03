import * as actionTypes from "./actionsTypes";

export const movePlayer = direction => {
  return {
    type: actionTypes.MOVE_PLAYER,
    dir: direction
  };
};

export const newGame = () => {
  return {
    type: actionTypes.NEW_GAME
  };
};
