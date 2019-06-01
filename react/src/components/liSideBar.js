import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'Styles/liSideBar.less';

let LiSideBar = props => {
  const {
    route,
    icon,
    name,
    small,
    location
  } = props;
  return <Link className="liSideBar" to={route}>
    <li className={`${location === route ? 'active' : ''} ${small ? 'small' : ''}`}>
      {icon}
      <span>
        {name}
      </span>
    </li>
  </Link>;
};

LiSideBar.defaultProps = {
  small: false,
  location: ''
};

LiSideBar.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType(
          [
            PropTypes.string,
            PropTypes.element
          ]
        )
      )
    ]
  ).isRequired,
  icon: PropTypes.element,
  small: PropTypes.bool,
  location: PropTypes.string
};

export default LiSideBar;
