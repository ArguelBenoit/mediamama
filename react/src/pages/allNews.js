import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      smallScreen,
      menuActive,
      content
    } = this.props;
    const className = `mainContainer ${smallScreen ? 'smallScreen' : ''} ${menuActive ? 'menuActive' : ''}`;
    return <div className={className}>
      { content }
    </div>;
  }
}
