import * as React from 'react';
import useRedirect from '../useRedirect';
import MenuRouter, { MenuRouterInfo } from 'src/components/MenuRouter';
import BodyContainer from 'src/components/BodyContainer';
import ContentContainer from 'src/components/ContentContainer';
import { Switch, Route } from 'react-router';
import Declare from './Declare';
import { Special, Unity, Adjust } from './Enroll';

const menuRouterConfig: MenuRouterInfo[] = [{
  text: '申报招生信息',
  to: '/college'
}, {
  text: '特招',
  to: '/college/special'
}, {
  text: '统招',
  to: '/college/unity'
}, {
  text: '调招',
  to: '/college/adjust'
}];

export default function College() {
  const [needRedirect, target] = useRedirect();
  if (needRedirect) {
    return target;
  }
  return (
    <BodyContainer>
      <MenuRouter menuRouterInfos={menuRouterConfig} />
      <ContentContainer>
        <Switch>
          <Route path="/college/special" component={Special} />
          <Route path="/college/unity" component={Unity} />
          <Route path="/college/adjust" component={Adjust} />
          <Route path="/college" component={Declare} />
        </Switch>
      </ContentContainer>
    </BodyContainer>
  )
}