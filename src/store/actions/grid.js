import * as actionTypes from "./actionsTypes";

export const movePlayer = direction => {
  return {
    type: actionTypes.MOVE_PLAYER,
    dir: direction
  };
};
