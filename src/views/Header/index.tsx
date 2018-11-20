import * as React from 'react';
import * as style from './style.scss';
import Logo from './Logo';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className={style.header} >
      <Logo />
      <UserMenu />
    </header>
  );
}