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

export default function MenuRouter({ menuRouterInfos }: MenuRouterProps) {
  const sortInfos = [...menuRouterInfos].sort((a, b) => b.to.length - a.to.length);
  const activeKey = menuRouterInfos.findIndex(value => value === sortInfos[sortInfos.findIndex(({ to }) => location.pathname.startsWith(to))]);
  return (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={[activeKey.toString()]}
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
}