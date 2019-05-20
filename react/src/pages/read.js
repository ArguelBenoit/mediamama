import React from 'react';
import SideBar from 'Components/sideBar';
import MainContainer from 'Components/mainContainer';
import Header from 'Components/header';

export default class extends React.Component {
  render() {
    return <div>
      <Header />
      <SideBar />
      <MainContainer />
    </div>;
  }
}
