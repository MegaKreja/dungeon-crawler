import * as actionTypes from "../actions/actionsTypes";
import { completeMap } from "../../constants/randomGrid";
import { weapons } from "../../constants/weapons";

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
  currentLevelGrid: grid.map
};

const movePlayer = (state, action) => {
  let {
    playerX,
    playerY,
    playerHealth,
    weapon,
    currentEnemies,
    playerExp,
    playerLvl
  } = state;
  let currentLevelGrid = [...state.currentLevelGrid];
  let fightResult = {};
  currentLevelGrid[playerX][playerY] = 0;
  console.log(action.dir.keyCode);
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
        currentLevelGrid
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
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerX,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid
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
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerY,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid
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
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerX,
        playerExp,
        playerLvl,
        playerHealth,
        weapon,
        currentEnemies,
        currentLevelGrid
      };
    default:
      return state;
  }
};

const wallStop = (state, dir) => {
  const { playerX, playerY, currentLevelGrid } = state;
  if (dir === "left") {
    if (playerY - 1 < 0 || currentLevelGrid[playerX][playerY - 1] === 2) {
      return true;
    }
    return false;
  } else if (dir === "up") {
    if (playerX - 1 < 0 || currentLevelGrid[playerX - 1][playerY] === 2) {
      return true;
    }
    return false;
  } else if (dir === "right") {
    if (playerY + 1 > 29 || currentLevelGrid[playerX][playerY + 1] === 2) {
      return true;
    }
    return false;
  } else if (dir === "down") {
    if (playerX + 1 > 29 || currentLevelGrid[playerX + 1][playerY] === 2) {
      return true;
    }
    return false;
  }
};

const gainHealth = (state, x, y) => {
  const { currentLevelGrid, playerHealth } = state;
  if (currentLevelGrid[x][y] === 3) {
    return playerHealth + 30;
  }
  return playerHealth;
};

const nextFloor = state => {
  let { floor, playerX, playerY, currentEnemies, currentLevelGrid } = state;
  floor += 1;
  // new randomized grid
  grid = completeMap(floor);
  playerX = grid.x;
  playerY = grid.y;
  currentLevelGrid = grid.map;
  currentEnemies = grid.currentEnemies;
  return {
    ...state,
    playerX,
    playerY,
    floor,
    currentEnemies,
    currentLevelGrid
  };
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

const fightChance = (state, dir) => {
  const { playerX, playerY } = state;
  let {
    playerHealth,
    currentEnemies,
    currentLevelGrid,
    playerExp,
    playerLvl
  } = state;
  console.log(currentEnemies);
  if (dir === "left") {
    if (
      currentLevelGrid[playerX][playerY - 1] === 5 ||
      currentLevelGrid[playerX][playerY - 1] === 7
    ) {
      // function with updated coordinates for particular direction
      return fight(state, playerX, playerY - 1);
    }
    // move player if there is not enemy
    return {
      playerX,
      playerY: playerY - 1,
      playerExp,
      playerLvl,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  } else if (dir === "up") {
    if (
      playerX - 1 > 0 &&
      (currentLevelGrid[playerX - 1][playerY] === 5 ||
        currentLevelGrid[playerX - 1][playerY] === 7)
    ) {
      return fight(state, playerX - 1, playerY);
    }
    return {
      playerX: playerX - 1,
      playerY,
      playerExp,
      playerLvl,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  } else if (dir === "right") {
    if (
      currentLevelGrid[playerX][playerY + 1] === 5 ||
      currentLevelGrid[playerX][playerY + 1] === 7
    ) {
      return fight(state, playerX, playerY + 1);
    }
    return {
      playerX,
      playerY: playerY + 1,
      playerExp,
      playerLvl,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  } else if (dir === "down") {
    if (
      playerX + 1 < 29 &&
      (currentLevelGrid[playerX + 1][playerY] === 5 ||
        currentLevelGrid[playerX + 1][playerY] === 7)
    ) {
      return fight(state, playerX + 1, playerY);
    }
    return {
      playerX: playerX + 1,
      playerY,
      playerExp,
      playerLvl,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  }
};

const fight = (state, x, y) => {
  const { playerX, playerY, weapon } = state;
  let {
    playerHealth,
    currentEnemies,
    currentLevelGrid,
    playerExp,
    playerLvl
  } = state;
  // default health and damage for conditionals later
  let enemyHealth = 20;
  const criticalDamageEnemy = Math.floor(Math.random() * 5);
  const criticalDamagePlayer = Math.floor(Math.random() * 5);
  let enemyDamage = currentEnemies[0].damage;
  console.log(enemyDamage, playerHealth);
  // find enemy from array to fight
  currentEnemies.forEach(enemy => {
    // different enemy for different coordinates lose health
    if (enemy.x === x && enemy.y === y) {
      // enemy lose health
      enemy.health -= weapon.damage + criticalDamagePlayer;
      // get enemy health
      enemyHealth = enemy.health;
    }
  });
  // get xp if enemy is defeated and level up if exp is in hundreds
  playerExp = enemyHealth <= 0 ? playerExp + 20 : playerExp;
  playerLvl =
    playerExp % 100 === 0 && playerExp > 0 ? (playerLvl += 1) : playerLvl;
  // reduce player health if enemy is alive
  playerHealth =
    enemyHealth > 0
      ? (playerHealth -= enemyDamage + criticalDamageEnemy)
      : playerHealth;
  console.log(enemyDamage, playerHealth);
  // when enemy is dead replace his place with empty tile
  currentLevelGrid =
    enemyHealth <= 0 ? (currentLevelGrid[x][y] = 0) : currentLevelGrid;
  // player remains in same place until enemy is defeated
  return {
    playerX,
    playerY,
    playerExp,
    playerLvl,
    playerHealth,
    currentEnemies,
    currentLevelGrid
  };
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
