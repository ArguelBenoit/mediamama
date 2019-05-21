import React from 'react';
import Header from 'Components/header';
import SideBar from 'Components/sideBar';
import MainContainer from 'Components/mainContainer';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this);
    this.resize = this.resize.bind(this);
    this.state = {
      menu: undefined,
      smallScreen: undefined
    };
  }
  componentWillMount() {
    this.resize();
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize() {
    this.setState({
      menu: window.innerWidth > 800 ? true : false,
      smallScreen: window.innerWidth > 800 ? false : true
    });
  }
  clickMenu() {
    this.setState({menu: !this.state.menu});
  }
  render() {
    return <div>
      <Header clickMenu={this.clickMenu} />
      <SideBar {...this.state} />
      <MainContainer {...this.state} content={this.props.content} />
    </div>;
  }
}
