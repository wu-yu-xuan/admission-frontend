import * as React from 'react';
import { Menu, Icon, message } from 'antd';
import userContext from 'src/views/userContext';
import ajax, { Code } from 'src/utility/ajax';
import * as style from './style.scss';
import * as screenfull from 'screenfull';

const { Item } = Menu;

export default React.memo(function Menus() {
  const [isFullscreen, toggoleFullscreen] = useFullscreen();
  const handleLogoutClick = useLogout();
  return (
    <Menu className={style.menu} selectable={false}>
      <Item>
        <p onClick={toggoleFullscreen}>
          <Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"} theme="outlined" />
          {isFullscreen ? "退出全屏" : "全屏模式"}
        </p>
      </Item>
      <Item>
        <p onClick={handleLogoutClick}><Icon type="logout" />退出登录</p>
      </Item>
    </Menu>
  );
})

function useFullscreen(): [boolean, (e: React.MouseEvent) => void] {
  const [isFullscreen, setIsFullscreen] = React.useState(screenfull && screenfull.isFullscreen);
  const toggoleFullscreen = (e: React.MouseEvent) => {
    if (!screenfull) {
      return;
    }
    if (!screenfull.enabled) {
      message.error("您的浏览器不支持全屏模式");
      return;
    }
    if (screenfull.isFullscreen) {
      screenfull.exit();
      setIsFullscreen(false);
    } else {
      screenfull.request();
      setIsFullscreen(true);
    }
  }
  return [isFullscreen, toggoleFullscreen];
}

function useLogout() {
  const user = React.useContext(userContext);
  return async (e: React.MouseEvent) => {
    const json = await ajax({
      url: 'logout',
      method: 'POST'
    });
    if (json.code === Code.success) {
      user.reload();
    } else {
      message.error("退出登录失败");
    }
  }
}