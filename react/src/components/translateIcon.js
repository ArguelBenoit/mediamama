import React from 'react';
import PropTypes from 'prop-types';
import { MdTranslate } from 'react-icons/md';
import 'Styles/translateIcon.less';

let translateIcon = props => {
//   const { lang } = props;
  return <MdTranslate className="translateIcon" />;
};

translateIcon.propTypes = {
  lang: PropTypes.string
};

export default translateIcon;
