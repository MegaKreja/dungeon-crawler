import * as actionTypes from "../actions/actionsTypes";
import { enemies } from "../../constants/enemies";
import { completeMap } from "../../constants/randomGrid";
import {
  wallStop,
  nextFloor,
  gainHealth,
  getWeapon,
  fightChance
} from "../../constants/movementHelpers";

// first loaded grid with first floor
let grid = completeMap(0);

const initialState = {
  playerX: grid.x,
  playerY: grid.y,
  playerHealth: 100,
  playerExp: 0,
  playerLvl: 1,
  floor: 0,
  weapon: { name: "Bare Hands", damage: 5 },
  currentEnemies: grid.currentEnemies,
  currentLevelGrid: grid.map,
  gameOver: false
};

const newGame = (state, action) => {
  const floor = 0;
  const grid = completeMap(floor);
  const playerX = grid.x;
  const playerY = grid.y;
  const currentLevelGrid = grid.map;
  const currentEnemies = grid.currentEnemies;
  const gameOver = false;
  enemies[4].health = 250;
  return {
    ...state,
    playerHealth: 100,
    playerExp: 0,
    playerLvl: 1,
    floor: 0,
    weapon: { name: "Bare Hands", damage: 5 },
    playerX,
    playerY,
    currentEnemies,
    currentLevelGrid,
    gameOver
  };
};

const movePlayer = (state, action) => {
  let {
    playerX,
    playerY,
    playerHealth,
    weapon,
    currentEnemies,
    playerExp,
    playerLvl,
    gameOver
  } = state;
  let currentLevelGrid = [...state.currentLevelGrid];
  let fightResult = {};
  // turn previous position to regular tile
  currentLevelGrid[playerX][playerY] = 0;
  switch (action.dir.keyCode) {
    // left
    case 37:
      // if there was a fight
      fightResult = fightChance(state, "left");
      playerExp = fightResult.playerExp;
      playerLvl = fightResult.playerLvl;
      // player come to wall or there is fight
      playerY = wallStop(state, "left") ? playerY : fightResult.playerY;
      // if there are fight, properties are changed, otherwise they stay same
      // player get health potion or not, if there is not fight
      playerHealth =
        fightResult.playerHealth < playerHealth
          ? fightResult.playerHealth
          : gainHealth(state, playerX, playerY);
      currentEnemies = fightResult.currentEnemies;

      // player get weapon
      weapon = getWeapon(state, playerX, playerY);
      // if player go to next floor change whole grid
      if (currentLevelGrid[playerX][playerY] === 6) {
        return nextFloor(state, playerX, playerY);
      }
      // if game over
      gameOver = fightResult.gameOver;
      // current position if not next level is not entered
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerY,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid,
        gameOver
      };
    // up
    case 38:
      fightResult = fightChance(state, "up");
      playerExp = fightResult.playerExp;
      playerLvl = fightResult.playerLvl;
      playerX = wallStop(state, "up") ? playerX : fightResult.playerX;
      playerHealth =
        fightResult.playerHealth < playerHealth
          ? fightResult.playerHealth
          : gainHealth(state, playerX, playerY);
      currentEnemies = fightResult.currentEnemies;

      weapon = getWeapon(state, playerX, playerY);
      if (currentLevelGrid[playerX][playerY] === 6) {
        return nextFloor(state, playerX, playerY);
      }
      gameOver = fightResult.gameOver;
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerX,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid,
        gameOver
      };
    // right
    case 39:
      fightResult = fightChance(state, "right");
      playerExp = fightResult.playerExp;
      playerLvl = fightResult.playerLvl;
      playerY = wallStop(state, "right") ? playerY : fightResult.playerY;
      playerHealth =
        fightResult.playerHealth < playerHealth
          ? fightResult.playerHealth
          : gainHealth(state, playerX, playerY);
      currentEnemies = fightResult.currentEnemies;

      weapon = getWeapon(state, playerX, playerY);
      if (currentLevelGrid[playerX][playerY] === 6) {
        return nextFloor(state, playerX, playerY);
      }
      // enemies[4].health = 250;
      gameOver = fightResult.gameOver;
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerY,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid,
        gameOver
      };
    // down
    case 40:
      fightResult = fightChance(state, "down");
      playerExp = fightResult.playerExp;
      playerLvl = fightResult.playerLvl;
      playerX = wallStop(state, "down") ? playerX : fightResult.playerX;
      playerHealth =
        fightResult.playerHealth < playerHealth
          ? fightResult.playerHealth
          : gainHealth(state, playerX, playerY);
      currentEnemies = fightResult.currentEnemies;

      weapon = getWeapon(state, playerX, playerY);
      if (currentLevelGrid[playerX][playerY] === 6) {
        return nextFloor(state, playerX, playerY);
      }
      gameOver = fightResult.gameOver;
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerX,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid,
        gameOver
      };
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE_PLAYER:
      return movePlayer(state, action);
    case actionTypes.NEW_GAME:
      return newGame(state, action);
    default:
      return state;
  }
};

export default reducer;
