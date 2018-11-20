import * as React from 'react';
import { LocaleProvider, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import userContext, { User } from './userContext';
import ajax, { Code } from 'src/utility/ajax';

export default React.memo(function App() {
  const user = useUser();
  const { Provider } = userContext;
  return (
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Provider value={user}>
          <Header />
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </LocaleProvider>
  );
});

function useUser() {
  const [user, setUser] = React.useState<User>(null);
  const reload = async () => {
    const json = await ajax<User>({
      url: 'user',
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