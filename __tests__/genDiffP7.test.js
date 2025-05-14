const path = require("path");
const fs = require("fs");
const genDiff = require("../src/index");

const getFixturePath = (filename) => path.join(__dirname, "__fixtures__", filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), "utf8");

test("gendiff JSON nested stylish", () => {
  const file1 = getFixturePath("file1_p7.json");
  const file2 = getFixturePath("file2_p7.json");
  const expected = readFile("expectedStylish.txt").trim();

  expect(genDiff(file1, file2)).toBe(expected);
});

test("gendiff YAML nested stylish", () => {
  const file1 = getFixturePath("file1_p7.yaml");
  const file2 = getFixturePath("file2_p7.yaml");
  const expected = readFile("expectedStylish.txt").trim();

  expect(genDiff(file1, file2)).toBe(expected);
});
