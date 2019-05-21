import React from 'react';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { TiChartLine } from 'react-icons/ti';
import { FaChevronRight } from 'react-icons/fa';
import { MdSentimentSatisfied } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import LiSideBar from 'Components/liSideBar';
import 'Styles/sideBar.less';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {
      small: window.scrollY > 200 ? true : false
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
    const { small } = this.state;
    return <div className={'sideBar ' + (small ? 'small' : '')}>
      <ul>
        <LiSideBar route="/" name="All news" icon={<TiChartLine />} />
        <LiSideBar route="/categ1" name="Categ 1" icon={<TiChartLine />} />
        <LiSideBar route="/categ2" name="Categ 2" icon={<TiChartLine />} />
        <LiSideBar route="/categ3" name="Categ 3" icon={<TiChartLine />} />
      </ul>
      <ul>
        <LiSideBar route="/login" name="Login" icon={<MdSentimentSatisfied />} small />
        <LiSideBar route="/write" name="write an new article" icon={<MdSentimentSatisfied />} small />
        <LiSideBar route="" name="Logout" icon={<IoMdLogOut />} onClick={() => destroyJwtCookie('/')} small />
      </ul>
      <div className="toggleButton">
        <FaChevronRight />
      </div>
    </div>;
  }
}
