import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { slotGridStyle } from '../style/style';
import SlotGridItem from './slotGridItem';
import EmptySlotGridItem from './emptySlotGridItem';
import { getPlayerSlots } from '../logic/logic';

const SlotGrid = ({ players, colorByPlayer, classes }) => {
  const slots = getPlayerSlots(players);
  return (
    <div className={classes.slotGrid}>
      {slots.map((player, position) => {
        if (player) {
          return (
            <SlotGridItem
              key={position}
              player={player}
              backgroundColor={colorByPlayer[player.id]}
            />
          );
        }
        return <EmptySlotGridItem key={position} />;
      })}
    </div>
  );
};

export default withStyles(slotGridStyle)(SlotGrid);
