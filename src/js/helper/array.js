// For a given array of child arrays
// Get the index of the child array having the smallest size
// The result is a an array of indexes because its possible to have more than one child array with smallest size
const getSmallSizeChildIndexes = array => array.reduce((acc, val, index) => {
  if (acc.length === 0) {
    acc.push(index);
  } else if (val.length < array[acc[0]].length) {
    acc = [index];
  } else if (val.length === array[acc[0]].length) {
    acc.push(index);
  }
  return acc;
}, []);

module.exports = { getSmallSizeChildIndexes };
