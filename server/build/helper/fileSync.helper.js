"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.readFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFile = (uri, format) => new Promise((resolve, reject) => {
  _fs.default.readFile(uri, format, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

exports.readFile = readFile;

const writeFile = (uri, file) => new Promise((resolve, reject) => {
  _fs.default.writeFile(uri, file, err => {
    if (err) reject(err);
    resolve();
  });
});

exports.writeFile = writeFile;
//# sourceMappingURL=fileSync.helper.js.map