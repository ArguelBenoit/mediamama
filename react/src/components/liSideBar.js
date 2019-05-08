import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'Styles/liSideBar.less';

class LiSideBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { route, icon, name, small } = this.props;
    const pathname = window.location.pathname;
    return <Link className="liSideBar" to={route}>
      <li className={`${pathname === route ? 'active' : ''} ${small ? 'small' : ''}`}>
        {icon}
        <span>
          {name}
        </span>
      </li>
    </Link>;
  }
}

LiSideBar.defaultProps = {
  small: false
};

LiSideBar.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  small: PropTypes.bool
};

export default LiSideBar;
