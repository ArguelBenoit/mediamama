import React from 'react';
import SideBar from 'Components/sideBar';
import RightContent from 'Components/rightContent';

export default class extends React.Component {
  render() {
    return <div>
      <SideBar />
      <RightContent />
    </div>;
  }
}
