import React from 'react';
import 'Styles/mainContainer.less';

export default props => {
  return <div className="mainContainer">
    {
      props.content ?
        props.content :
        ''
    }
  </div>;
};
