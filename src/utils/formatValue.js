const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

module.exports = formatValue;
