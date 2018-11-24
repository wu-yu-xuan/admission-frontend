import * as React from 'react';
import useRedirect from '../useRedirect';
import MenuRouter, { MenuRouterInfo } from 'src/components/MenuRouter';
import BodyContainer from 'src/components/BodyContainer';

const menuRouterConfig: MenuRouterInfo[] = [
  {
    text: '填报志愿',
    to: '/student'
  }, {
    text: '查看录取分数线',
    to: '/student/grade'
  }, {
    text: '查看录取情况',
    to: '/student/situation'
  }, {
    text: '查看招生信息',
    to: '/student/info'
  }
];

export default function Student() {
  const [needRedirect, target] = useRedirect();
  if (needRedirect) {
    return target;
  }
  return (
    <BodyContainer>
      <MenuRouter menuRouterInfos={menuRouterConfig} />
    </BodyContainer>
  )
}