const { genDiffStylish } = require('./stylish.js');
const { genDiffPlain } = require('./plain.js');
const { genDiffJson } = require('./json.js');

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return genDiffStylish;
    case 'plain':
      return genDiffPlain;
    case 'json':
      return genDiffJson;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

module.exports = getFormatter;
