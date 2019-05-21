import React from 'react';
import Header from 'Components/header';
import SideBar from 'Components/sideBar';
import MainContainer from 'Components/mainContainer';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <Header />
            <SideBar />
            <MainContainer content={this.props.content} />
        </div>;
    }
}
