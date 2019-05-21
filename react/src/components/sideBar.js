import React from 'react';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { TiChartLine } from 'react-icons/ti';
import { FaChevronRight } from 'react-icons/fa';
import { MdSentimentSatisfied } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import LiSideBar from 'Components/liSideBar';
import 'Styles/sideBar.less';

export default props => {
  const style = {
    left: props.menu ? '0px' : '-240px'
  };
  return <div style={style} className={'sideBar ' + (props.small ? 'small' : '')}>
    <ul style={{marginTop: props.small ? '60px' : '90px'}} >
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
};
