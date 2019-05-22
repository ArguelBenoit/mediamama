import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import 'Styles/main.less';
import '@babel/polyfill';
import history from 'Utils/history';
import PrivateRoute from 'Components/privateRoute';
import Header from 'Components/header';
import SideBar from 'Components/sideBar';
// pages
import AllNews from 'Pages/allNews';
import Categ1 from 'Pages/categ1';
import Categ2 from 'Pages/categ2';
import Categ3 from 'Pages/categ3';
import Login from 'Pages/login';
import Error from 'Pages/error';
import Write from 'Pages/write';



class App extends React.Component {
  constructor (props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this);
    this.resize = this.resize.bind(this);
    this.state = {
      menuActive: undefined,
      smallScreen: undefined
    };
  }
  componentWillMount() {
    this.resize();
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize() {
    this.setState({
      menuActive: window.innerWidth > 800 ? true : false,
      smallScreen: window.innerWidth > 800 ? false : true
    });
  }
  clickMenu() {
    this.setState({menuActive: !this.state.menuActive});
  }
  render() {
    return <Router history={history} >
      <Header {...this.state} clickMenu={this.clickMenu} />
      <SideBar {...this.state} />
      <Switch>
        <Route path="/" exact render={() => <AllNews {...this.state} />} title="mediamama - all news" />
        <Route path="/categ1" exact component={Categ1} title="Categ 1" />
        <Route path="/categ2" exact component={Categ2} title="Categ 2" />
        <Route path="/categ3" exact component={Categ3} title="Categ 3" />
        <Route path="/login" exact component={Login} title="Login" />
        <PrivateRoute path="/write" exact component={Write} title="Write an article"/>
        <Route component={Error} />
      </Switch>
    </Router>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
