import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { userStyle } from '../style/style';

const User = ({ user, classes }) => (
  <div className={classes.user}>
    <Avatar alt="" src="assets/images/defaultUser.png" className={classes.avatar} />
    <span>{user.nickname}</span>
  </div>
);

export default withStyles(userStyle)(User);
