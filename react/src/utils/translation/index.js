import _ from 'lodash';
import React from 'react';
import TranslateIcon from 'Components/translateIcon';

let translate = path => {

  let lang = navigator.language || navigator.userLanguage;
  lang = lang[0] + lang[1];

  var obj;
  var objEn = require('./lang/en.js');
  let langExists = true;
  try {
    obj = require(`./lang/${lang}.js`);
  } catch {
    obj = require('./lang/en.js');
    langExists = false;
  }

  let value = _.get(obj, path);
  if (!value || value === '') {
    value = [
      _.get(objEn, path),
      langExists ?
        <TranslateIcon key="1" lang={lang} /> :
        ''
    ];
  }

  return value;
};

let conversionLang = {
  ar: 'العربية', // Arabic
  bn: 'বাংলা', // Bengali
  de: 'Deutsch', // German
  en: 'English', // English
  fr: 'Français', // French
  hi: 'हिन्दी ', // Hindi
  it: 'Italiano', // Italian
  ja: '日本語', // Japanese
  ms: 'Bahasa Melayu', // Malay
  pt: 'Português', // Portuguese
  ru: 'русский язык', // Russian
  sv: 'Svenska', // Swedish
  th: 'ไทย', // Thai
  vi: 'Tiếng Việt', // Vietnamese
  zh: '中文' // Chinese
};

export { translate, conversionLang };

/********
example proptypes if you send trad into a props
  translat: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType(
          [
            PropTypes.string,
            PropTypes.element
          ]
        )
      )
    ]
  ).isRequired
***********/