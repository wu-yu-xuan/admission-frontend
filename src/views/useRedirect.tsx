import * as React from 'react';
import userContext, { Identity } from './userContext';
import { Redirect } from 'react-router';

const identityMap = new Map([
  [Identity.student, '/student'],
  [Identity.office, '/office'],
  [Identity.college, '/college']
])

export default function useRedirect(): [boolean, JSX.Element] {
  let needRedirect = false;
  const user = React.useContext(userContext);
  const { pathname } = location;
  let target: JSX.Element = null;
  if (user) {
    if (user.isLogin && user.identity !== Identity.unknown) {
      const path = identityMap.get(user.identity) || '/';
      if (!pathname.startsWith(path)) {
        needRedirect = true;
        target = <Redirect to={path} />
      }
    } else {
      for (const path of Array.from(identityMap.values())) {
        if (pathname.startsWith(path)) {
          needRedirect = true;
          target = <Redirect to='/' />
        }
      }
    }
  }
  return [needRedirect, target];
}