import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js'; // Ajusta si tu estructura cambia

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
describe('genDiff', () => {
  const fixturesPath = path.join(__dirname, '__fixtures__');

  const file1Path = path.join(fixturesPath, 'file1.json'); // contiene key1, key2
  const file2Path = path.join(fixturesPath, 'file2.json'); // contiene key1, key2 (key2 con distinto valor)
  const file3Path = path.join(fixturesPath, 'file3.json'); // igual a file1
  const file4Path = path.join(fixturesPath, 'file4.json'); // solo key2
  const txtFilePath = path.join(fixturesPath, 'file1.txt');
  const nonExistentPath = path.join(fixturesPath, 'nonexistent.json');

  // Test para YML
  const yamlFile1Path = path.join(fixturesPath, 'file1.yml');
  const yamlFile2Path = path.join(fixturesPath, 'file2.yml');

  it('compara correctamente dos archivos YAML con diferencias', () => {
    const diff = genDiff(yamlFile1Path, yamlFile2Path);
    expect(diff).toContain('- timeout: 50');
    expect(diff).toContain('+ timeout: 20');
    expect(diff).toContain('+ verbose: true');
  });

  it('compara correctamente dos archivos JSON con diferencias', () => {
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toContain('- key2: value2');
    expect(diff).toContain('+ key2: value3');
  });

  it('no muestra cambios si los archivos son iguales', () => {
    const diff = genDiff(file1Path, file3Path);
    expect(diff).not.toMatch(/[+-]/); // no debería haber líneas con '+' o '-'
  });

  it('maneja correctamente claves faltantes en el segundo archivo', () => {
    const diff = genDiff(file1Path, file4Path);
    expect(diff).toContain('- key1: value1');
  });

  it('lanza error si los archivos tienen diferentes extensiones', () => {
    expect(() => genDiff(file1Path, txtFilePath))
      .toThrow('Los archivos deben tener el mismo formato.');
  });

  it('lanza error si uno de los archivos no existe', () => {
    expect(() => genDiff(file1Path, nonExistentPath))
      .toThrow(/ENOENT/); // error típico de fs cuando un archivo no existe
  });
});
