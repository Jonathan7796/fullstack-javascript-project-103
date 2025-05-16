const _ = require('lodash');

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2) && !Array.isArray(value1) && !Array.isArray(value2)) {
      return {
        key,
        status: 'nested',
        children: buildDiff(value1, value2),
      };
    }

    if (!_.has(obj2, key)) {
      return { key, status: 'removed', value: value1 };
    }

    if (!_.has(obj1, key)) {
      return { key, status: 'added', value: value2 };
    }

    if (!_.isEqual(value1, value2)) {
      return { key, status: 'changed', value1, value2 };
    }

    return { key, status: 'unchanged', value: value1 };
  });
};

module.exports = buildDiff;
