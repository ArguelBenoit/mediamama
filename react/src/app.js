import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import 'Styles/skeleton.less';
import '@babel/polyfill';
import history from 'Utils/history';
import PrivateRoute from 'Components/privateRoute';
// pages
import Login from 'Pages/login';
import Dashboard from 'Pages/dashboard';
import Profile from 'Pages/profile';
import Dating from 'Pages/dating';
import Messages from 'Pages/messages';
import Members from 'Pages/members';
import Settings from 'Pages/settings';
import Error from 'Pages/error';


class App extends React.Component {
  render() {
    return <Router history={history} >
      <Switch>
        <Route path="/" exact component={Login} title="Login" />
        <PrivateRoute path="/dashboard" exact component={Dashboard} title="Dashboard" />
        <PrivateRoute path="/speedDating" exact component={Dating} title="Dating"/>
        <PrivateRoute path="/messages" exact component={Messages} title="Messages" />
        <PrivateRoute path="/members" exact component={Members} title="Members" />
        <PrivateRoute path="/profile" exact component={Profile} title="Profile"/>
        <PrivateRoute path="/settings" exact component={Settings} title="Settings"/>
        <Route component={Error} />
      </Switch>
    </Router>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
