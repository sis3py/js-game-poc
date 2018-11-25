import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { pageStyle } from '../style/style';

const Page = ({ children, isFullScreen, classes }) => (
  <div
    className={`${classes.page} ${
      isFullScreen ? classes.fullScreenMargin : classes.standardMargin
    }`}
  >
    {children}
  </div>
);

export default withStyles(pageStyle)(Page);
