var route = './src/utils/translation/lang/';
var parameterLang = process.argv.slice(2)[0];
var util = require('util');
var en = require(route + 'en.js');
var fs = require('fs');
var lang;
var hasModify = {};

// ------------------------------------------------
function recursiveParse(baseObject, objectParsed, langName) {
  Object.keys(baseObject).forEach(function(key) {

    if (typeof baseObject[key] === 'string') {
      if(!objectParsed[key] && objectParsed[key] !== '') {
        objectParsed[key] = '';
        hasModify[langName] = true;
        console.log(`🍕  ${langName}: string key "${key}" is added`);
      }

    } else if (typeof baseObject[key] === 'object') {
      if (!objectParsed[key]) {
        objectParsed[key] = {};
        hasModify[langName] = true;
        console.log(`🍕  ${langName}: object key "${key}" is added`);
      }
      recursiveParse(baseObject[key], objectParsed[key], langName);

    }
  });
}

// ------------------------------------------------
if (!parameterLang) {
  console.log(`
💩 💩 💩 💩 💩 💩

You need use a country code on ISO 639 for build or update one lang file, example:
sudo node formatLang ru

or you can use "all" for update all lang files example:
"sudo node formatLang all"

💩 💩 💩 💩 💩 💩
  `);

} else if (parameterLang === 'all') {
  var array = fs.readdirSync(route);
  array.forEach( e => {
    if(e !== 'en.js') {
      lang = require(route + e);
      recursiveParse(en, lang, e);
      lang = util.inspect(
        lang,
        {
          compact: false,
          depth: Infinity
        }
      );
      const jsText = `module.exports = ${lang};`;
      fs.writeFile(route + e, jsText , function(err) {
        if(err) return console.log(err);
        if(hasModify[e])
          console.log(`🦄  ${e} was updated!`);
        else
          console.log(`🍺  ${e} is already up to date!`);
      });
    }
  });

} else {
  var exists = fs.existsSync(route + parameterLang + '.js');
  var newFile;
  if (exists) {
    newFile = false;
    lang = require(route + parameterLang + '.js');
  } else {
    newFile = true;
    lang = {};
  }
  recursiveParse(en, lang, parameterLang + '.js');
  lang = util.inspect(
    lang,
    {
      compact: false,
      depth: Infinity
    }
  );
  const jsText = `module.exports = ${lang};`;
  fs.writeFile(route + parameterLang + '.js', jsText , function(err) {
    if(err) return console.log(err);
    if(hasModify[parameterLang + '.js'])
      console.log(`🦄  ${parameterLang + '.js'} was ${newFile ? 'created' : 'updated'}!`);
    else
      console.log(`🍺  ${parameterLang + '.js'} is already up to date!`);
  });

}
