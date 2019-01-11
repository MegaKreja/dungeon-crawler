import * as actionTypes from "../actions/actionsTypes";
import { levelOne } from "../../constants/levels";
import { weapons } from "../../constants/weapons";
import { enemiesFirstFloor } from "../../constants/enemies";

const initialState = {
  playerX: 10,
  playerY: 10,
  playerHealth: 100,
  playerExp: 0,
  playerLvl: 1,
  floor: 1,
  weapon: { name: "Bare Fists", damage: 5 },
  currentEnemies: enemiesFirstFloor,
  currentLevelGrid: levelOne
};

const movePlayer = (state, action) => {
  let { playerX, playerY, playerHealth, weapon, currentEnemy } = state;
  let currentLevelGrid = [...state.currentLevelGrid];
  let fightResult = {};
  currentLevelGrid[playerX][playerY] = 0;
  console.log(action.dir.keyCode);
  switch (action.dir.keyCode) {
    // left
    case 37:
      // player get health
      playerHealth = gainHealth(state, playerX, playerY);
      // player get weapon
      weapon = getWeapon(state, playerX, playerY);
      // if there was a fight
      fightResult = fightChance(state, "left");
      // player come to wall or there is fight
      playerY = wallStop(state, "left") ? playerY : fightResult.playerY;
      playerHealth = fightResult.playerHealth;
      currentEnemy = fightResult.currentEnemy;
      // current position
      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerY,
        playerHealth,
        weapon,
        currentEnemy,
        currentLevelGrid
      };
    // up
    case 38:
      playerHealth = gainHealth(state, playerX, playerY);
      weapon = getWeapon(state, playerX, playerY);

      fightResult = fightChance(state, "up");
      playerX = wallStop(state, "up") ? playerX : fightResult.playerX;
      playerHealth = fightResult.playerHealth;
      currentEnemy = fightResult.currentEnemy;

      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerX,
        playerHealth,
        weapon,
        currentEnemy,
        currentLevelGrid
      };
    // right
    case 39:
      playerHealth = gainHealth(state, playerX, playerY);
      weapon = getWeapon(state, playerX, playerY);

      fightResult = fightChance(state, "right");
      playerY = wallStop(state, "right") ? playerY : fightResult.playerY;
      playerHealth = fightResult.playerHealth;
      currentEnemy = fightResult.currentEnemy;

      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerY,
        playerHealth,
        weapon,
        currentEnemy,
        currentLevelGrid
      };
    // down
    case 40:
      playerHealth = gainHealth(state, playerX, playerY);
      weapon = getWeapon(state, playerX, playerY);

      fightResult = fightChance(state, "down");
      playerX = wallStop(state, "down") ? playerX : fightResult.playerX;
      playerHealth = fightResult.playerHealth;
      currentEnemy = fightResult.currentEnemy;

      currentLevelGrid[playerX][playerY] = 1;
      return {
        ...state,
        playerX,
        playerHealth,
        weapon,
        currentEnemy,
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
    if (playerY + 1 > 20 || currentLevelGrid[playerX][playerY + 1] === 2) {
      return true;
    }
    return false;
  } else if (dir === "down") {
    if (playerX + 1 > 20 || currentLevelGrid[playerX + 1][playerY] === 2) {
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
  let { playerHealth, currentEnemies, currentLevelGrid } = state;
  if (dir === "left") {
    if (currentLevelGrid[playerX][playerY - 1] === 5) {
      // function with updated coordinates for particular direction
      return fight(state, playerX, playerY - 1);
    }
    // move player if there is not enemy
    return {
      playerX,
      playerY: playerY - 1,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  } else if (dir === "up") {
    if (currentLevelGrid[playerX - 1][playerY] === 5) {
      return fight(state, playerX - 1, playerY);
    }
    return {
      playerX: playerX - 1,
      playerY,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  } else if (dir === "right") {
    if (currentLevelGrid[playerX][playerY + 1] === 5) {
      return fight(state, playerX, playerY + 1);
    }
    return {
      playerX,
      playerY: playerY + 1,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  } else if (dir === "down") {
    if (currentLevelGrid[playerX + 1][playerY] === 5) {
      return fight(state, playerX + 1, playerY);
    }
    return {
      playerX: playerX + 1,
      playerY,
      playerHealth,
      currentEnemies,
      currentLevelGrid
    };
  }
};

const fight = (state, x, y) => {
  const { playerX, playerY, weapon } = state;
  let { playerHealth, currentEnemies, currentLevelGrid } = state;
  // health and damage for conditionals later
  let enemyHealth = 20;
  let enemyDamage = currentEnemies[0].damage;
  // find enemy from array to fight
  currentEnemies.forEach(enemy => {
    // different enemy for different coordinates lose health
    if (enemy.x === x && enemy.y === y) {
      // enemy lose health
      enemy.health -= weapon.damage;
      // get enemy health
      enemyHealth = enemy.health;
    }
  });
  // reduce player health if enemy is alive
  playerHealth = enemyHealth > 0 ? (playerHealth -= enemyDamage) : playerHealth;
  // when enemy is dead replace his place with empty tile
  currentLevelGrid =
    enemyHealth <= 0 ? (currentLevelGrid[x][y] = 0) : currentLevelGrid;
  // player remains in same place until enemy is defeated
  return {
    playerX,
    playerY,
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
