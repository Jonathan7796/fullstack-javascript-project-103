const path = require("path");
const { readFileSync } = require("fs");
const _ = require("lodash");
const { getFileExtension, parseFileData } = require("./fileUtils.js");
const buildDiff = require("./buildDiff.js");
const getFormatter = require("./formatters/index.js");

const genDiff = (filepath1, filepath2, format="stylish") => {
  // Convertir rutas a absolutas
  const absPath1 = path.resolve(process.cwd(), filepath1);
  const absPath2 = path.resolve(process.cwd(), filepath2);

  // Leer contenido de los archivos
  const fileData1 = readFileSync(absPath1, "utf8");
  const fileData2 = readFileSync(absPath2, "utf8");

  // Determinar el formato según la extensión
  const ext1 = getFileExtension(filepath1);
  const ext2 = getFileExtension(filepath2);

  if (ext1 !== ext2) {
    throw new Error("Los archivos deben tener el mismo formato.");
  }

  // Parsear datos según el formato
  const data1 = parseFileData(fileData1, ext1);
  const data2 = parseFileData(fileData2, ext2);

  const diffTree = buildDiff(data1, data2);
  const formatter = getFormatter(format);

  return formatter(diffTree);
};

module.exports = genDiff;
