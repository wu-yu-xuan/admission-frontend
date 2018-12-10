import { EnrollData } from '..';
import * as React from 'react';
import * as style from './style.scss';

interface ProfessionProps {
  data: EnrollData[]
}

export default function Profession({ data }: ProfessionProps) {
  return (
    <>
      <h2>各专业剩余人数</h2>
      <div className={style.professionContainer}>
        {data.map(({ name, population }, index) => (
          <span className={style.profession} key={index}>
            {name}:
            {population <= 0 ? <span className={style.red}>{population}</span> : population}
          </span>
        ))}
      </div>
    </>
  )
}