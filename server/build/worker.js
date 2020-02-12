"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = require("./database/db");

var _randopeep = _interopRequireDefault(require("randopeep"));

var _fileSync = require("./helper/fileSync.helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Worker {
  start(time) {
    this.updateLocaton().then(() => {
      setTimeout(() => this.start(time), time);
    });
  }

  async updateLocaton() {
    const drivers = await (0, _db.getDrivers)();

    for (let driver of drivers) {
      driver.location = _randopeep.default.address.geo();
    }

    await (0, _fileSync.writeFile)("./index.get.json", JSON.stringify(drivers));
    console.log('change');
  }

}

var _default = Worker;
exports.default = _default;
//# sourceMappingURL=worker.js.map