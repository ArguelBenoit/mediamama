import React from 'react';
import MainLayout from 'Components/mainLayout';
import Login from 'Components/login';

export default class extends React.Component {
  render() {
    return <div>
      <MainLayout content={<Login />} />
    </div>;
  }
}