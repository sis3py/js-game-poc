const fs = require('fs');

const initMap = () => {
  // Parse the JSON tilemap
  const map = JSON.parse(fs.readFileSync('dist/assets/tilemaps/main.json', 'utf8'));
  return map;
};

// Convert an array to a two dimensional array having the given size
const arrayTo2DArray = (array, rows, cols) => {
  const tmp = [];

  for (let r = 0; r < rows; r += 1) {
    const row = [];
    for (let c = 0; c < cols; c += 1) {
      const i = r * cols + c;
      if (i < array.length) {
        row.push(array[i]);
      }
    }
    tmp.push(row);
  }

  return tmp;
};

const getGrid = (map) => {
  const { layers } = map;
  const { height, width, data } = layers[0];
  const grid = arrayTo2DArray(data, width, height);
  return grid;
};

module.exports = {
  initMap,
  getGrid,
};
