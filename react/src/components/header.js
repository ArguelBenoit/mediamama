import React from 'react';
import 'Styles/header.less';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {
      small: window.scrollY > 200 ? true : false,
      menu: window.innerWidth > 500 ? true : false
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.resize);
  }
  resize() {
    if(window.scrollY > 200) {
      this.setState({small: true});
    } else {
      this.setState({small: false});
    }
  }
  render() {
    const { small, menu } = this.state;
    return <header className={small ? 'small' : ''}>
      {menu ?
        <div className="button-menu">
          <div />
          <div />
          <div />
        </div>
        :
        ''
      }
      <h1>
        MediaMama
      </h1>
    </header>;
  }
}
