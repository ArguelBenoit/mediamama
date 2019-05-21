import React from 'react';
import 'Styles/mainContainer.less';

export default props => {
  const style = {
    marginLeft: props.menu ? '240px' : '0px'
  }
  return <div className="mainContainer" style={style}>
    { props.content }
  </div>;
};
