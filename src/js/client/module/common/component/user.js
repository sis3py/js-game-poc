import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { userStyle } from '../style/style';
import { styleArrangement } from '../../../../enum/styleArrangement';

const getArrangementUserClass = (arrangement, classes) => {
  switch (arrangement) {
    case styleArrangement.column:
      return classes.userColumn;
    case styleArrangement.row:
      return classes.userRow;
    default:
      throw new Error(`Unknow arrangement value (${arrangement})`);
  }
};
const getArrangementAvatarClass = (arrangement, classes) => {
  switch (arrangement) {
    case styleArrangement.column:
      return classes.avatarColumn;
    case styleArrangement.row:
      return classes.avatarRow;
    default:
      throw new Error(`Unknow arrangement value (${arrangement})`);
  }
};
const User = ({ user, arrangement, classes }) => (
  <div className={`${classes.user} ${getArrangementUserClass(arrangement, classes)}`}>
    <Avatar
      alt=""
      src="/assets/images/defaultUser.png"
      className={`${classes.avatar} ${getArrangementAvatarClass(arrangement, classes)}`}
    />
    <span>{user.nickname}</span>
  </div>
);

export default withStyles(userStyle)(User);
