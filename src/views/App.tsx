import * as React from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import UserProvider from './UserProvider';
import Student from './Student';
import College from './College';
import Office from './Office';

export default React.memo(function App() {
  return (
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Switch>
            <Route path="/college" component={College} />
            <Route path="/office" component={Office} />
            <Route path="/student" component={Student} />
            <Route path="/" component={Login} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </LocaleProvider>
  );
});
