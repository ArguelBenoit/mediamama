import React from 'react';
import SideBar from 'Components/sideBar';
import MainContainer from 'Components/mainContainer';

export default class extends React.Component {
  render() {
    return <div>
      <SideBar />
      <MainContainer />
    </div>;
  }
}
