import * as React from 'react';
import * as style from './style.scss';

export default function BodyContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className={style.body}>
      {children}
    </main>
  )
}