import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('gendiff JSON nested stylish', () => {
  const file1 = getFixturePath('file1_p7.json');
  const file2 = getFixturePath('file2_p7.json');

  const result = genDiff(file1, file2).trim();
  const expected = readFile('expectedStylish.txt').trim();

  expect(result).toBe(expected);
});

test('gendiff YAML nested stylish', () => {
  const file1 = getFixturePath('file1_p7.yaml');
  const file2 = getFixturePath('file2_p7.yaml');

  const result = genDiff(file1, file2).trim();
  const expected = readFile('expectedStylish.txt').trim();

  expect(result).toBe(expected);
});
test('gendiff JSON nested plain', () => {
  const file1 = getFixturePath('file1_p7.json');
  const file2 = getFixturePath('file2_p7.json');

  const result = genDiff(file1, file2, 'plain').trim();
  const expected = readFile('expectedPlain.txt').trim();

  expect(result).toBe(expected);
});
test('gendiff YAML nested plain', () => {
  const file1 = getFixturePath('file1_p7.yaml');
  const file2 = getFixturePath('file2_p7.yaml');

  const result = genDiff(file1, file2, 'plain').trim();
  const expected = readFile('expectedPlain.txt').trim();

  expect(result).toBe(expected);
});
test('gendiff JSON nested json', () => {
  const file1 = getFixturePath('file1_p7.json');
  const file2 = getFixturePath('file2_p7.json');

  const result = genDiff(file1, file2, 'json').trim();
  const expected = readFile('expectedJson.txt').trim();

  expect(result).toBe(expected);
});
test('gendiff YAML nested json', () => {
  const file1 = getFixturePath('file1_p7.yaml');
  const file2 = getFixturePath('file2_p7.yaml');

  const result = genDiff(file1, file2, 'json').trim();
  const expected = readFile('expectedJson.txt').trim();

  expect(result).toBe(expected);
});
