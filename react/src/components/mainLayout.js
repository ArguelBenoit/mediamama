import React from 'react';
import Header from 'Components/header';
import SideBar from 'Components/sideBar';
import MainContainer from 'Components/mainContainer';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.clickMenu = this.clickMenu.bind(this);
    this.state = {
      small: window.scrollY > 200 ? true : false,
      menu: true
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.resize);
  }
  clickMenu() {
    this.setState({menu: !this.state.menu});
  }
  resize() {
    if(window.scrollY > 200) {
      this.setState({small: true});
    } else {
      this.setState({small: false});
    }
  }
  render() {
    return <div>
      <Header {...this.state} clickMenu={this.clickMenu} />
      <SideBar {...this.state} />
      <MainContainer {...this.state} content={this.props.content} />
    </div>;
  }
}
