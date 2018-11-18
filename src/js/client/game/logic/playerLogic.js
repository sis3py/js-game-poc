import {
  player1X,
  player1Y,
  player2X,
  player2Y,
  player3X,
  player3Y,
} from '../constant/playerInitialCoordinates';

export const getInitialCoordinates = (position) => {
  switch (position) {
    case 1:
      return { x: player1X, y: player1Y };
    case 2:
      return { x: player2X, y: player2Y };
    case 3:
      return { x: player3X, y: player3Y };
    default:
      throw new Error(`The given position (${position}) is not handled`);
  }
};

export const getPlayers = playersArray => playersArray.reduce((players, player, position) => {
  players[player.id] = { ...player, position: position + 1 };
  return players;
}, {});
