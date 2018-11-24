import * as React from 'react';
import { container } from './style.scss';
import Title from './Title';
import Form from './Form';
import useRedirect from '../useRedirect';

export default function Login() {
  const [needRedirect, target] = useRedirect();
  if (needRedirect) {
    return target;
  }
  return (
    <section className={container}>
      <Title />
      <Form />
    </section>
  )
}