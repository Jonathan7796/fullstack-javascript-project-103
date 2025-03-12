const path = require("path");
const { readFileSync } = require("fs");
const _ = require("lodash");
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

  // Obtener las claves de ambos archivos y ordenarlas alfabéticamente
  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

   // Generar las diferencias
  const diff = allKeys.map((key) => {
    if (!data2.hasOwnProperty(key)) {
      // Si la clave está solo en el primer archivo
      return `  - ${key}: ${data1[key]}`;
    }
    if (!data1.hasOwnProperty(key)) {
      // Si la clave está solo en el segundo archivo
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      // Si los valores de la clave son diferentes
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    // Si las claves y valores son iguales
    return null;
  }).filter(line => line !== null).join("\n");

  // Si no hay diferencias, indicar que los archivos son iguales
  return diff.length > 0 ? diff : "Los archivos son iguales.";
};

module.exports = genDiff;
