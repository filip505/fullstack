"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _controller = require("../helper/controller.decorator");

var _db = require("../database/db");

var _dec, _dec2, _dec3, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let DriverController = (_dec = (0, _controller.controller)('/driver'), _dec2 = (0, _controller.get)(), _dec3 = (0, _controller.get)('/:id'), _dec(_class = (_class2 = class DriverController {
  async getDrivers(ctx) {
    console.log('drivers id');
    const drivers = await (0, _db.getDrivers)();
    ctx.body = drivers.map(driver => ({
      id: driver.id,
      driverName: driver.driverName
    }));
  }

  async getDriver(ctx, next) {
    console.log('id', ctx.params.id);
    const driver = await (0, _db.getDriver)(ctx.params.id);
    ctx.body = driver;
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getDrivers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getDrivers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDriver", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getDriver"), _class2.prototype)), _class2)) || _class);

var _default = new DriverController();

exports.default = _default;
//# sourceMappingURL=driver.controller.js.map