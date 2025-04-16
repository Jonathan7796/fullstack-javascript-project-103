const path = require('path');
const genDiff = require('../src/index.js');  // Ajusta si tu estructura cambia

describe('genDiff', () => {
  const fixturesPath = path.join(__dirname, '__fixtures__');

  const file1Path = path.join(fixturesPath, 'file1.json'); // contiene key1, key2
  const file2Path = path.join(fixturesPath, 'file2.json'); // contiene key1, key2 (key2 con distinto valor)
  const file3Path = path.join(fixturesPath, 'file3.json'); // igual a file1
  const file4Path = path.join(fixturesPath, 'file4.json'); // solo key2
  const txtFilePath = path.join(fixturesPath, 'file1.txt');
  const nonExistentPath = path.join(fixturesPath, 'nonexistent.json');

  it('debería comparar correctamente dos archivos JSON con diferencias', () => {
    const diff = genDiff(file1Path, file2Path, 'json');

    expect(diff).toContain('  - key2: value2');
    expect(diff).toContain('  + key2: value3');
  });

  it('debería devolver "Los archivos son iguales" cuando los archivos sean idénticos', () => {
    const diff = genDiff(file1Path, file3Path, 'json');

    expect(diff).toBe("Los archivos son iguales.");
  });

  it('debería manejar la ausencia de claves en el segundo archivo', () => {
    const diff = genDiff(file1Path, file4Path, 'json');

    expect(diff).toContain('  - key1: value1');
  });

  it('debería lanzar un error si los archivos tienen diferentes extensiones', () => {
    expect(() => genDiff(file1Path, txtFilePath, 'json'))
      .toThrowError('Los archivos deben tener el mismo formato.');
  });

  it('debería lanzar un error si las rutas de los archivos no existen', () => {
    expect(() => genDiff(file1Path, nonExistentPath, 'json'))
      .toThrowError(/ENOENT/);
  });
});
