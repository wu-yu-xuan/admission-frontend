import * as React from 'react';
import * as style from './style.scss';

export default function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className={style.content}>
      {children}
    </section>
  )
}