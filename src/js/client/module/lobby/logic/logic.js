import { maxPlayers } from '../../../../configuration/game';

export const getPlayerSlots = players => Array(maxPlayers)
  .fill()
  .map((item, index) => players[index]);
