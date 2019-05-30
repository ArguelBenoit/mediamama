import React from 'react';
import history from 'Utils/history';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { TiChartLine } from 'react-icons/ti';
import { FaChevronRight } from 'react-icons/fa';
import { MdSentimentSatisfied } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import LiSideBar from 'Components/liSideBar';
import PropTypes from 'prop-types';
import 'Styles/sideBar.less';
import lang from 'Utils/translation';

const firstUl = [
  {
    route: '/',
    name: 'All news',
    icon: <TiChartLine />
  }, {
    route: '/categ1',
    name: 'Categ 1',
    icon: <TiChartLine />
  }, {
    route: '/categ2',
    name: 'Categ 2',
    icon: <TiChartLine />
  }, {
    route: '/categ3',
    name: 'Categ 3',
    icon: <TiChartLine />
  }
];

const secondUl = [
  {
    route: '/login',
    name: lang('menu.login'),
    icon: <MdSentimentSatisfied />
  }, {
    route: '/subscribe',
    name: lang('menu.subscribe'),
    icon: <MdSentimentSatisfied />
  }, {
    route: '/write',
    name: 'Write',
    icon: <MdSentimentSatisfied />
  }
];

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: window.location.pathname
    };
  }
  componentDidMount() {
    history.listen( ({ pathname }) =>  {
      this.setState({ location: pathname });
    });
  }
  render() {
    const { location } = this.state;
    const className = `sideBar ${this.props.menuActive ? 'menuActive' : ''}`;
    return <div className={className}>
      <ul>
        {
          firstUl.map(
            (e, i) => <LiSideBar
                        key={'firstMenu' + i}
                        route={e.route}
                        name={e.name}
                        icon={e.icon}
                        location={location}
                      />
          )
        }
      </ul>
      <ul>
        {
          secondUl.map(
            (e ,i) => <LiSideBar
                        key={'secondMenu' + i}
                        route={e.route}
                        name={e.name}
                        icon={e.icon}
                        location={location}
                        onClick={e.onClick ? e.onClick : ''}
                        small
                      />
          )
        }
        <LiSideBar
          route=""
          name="Logout"
          icon={<IoMdLogOut />}
          location="noLocation"
          onClick={() => destroyJwtCookie('/')}
          small
        />
      </ul>
      <div className="toggleButton">
        <FaChevronRight />
      </div>
    </div>;
  }
}

SideBar.propTypes = {
  menuActive: PropTypes.bool
};

export default SideBar;
