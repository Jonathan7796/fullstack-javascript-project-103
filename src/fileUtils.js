import path from 'path';
import yaml from 'js-yaml';

// eslint-disable-next-line max-len
export const getFileExtension = (filepath) => path.extname(filepath).slice(1); // Extrae la extensión del archivo

export const parseFileData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
};
