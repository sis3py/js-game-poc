import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { pageStyle } from '../style/style';

const Page = ({ children, classes }) => <div className={classes.page}>{children}</div>;

export default withStyles(pageStyle)(Page);
