import * as React from 'react';
import useRedirect from '../useRedirect';

export default function College(){
  const [needRedirect, target] = useRedirect();
  if (needRedirect) {
    return target;
  }
  return <div />
}