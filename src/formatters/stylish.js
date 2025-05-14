const stringify = (value, depth) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return String(value);
  }

  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diffTree, depth = 1) => {
  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize - 2);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = diffTree.map((node) => {
    switch (node.status) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.newValue, depth)}`
        ].join('\n');
      case 'nested':
        return `${currentIndent}  ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${' '.repeat(indentSize)}  }`;
      default:
        throw new Error(`Unknown status: ${node.status}`);
    }
  });

  return lines.join('\n');
};

module.exports = (diffTree) => `{\n${formatStylish(diffTree)}\n}`;
