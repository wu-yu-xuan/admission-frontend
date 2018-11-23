import * as React from 'react';
import { container } from './style.scss';
import Title from './Title';
import Form from './Form';

export default function Login() {
  return (
    <section className={container} >
      <Title />
      <Form />
    </section>
  )
}