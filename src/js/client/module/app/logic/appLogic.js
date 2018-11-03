import { getRandomInt } from '../../../helper/random';

export const generateDefaultNickname = () => `player-${getRandomInt(1, 100000)}`;
