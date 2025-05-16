const formatJson = (diffTree) => JSON.stringify(diffTree, null, 2);

module.exports = {
  genDiffJson: formatJson,
};
