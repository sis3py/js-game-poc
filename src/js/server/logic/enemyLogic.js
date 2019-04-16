const { direction: spriteDirection } = require('../../enum/direction');
const { getSmallSizeChildIndexes } = require('../../helper/array');
const { distanceBetweenTwoPoints } = require('../../helper/calculation');

// Get the direction of the enemy based on the coordinates before and after the move
const getDirection = (currentX, currentY, newX, newY) => {
  const deltaX = currentX - newX;
  const deltaY = currentY - newY;

  if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
    return spriteDirection.left;
  }
  if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
    return spriteDirection.right;
  }
  if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
    return spriteDirection.up;
  }
  if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
    return spriteDirection.down;
  }
};

// Get an array of coordinates representing the path
// between starting coordinates and destination coordinates
const findPath = ({
  easystar, startX, startY, destinationX, destinationY,
}) => new Promise((resolve, reject) => {
  easystar.findPath(
    Math.floor(startX / 32),
    Math.floor(startY / 32),
    Math.floor(destinationX / 32),
    Math.floor(destinationY / 32),
    path => (path === null ? reject() : resolve(path)),
  );
});

const getEnemyPathToPlayer = (easystar, enemy, player) => findPath({
  easystar,
  startX: enemy.coordinates.x,
  startY: enemy.coordinates.y,
  destinationX: player.coordinates.x,
  destinationY: player.coordinates.y,
});

const getNextCoordinates = (path) => {
  const x = path[1].x * 32;
  const y = path[1].y * 32;
  return { x, y };
};

// Move the enemy based on the given coordinates
const moveEnemy = (io, gameId, enemy, { x, y }) => {
  // Get the enemy direction depending on the move
  const direction = getDirection(enemy.coordinates.x, enemy.coordinates.y, x, y);

  // Send the new coordinates and direction
  io.in(gameId).emit('sendEnemyCoordinates', {
    x,
    y,
    direction,
  });

  // Update the enemy coordinates
  enemy.coordinates.x = x;
  enemy.coordinates.y = y;
};

const calculateClosestPathIndex = (paths, enemy) => {
  // Get the smallest path because the smallest a path is, the closer a player is from the enemy
  const smallestPathIndexes = getSmallSizeChildIndexes(paths);

  // If the smallest path is single then this is the closest path
  if (smallestPathIndexes.length === 1) {
    return smallestPathIndexes[0];
  }
  // Otherwise we have to calculate the distance between the enemy and the last position of each path
  // and choose the lowest distance
  const distances = smallestPathIndexes.map(path => distanceBetweenTwoPoints(
    enemy.coordinates.x,
    enemy.coordinates.y,
    path[path.length - 1].x,
    path[path.length - 1].y,
  ));
};

const getClosestPlayer = (easystar, enemy, players) => {
  const promises = players.map(player => getEnemyPathToPlayer(easystar, enemy, player));
  Promise.all(promises)
    .then(paths => players[calculateClosestPathIndex(paths, enemy)])
    .catch(() => console.log('One of the path cannot be found between the enemy and the players'));
};

const initEnemy = (game, io, easystar) => {
  // Enemy behavior calculation loop
  setInterval(() => {
    getClosestPlayer(easystar, game.enemy, game.players);
    getEnemyPathToPlayer(easystar, game.enemy, game.players[0])
      .then(path => moveEnemy(io, game.id, game.enemy, getNextCoordinates(path)))
      .catch(() => console.log('Unable to find a path between the enemy and the players'));
    easystar.calculate();
  }, 200);
};

// TODO
// 1 - LOAD JSON MAP AND HANDLE GENERIC SIZE
// 2 - FIND HOW TO MAKE WALKABLE TILES ONLY WORKING

module.exports = {
  initEnemy,
};
