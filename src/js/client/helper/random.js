/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandom = (min, max) => Math.random() * (max - min) + min;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
