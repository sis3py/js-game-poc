import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { titleStyle } from '../style/style';

const Title = ({ title, classes }) => <div className={classes.title}>{title}</div>;

export default withStyles(titleStyle)(Title);
