import * as React from 'react';
import * as style from './style.scss';
import { Icon, Input, Button, message } from 'antd';
import ajax, { Code } from 'src/utility/ajax';
import userContext from 'src/views/userContext';

export default React.memo(function Form() {
  const [username, handleUsernameChange] = useInput();
  const [password, handlePasswordChange] = useInput();
  const user = React.useContext(userContext);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(username && password)) {
      return;
    }
    const json = await ajax({
      url: 'user/login',
      method: 'POST',
      data: { username, password }
    });
    if (json.code !== Code.success) {
      message.error('用户名或密码错误');
      return;
    }
    user.reload();
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input prefix={<Icon type="user" />} placeholder="Username" size="large" value={username} onChange={handleUsernameChange} />
      <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" size="large" value={password} onChange={handlePasswordChange} />
      <Button
        block={true}
        type="primary"
        htmlType="submit"
        size="large"
        disabled={!(username && password)}
        title={(username && password) ? '登录' : '请输入用户名和密码'}
      >
        登录
      </Button>
    </form>
  )
})

function useInput(): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return [value, handleChange];
}