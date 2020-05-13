import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import 'Styles/skeleton.less';
import 'Styles/color.less';
import 'Styles/containerPage.less';
import '@babel/polyfill';
import { browserLanguage } from 'Utils/translation';
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
import Subsribe from 'Pages/subscribe';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this);
    this.resize = this.resize.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.closeSideBarByContainer = this.closeSideBarByContainer.bind(this);
    this.state = {
      menuActive: window.innerWidth > 800 ? true : false || false,
      smallScreen: window.innerWidth > 800 ? false : true || false,
      selectedLang: browserLanguage()
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
  closeSideBarByContainer() {
    const { menuActive, smallScreen } = this.state;
    if (smallScreen && menuActive) {
      this.clickMenu();
    }
  }
  changeLang(selectedLang) {
    this.setState({selectedLang});
    localStorage.setItem('lang', selectedLang);
    location.reload();
  }
  render() {
    const { menuActive, smallScreen, selectedLang } = this.state;
    const classContainer = 'containerPage ' +
      (menuActive ? 'menuActive ' : '') +
      (smallScreen ? 'smallScreen ' : '') +
      (smallScreen && menuActive ? 'blured' : '');
    return <Router history={history} >
      <Header {...this.state} clickMenu={this.clickMenu} />
      <SideBar {...this.state} history={history} changeLang={this.changeLang} lang={selectedLang} />
      <div className={classContainer} onClick={this.closeSideBarByContainer}>
        <div className="container">
          <Switch>
            <Route path="/" exact component={AllNews} />
            <Route path="/categ1" exact component={Categ1} />
            <Route path="/categ2" exact component={Categ2} />
            <Route path="/categ3" exact component={Categ3} />
            <Route path="/login" exact component={Login} />
            <Route path="/subscribe" exact component={Subsribe} />
            <PrivateRoute path="/write" exact component={Write} />
            <Route component={Error} />
          </Switch>
        </div>
      </div>
    </Router>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
