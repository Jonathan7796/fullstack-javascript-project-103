const indentSize = 4;
const getIndent = (depth) => " ".repeat(depth * indentSize-2); // Sin restar 2
const getBracketIndent = (depth) => " ".repeat(depth * indentSize);

const stringify = (value, depth) => {
  if (value === null) return "null";
  if (typeof value !== "object") return String(value);

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) =>
      `${getBracketIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join("\n")}\n${getBracketIndent(depth)}}`;
};

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const indent = getIndent(depth);
    const {
      key, status, value, value1, value2, children,
    } = node;

    switch (status) {
      case "added":
        return `${indent}+ ${key}: ${stringify(value, depth)}`;
      case "removed":
        return `${indent}- ${key}: ${stringify(value, depth)}`;
      case "unchanged":
        return `${indent}  ${key}: ${stringify(value, depth)}`;
      case "changed":
        return [
          `${indent}- ${key}: ${stringify(value1, depth)}`,
          `${indent}+ ${key}: ${stringify(value2, depth)}`,
        ].join("\n");
      case "nested":
        return `${indent}  ${key}: ${formatStylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  });

  return `{\n${lines.join("\n")}\n${getBracketIndent(depth - 1)}}`;
};

module.exports = {
  genDiffStylish: formatStylish,
};
