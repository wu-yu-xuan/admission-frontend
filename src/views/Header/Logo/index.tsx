import * as React from 'react';
import { Link } from 'react-router-dom';
import * as style from './style.scss';

export default React.memo(function Logo() {
  return (
    <Link to='/' className={style.logo}>Admssion</Link>
  )
})