import _ from 'lodash';
import React from 'react';
import TranslateIcon from 'Components/translateIcon';

export default path => {

  let lang = navigator.language || navigator.userLanguage;
  lang = lang[0] + lang[1];

  var obj;
  var objEn = require('./lang/en.js');
  try {
    obj = require(`./lang/${lang}.js`);
  } catch {
    obj = require('./lang/en.js');
  }

  let value = _.get(obj, path);
  if (!value || value === '') {
    value = [
      _.get(objEn, path),
      <TranslateIcon key="1" lang={lang} />
    ];
  }

  return value;
};