import { playerColor } from '../../../../enum/playerColor';

export const getColorByPlayer = players => players
  .map((player, index) => ({ id: player.id, color: playerColor[index + 1] }))
  .reduce((acc, val) => {
    acc[val.id] = val.color;
    return acc;
  }, {});
