import * as React from 'react';
import useRedirect from '../useRedirect';
import MenuRouter, { MenuRouterInfo } from 'src/components/MenuRouter';
import BodyContainer from 'src/components/BodyContainer';
import ContentContainer from 'src/components/ContentContainer';
import { Switch, Route } from 'react-router';
import Declare from './Declare';

const menuRouterConfig: MenuRouterInfo[] = [{
  text: '申报招生信息',
  to: '/'
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
          <Route path="/" component={Declare} />
        </Switch>
      </ContentContainer>
    </BodyContainer>
  )
}