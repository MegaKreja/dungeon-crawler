import { completeMap } from "./randomGrid";
import { weapons } from "./weapons";
import { enemies } from "./enemies";

export const wallStop = (state, dir) => {
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

export const gainHealth = (state, x, y) => {
  const { currentLevelGrid, playerHealth } = state;
  if (currentLevelGrid[x][y] === 3) {
    return playerHealth + 30;
  }
  return playerHealth;
};

export const nextFloor = state => {
  let { floor, playerX, playerY, currentEnemies, currentLevelGrid } = state;
  floor += 1;
  // new randomized grid
  let grid = completeMap(floor);
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

export const getWeapon = (state, x, y) => {
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

export const fightChance = (state, dir) => {
  const { playerX, playerY } = state;
  let {
    currentLevelGrid,
    playerHealth,
    currentEnemies,
    playerExp,
    playerLvl
  } = state;
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

export const fight = (state, x, y) => {
  const { playerX, playerY, weapon } = state;
  let {
    playerHealth,
    currentEnemies,
    currentLevelGrid,
    playerExp,
    playerLvl,
    gameOver
  } = state;
  // default health and damage for conditionals later
  let enemyHealth = 20;
  const criticalDamageEnemy = Math.floor(Math.random() * 5);
  const criticalDamagePlayer = Math.floor(Math.random() * 5);
  let enemyDamage = currentEnemies[0].damage;
  // boss health
  let bossHealth = enemies[4].health;
  // find enemy from array to fight
  // if enemy is boss
  if (currentLevelGrid[x][y] === 7) {
    enemies[4].health -= weapon.damage + criticalDamagePlayer;
    enemyHealth = enemies[4].health;
    enemyDamage = enemies[4].damage;
  } else {
    // regular enemy
    currentEnemies.forEach(enemy => {
      // different enemy for different coordinates lose health
      if (enemy.x === x && enemy.y === y) {
        // enemy lose health
        enemy.health -= weapon.damage + criticalDamagePlayer;
        // get enemy health
        enemyHealth = enemy.health;
      }
    });
  }

  // get xp if enemy is defeated and level up if exp is in hundreds
  let divider = 100 * playerLvl;
  playerExp = enemyHealth <= 0 ? playerExp + 20 : playerExp;
  playerLvl =
    playerExp % divider === 0 && playerExp > 0 ? (playerLvl += 1) : playerLvl;
  // reduce player health if enemy is alive
  playerHealth =
    enemyHealth > 0
      ? (playerHealth -= enemyDamage + criticalDamageEnemy)
      : playerHealth;
  // when enemy is dead replace his place with empty tile
  currentLevelGrid =
    enemyHealth <= 0 ? (currentLevelGrid[x][y] = 0) : currentLevelGrid;
  console.log(playerHealth, bossHealth);
  if (playerHealth <= 0 || bossHealth <= 0) {
    console.log("usli smo");
    gameOver = true;
  }
  console.log(gameOver);
  // player remains in same place until enemy is defeated
  return {
    playerX,
    playerY,
    playerExp,
    playerLvl,
    playerHealth,
    currentEnemies,
    currentLevelGrid,
    gameOver
  };
};
