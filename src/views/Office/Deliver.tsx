import { Button, message } from 'antd';
import * as React from 'react';
import ajax, { Code } from 'src/utility/ajax';

export default function Deliver() {
  return <Button type="primary" size="large" onClick={handleDeliverClick}>投档</Button>
}

async function handleDeliverClick() {
  const json = await ajax({ url: 'office/deliver', method: 'POST' });
  if (json.code === Code.success) {
    message.success('投档成功');
  } else {
    message.error('投档失败或不是投档时间');
  }
}