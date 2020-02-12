"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDriver = exports.getDrivers = void 0;

var _fileSync = require("../helper/fileSync.helper");

const db = {
  getDriver: async id => {
    const file = await (0, _fileSync.readFile)('./index.get.json', 'utf8');
    const list = JSON.parse(file);
    return list.find(driver => driver.id === id);
  },
  getDrivers: async () => {
    const file = await (0, _fileSync.readFile)('./index.get.json', 'utf8');
    const list = JSON.parse(file);
    return list;
  }
};
const getDrivers = db.getDrivers;
exports.getDrivers = getDrivers;
const getDriver = db.getDriver;
exports.getDriver = getDriver;
//# sourceMappingURL=db.js.map