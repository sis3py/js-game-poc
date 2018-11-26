// Get the distance between one point (x1, y1) and an other point (x2, y2) on a 2D Grid
const distanceBetweenTwoPoints = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

module.exports = { distanceBetweenTwoPoints };
