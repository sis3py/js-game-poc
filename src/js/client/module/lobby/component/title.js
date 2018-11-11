import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { titleStyle } from '../style/style';

const Title = ({ title, classes }) => (
  <Typography className={classes.title} align="center" color="secondary" gutterBottom variant="h3">
    {title}
  </Typography>
);

export default withStyles(titleStyle)(Title);
