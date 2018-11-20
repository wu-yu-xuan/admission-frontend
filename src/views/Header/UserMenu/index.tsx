import * as React from 'react';
import { Dropdown, Icon } from 'antd';
import userContext from 'src/views/userContext';
import * as style from './style.scss';
import Menus from './Menus';

export default React.memo(function UserMenu() {
  const user = React.useContext(userContext);
  if (!user || !user.isLogin) {
    return null;
  }
  return (
    <Dropdown overlay={<Menus />} className={style.user} placement="bottomRight">
      <span>
        {user.name}
        <Icon type="caret-down" />
      </span>
    </Dropdown>
  )
});