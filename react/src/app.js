import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import 'Styles/skeleton.less';
import '@babel/polyfill';
import history from 'Utils/history';
import PrivateRoute from 'Components/privateRoute';
// pages
import Login from 'Pages/login';
import Read from 'Pages/read';
import Write from 'Pages/write';
import Error from 'Pages/error';


class App extends React.Component {
  render() {
    return <Router history={history} >
      <Switch>
        <Route path="/" exact component={Read} title="Read" />
        <Route path="/categ1" exact component={Read} title="Read" />
        <Route path="/categ2" exact component={Read} title="Read" />
        <Route path="/categ3" exact component={Read} title="Read" />
        <Route path="/login" exact component={Login} title="Login" />
        <PrivateRoute path="/write" exact component={Write} title="Write"/>
        <Route component={Error} />
      </Switch>
    </Router>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
