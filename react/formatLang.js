var parameterLang = process.argv.slice(2)[0];
var en = require('./src/utils/translation/lang/en.js');
var fs = require('fs');


function recursiveParse(baseObject, objectParsed) {
  Object.keys(baseObject).forEach(function(key) {

    if (typeof baseObject[key] === 'string') {
      if(!objectParsed[key]) {
        objectParsed[key] = '';
        console.log(`the key "${key}" is added`);
      }

    } else if (typeof baseObject[key] === 'object') {
      if (!objectParsed[key]) {
        objectParsed[key] = {};
        console.log(`the key "${key}" is added`);
      }
      recursiveParse(baseObject[key], objectParsed[key]);

    }
  });
}


if (!parameterLang) {
  console.log('You need use a parameter, example: node formatLang fr');

} else {
  var lang = require(`./src/utils/translation/lang/${parameterLang}.js`);
  recursiveParse(en, lang);
  fs.writeFile('/test.js', lang, function(err) {
    if(err) return console.log(err);
    console.log('The file was updated!');
  });
}
