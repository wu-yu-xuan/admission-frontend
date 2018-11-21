import * as React from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import UserProvider from './UserProvider';

export default React.memo(function App() {
  return (
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </LocaleProvider>
  );
});
