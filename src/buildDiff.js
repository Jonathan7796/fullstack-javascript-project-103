const _ = require("lodash");

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    if (!Object.hasOwn(data2, key)) {
      return { key, status: 'removed', value: val1 };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, status: 'added', value: val2 };
    }
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { key, status: 'nested', children: buildDiff(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return { key, status: 'changed', oldValue: val1, newValue: val2 };
    }
    return { key, status: 'unchanged', value: val1 };
  });
};

module.exports = buildDiff;
