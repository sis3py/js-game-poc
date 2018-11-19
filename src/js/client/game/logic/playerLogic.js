import {
  player1X,
  player1Y,
  player2X,
  player2Y,
  player3X,
  player3Y,
  player4X,
  player4Y,
  player5X,
  player5Y,
  player6X,
  player6Y,
  player7X,
  player7Y,
  player8X,
  player8Y,
} from '../constant/playerInitialCoordinates';

export const getInitialCoordinates = (position) => {
  switch (position) {
    case 1:
      return { x: player1X, y: player1Y };
    case 2:
      return { x: player2X, y: player2Y };
    case 3:
      return { x: player3X, y: player3Y };
    case 4:
      return { x: player4X, y: player4Y };
    case 5:
      return { x: player5X, y: player5Y };
    case 6:
      return { x: player6X, y: player6Y };
    case 7:
      return { x: player7X, y: player7Y };
    case 8:
      return { x: player8X, y: player8Y };
    default:
      throw new Error(`The given position (${position}) is not handled`);
  }
};

export const getPlayers = playersArray => playersArray.reduce((players, player, position) => {
  players[player.id] = { ...player, position: position + 1 };
  return players;
}, {});
