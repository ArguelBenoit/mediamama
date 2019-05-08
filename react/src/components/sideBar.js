import React from 'react';
import { destroyJwtCookie } from 'Utils/jwtCookie';
import { TiChartLine, TiFlash } from 'react-icons/ti';
import { FaStreetView, FaChevronRight } from 'react-icons/fa';
import { MdSentimentSatisfied } from 'react-icons/md';
import { IoIosChatbubbles, IoIosSettings, IoMdLogOut } from 'react-icons/io';
import LiSideBar from 'Components/liSideBar';
import 'Styles/sideBar.less';

export default class extends React.Component {
  render() {
    return <div className="sideBar">
      <div className="logo">
        Logotype<br />here !
      </div>
      <ul>
        <LiSideBar route="/dashboard" name="Dashboard" icon={<TiChartLine />} />
        <LiSideBar route="/messages" name="Messages" icon={<IoIosChatbubbles />} />
        <LiSideBar route="/speedDating" name="Speed dating" icon={<TiFlash />} />
        <LiSideBar route="/members" name="Members" icon={<FaStreetView />} />
      </ul>
      <ul>
        <LiSideBar route="/profile" name="Profile" icon={<MdSentimentSatisfied />} small />
        <LiSideBar route="/settings" name="Settings" icon={<IoIosSettings />} small />
        <LiSideBar route="/" name="Logout" icon={<IoMdLogOut />} onClick={() => destroyJwtCookie('/')} small />
      </ul>
      <div className="toggleButton">
        <FaChevronRight />
      </div>
    </div>;
  }
}
