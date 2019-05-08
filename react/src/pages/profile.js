import React from 'react';
import SideBar from 'Components/sideBar';
import RightContent from 'Components/rightContent';
// import request from 'Utils/request';

export default class extends React.Component {
  // componentDidMount() {
  //   request('get', '/api/ping')
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // }
  render() {
    return <div>
      <SideBar />
      <RightContent />
    </div>;
  }
}
