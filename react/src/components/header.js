import React from 'react';
import 'Styles/header.less';
import PropTypes from 'prop-types';

let Header = props => {
  const { clickMenu, smallScreen } = props;
  return <header className={smallScreen ? 'smallScreen' : ''}>
    <div className="button-menu" onClick={clickMenu}>
      <div />
      <div />
      <div />
    </div>
    <h1>
      MediaMama
    </h1>
  </header>;
};

Header.propTypes = {
  smallScreen: PropTypes.bool,
  clickMenu: PropTypes.func
};

export default Header;
