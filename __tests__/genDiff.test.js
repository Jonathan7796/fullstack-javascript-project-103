// __tests__/genDiff.test.js
const path = require('path');
const genDiff = require('../src');  // Ajusta la ruta si es necesario

describe('genDiff', () => {
  const fixturesPath = path.join(__dirname, '__fixtures__'); // Ruta a los archivos de prueba

  // Rutas a los archivos JSON de prueba
  const file1Path = path.join(fixturesPath, 'file1.json');
  const file2Path = path.join(fixturesPath, 'file2.json');
  const file3Path = path.join(fixturesPath, 'file3.json');

  it('debería comparar correctamente dos archivos JSON con diferencias', () => {
    const diff = genDiff(file1Path, file2Path, 'json');
    
    expect(diff).toContain('- key1: value1');
    expect(diff).toContain('+ key2: value2');
  });

  it('debería devolver "Los archivos son iguales" cuando los archivos sean idénticos', () => {
    const diff = genDiff(file2Path, file3Path, 'json');
    
    expect(diff).toBe("Los archivos son iguales.");
  });

  it('debería manejar la ausencia de claves en el segundo archivo', () => {
    const diff = genDiff(file1Path, file3Path, 'json');
    
    expect(diff).toContain('- key1: value1');
    expect(diff).toContain('+ key2: value2');
    expect(diff).toContain('+ key3: value3');
  });

  it('debería lanzar un error si los archivos tienen diferentes extensiones', () => {
    const invalidFilePath = path.join(fixturesPath, 'file1.txt');
    
    expect(() => genDiff(file1Path, invalidFilePath, 'json')).toThrowError('Los archivos deben tener el mismo formato.');
  });

  it('debería lanzar un error si las rutas de los archivos no existen', () => {
    const invalidFilePath = path.join(fixturesPath, 'nonexistent.json');
    
    expect(() => genDiff(file1Path, invalidFilePath, 'json')).toThrowError(/ENOENT/);
  });
});
