import * as React from 'react';
import useRedirect from '../useRedirect';
import MenuRouter, { MenuRouterInfo } from 'src/components/MenuRouter';
import BodyContainer from 'src/components/BodyContainer';
import ContentContainer from 'src/components/ContentContainer';
import { Route, Switch } from 'react-router';
import Grade from './Grade';
import Volunteer from './Volunteer';
import Info from './Info';
import Situation from './Situation';

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
      <ContentContainer>
        <Switch>
          <Route path='/student/grade' component={Grade} />
          <Route path='/student/situation' component={Situation} />
          <Route path='/student/info' component={Info} />
          <Route path='/student' component={Volunteer} />
        </Switch>
      </ContentContainer>
    </BodyContainer>
  )
}