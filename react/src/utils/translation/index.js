import _ from 'lodash';

let browserLanguage = () => {
  if(localStorage.lang) {
    return localStorage.lang;
  } else {
    let lang = navigator.language || navigator.userLanguage;
    return (lang[0] + lang[1]);
  }
};

let translate = path => {
  let lang = browserLanguage();
  let obj;
  try {
    obj = require(`./lang/${lang}.js`);
  } catch {
    obj = require('./lang/en.js');
  }
  let objEn = require('./lang/en.js');
  let value = _.get(obj, path);
  if (!value || value === '') value = _.get(objEn, path);
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

export {
  translate,
  conversionLang,
  browserLanguage
};
