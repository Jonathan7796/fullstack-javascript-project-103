const path = require("path");
const yaml = require("js-yaml"); 

const getFileExtension = (filepath) => path.extname(filepath).slice(1); // Extrae la extensión del archivo

const parseFileData = (data, format) => {
  switch (format) {
    case "json":
      return JSON.parse(data);
    case "yml":
    case "yaml":
      return yaml.load(data);
    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
};

module.exports = {
  getFileExtension,
  parseFileData,
};
