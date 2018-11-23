import * as React from 'react';
import * as style from './style.scss';

export default React.memo(function Title() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>高考志愿填报系统</h1>
      <div className={style.hr} />
      <p className={style.detail}>服务于考生,招生办,高校招生处的高考志愿填报系统,<br />专注于提升考生高考结束后的体验</p>
    </div>
  )
})