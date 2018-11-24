import * as React from 'react';
import * as style from './style.scss';

export default React.memo(function ContentTitle({ children }: { children: React.ReactNode }) {
  return <h1 className={style.title}>{children}</h1>
});