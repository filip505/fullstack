"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByField = exports.sortAlphabetically = void 0;

const sortAlphabetically = function (field) {
  return function (a, b) {
    if (a[field] < b[field]) {
      return -1;
    }

    if (a[field] > b[field]) {
      return 1;
    }

    return 0;
  };
};

exports.sortAlphabetically = sortAlphabetically;

const filterByField = function (field, value) {
  return data => !data[field].includes(value);
};

exports.filterByField = filterByField;
//# sourceMappingURL=array.helper.js.map