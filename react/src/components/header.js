import React from 'react';
import 'Styles/header.less';

export default props => {
  const { small, menu, clickMenu } = props;
  return <header className={small ? 'small' : ''}>
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
