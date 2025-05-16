const { genDiffStylish } = require('./stylish.js');
const { genDiffPlain } = require('./plain.js');


const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return genDiffStylish;
    case 'plain':
      return genDiffPlain;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

module.exports = getFormatter;
