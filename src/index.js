const path = require("path");
const { readFileSync } = require("fs");
const { getFileExtension, parseFileData } = require("./fileUtils.js");

const genDiff = (filepath1, filepath2, format) => {
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

  // Comparar objetos (esto puede mejorarse)
  return JSON.stringify(data1) === JSON.stringify(data2)
    ? "Los archivos son iguales."
    : "Los archivos tienen diferencias.";
};

module.exports = genDiff;
