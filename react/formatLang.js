var route = './src/utils/translation/lang/';
var parameterLang = process.argv.slice(2)[0];
var util = require('util');
var en = require(route + 'en.js');
var fs = require('fs');
var lang;

// ------------------------------------------------
function recursiveParse(baseObject, objectParsed) {
  Object.keys(baseObject).forEach(function(key) {

    if (typeof baseObject[key] === 'string') {
      if(!objectParsed[key]) {
        objectParsed[key] = '';
        console.log(`🍺  The key "${key}" is added`);
      }

    } else if (typeof baseObject[key] === 'object') {
      if (!objectParsed[key]) {
        objectParsed[key] = {};
        console.log(`🍕  The key "${key}" is added`);
      }
      recursiveParse(baseObject[key], objectParsed[key]);

    }
  });
}

// ------------------------------------------------
if (!parameterLang) {
  console.log(`
💩 💩 💩

You need use a country code on ISO 639 for build or update one lang file, example:
sudo node formatLang ru

or you can use "all" for update all lang files example:
"sudo node formatLang all"

💩 💩 💩
  `);

} else if (parameterLang === 'all') {
  var array = fs.readdirSync(route);
  array.forEach( e => {
    if(e !== 'en.js') {
      lang = require(route + e);
      recursiveParse(en, lang);
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
        console.log(`🦄  The file ${e} was updated !`);
      });
    }
  });

} else {
  var exists = fs.existsSync(route + parameterLang + '.js');
  if (exists) {
    lang = require(route + parameterLang + '.js');
  } else {
    lang = {};
  }
  recursiveParse(en, lang);
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
    console.log('🦄  The file was updated or created !');
  });

}
