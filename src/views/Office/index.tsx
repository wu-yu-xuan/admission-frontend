import * as React from 'react';
import useRedirect from '../useRedirect';
import MenuRouter, { MenuRouterInfo } from 'src/components/MenuRouter';
import BodyContainer from 'src/components/BodyContainer';
import ContentContainer from 'src/components/ContentContainer';
import { Route, Switch } from 'react-router';
import Approval from './Approval';
import Deliver from './Deliver';

const menuRouterConfig: MenuRouterInfo[] = [{
  text: '审批',
  to: '/office'
}, {
  text: '投档',
  to: '/office/deliver'
}];

export default function Office() {
  const [needRedirect, target] = useRedirect();
  if (needRedirect) {
    return target;
  }
  return (
    <BodyContainer>
      <MenuRouter menuRouterInfos={menuRouterConfig} />
      <ContentContainer>
        <Switch>
          <Route path="/office/deliver" component={Deliver} />
          <Route path="/office" component={Approval} />
        </Switch>
      </ContentContainer>
    </BodyContainer>
  )
}