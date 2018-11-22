const { direction: spriteDirection } = require('../../enum/direction');

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

const initEnemy = (game, io, easystar) => {
  // Enemy behavior calculation loop
  setInterval(() => {
    easystar.findPath(
      Math.floor(game.enemy.coordinates.x / 32),
      Math.floor(game.enemy.coordinates.y / 32),
      Math.floor(game.players[0].coordinates.x / 32),
      Math.floor(game.players[0].coordinates.y / 32),
      (path) => {
        if (path === null) {
          console.log('Unable to find a path between the enemy and the players');
        }

        if (path) {
          const nextX = path[1].x * 32;
          const nextY = path[1].y * 32;
          const direction = getDirection(
            game.enemy.coordinates.x,
            game.enemy.coordinates.y,
            nextX,
            nextY,
          );

          // Send the new coordinates and direction
          io.in(game.id).emit('sendEnemyCoordinates', {
            x: nextX,
            y: nextY,
            direction,
          });

          // Update the enemy coordinates
          game.enemy.coordinates.x = nextX;
          game.enemy.coordinates.y = nextY;
        }
      },
    );
    easystar.calculate();
  }, 200);
};

// TODO
// 1 - LOAD JSON MAP AND HANDLE GENERIC SIZE
// 2 - FIND HOW TO MAKE WALKABLE TILES ONLY WORKING

// const grid = [];
// for (let y = 0; y < map.height; y++) {
//   const col = [];
//   for (let x = 0; x < map.width; x++) {
//     // In each cell we store the ID of the tile, which corresponds
//     // to its index in the tileset of the map ("ID" field in Tiled)
//     col.push(this.getTileID(map, x, y));
//   }
//   grid.push(col);
// }
// this.finder.setGrid(grid);

// const tileset = map.tilesets[0];
// const properties = tileset.tileProperties;
// const acceptableTiles = [];

// for (let i = tileset.firstgid - 1; i < tiles.total; i++) {
//   // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
//   if (!properties.hasOwnProperty(i)) {
//     // If there is no property indicated at all, it means it's a walkable tile
//     acceptableTiles.push(i + 1);
//     continue;
//   }
//   if (!properties[i].collides) acceptableTiles.push(i + 1);
//   // if(properties[i].cost) Game.finder.setTileCost(i+1, properties[i].cost); // If there is a cost attached to the tile, let's register it
// }
// this.finder.setAcceptableTiles(acceptableTiles);

module.exports = {
  initEnemy,
};
