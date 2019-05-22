import React from 'react';
import 'Styles/mainContainer.less';

export default props => {
  return <div className={`mainContainer ${props.smallScreen ? 'smallScreen' : ''} ${props.menuActive ? 'menuActive' : ''}`}>
    { props.content }
  </div>;
};
