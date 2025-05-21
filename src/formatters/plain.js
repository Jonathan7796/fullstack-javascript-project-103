const formatValue = require('../utils/formatValue.js');

const formatPlain = (tree, parent = '') => {
  const lines = tree.flatMap((node) => {
    const fullPath = parent ? `${parent}.${node.key}` : node.key;

    switch (node.status) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'nested':
        return formatPlain(node.children, fullPath);
      default:
        return [];
    }
  });

  return lines.join('\n');
};

module.exports = {
  genDiffPlain: formatPlain,
};
