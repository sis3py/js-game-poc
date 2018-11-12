import { maxPlayers } from '../../../../configuration/game';
import { gameStatus } from '../../../../enum/gameStatus';

export const getPlayerSlots = players => Array(maxPlayers)
  .fill()
  .map((item, index) => players[index]);

export const isGameReadyToBeLaunched = game => game.status === gameStatus.started;
