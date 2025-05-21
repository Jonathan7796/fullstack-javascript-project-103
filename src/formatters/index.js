import genDiffStylish from './stylish.js';
import genDiffPlain from './plain.js';
import genDiffJson from './json.js';

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

export default getFormatter;
