import { withRouter, RouteComponentProps } from 'react-router';
import { Menu } from 'antd';
import * as React from 'react';
import * as style from './style.scss';
import { Link } from 'react-router-dom';

const { Item } = Menu;

export interface MenuRouterInfo {
  text: React.ReactNode;
  to: string;
}

interface MenuRouterProps {
  menuRouterInfos: MenuRouterInfo[];
}

export default withRouter(function MenuRouter({ menuRouterInfos, history }: MenuRouterProps & RouteComponentProps<{}>) {
  return (
    <Menu
      mode="inline"
      theme="light"
      defaultSelectedKeys={["0"]}
      className={style.menu}
      inlineIndent={150}
    >
      {menuRouterInfos.map(({ text, to }, key) => (
        <Item key={key}>
          <Link to={to}>{text}</Link>
        </Item>
      ))}
    </Menu>
  )
});