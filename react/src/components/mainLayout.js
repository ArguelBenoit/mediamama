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
      menuActive: undefined,
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
      menuActive: window.innerWidth > 800 ? true : false,
      smallScreen: window.innerWidth > 800 ? false : true
    });
  }
  clickMenu() {
    this.setState({menuActive: !this.state.menuActive});
  }
  render() {
    return <div>
      <Header  {...this.state} clickMenu={this.clickMenu} />
      <SideBar {...this.state} />
      <MainContainer {...this.state} content={this.props.content} />
    </div>;
  }
}
