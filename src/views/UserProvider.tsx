import * as React from 'react';
import userContext, { User } from './userContext';
import ajax, { Code } from 'src/utility/ajax';
import { message } from 'antd';

export default function UserProvider(props: { children: React.ReactNode }) {
  const user = useUser();
  const { Provider } = userContext;
  return (
    <Provider value={user}>
      {props.children}
    </Provider>
  )
}


function useUser() {
  const [user, setUser] = React.useState<User>(null);
  const reload = async () => {
    const json = await ajax<User>({
      url: 'user/info',
      method: 'GET'
    });
    if (json.code !== Code.success) {
      message.error("用户基本信息获取失败");
      return;
    }
    setUser({ ...json.data, reload });
  }
  React.useEffect(() => void reload(), []);
  return user;
}