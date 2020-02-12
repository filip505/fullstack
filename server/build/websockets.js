"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ws = _interopRequireDefault(require("ws"));

var _uuid = _interopRequireDefault(require("uuid"));

var _db = require("./database/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebSockets extends _ws.default.Server {
  constructor(server) {
    super(server);
    this.connections = [];
    this.on('connection', ws => {
      const id = _uuid.default.v1();

      ws.id = id;
      console.log('IDIDID', id);
      ws.on('message', message => {
        console.log('received: %s', message);
        ws.driverId = message;
      });
      ws.on('close', () => {
        this.connections = this.connections.filter(ws => {
          console.log('disconnected', ws.id, id);
          return ws.id !== id;
        });
      });
      this.connections.push(ws);
    });
    this.sendLocation();
  }

  sendLocation() {
    (0, _db.getDrivers)().then(list => {
      const drivers = list.reduce((drivers, driver) => {
        drivers[driver.id] = driver;
        return drivers;
      }, {});
      console.log('connection size', this.connections.length);

      for (let ws of this.connections) {
        try {
          ws.send(JSON.stringify(drivers[ws.driverId].location));
        } catch (e) {
          this.connections = this.connections.filter(item => ws.id === item.id);
        }
      }

      setTimeout(() => this.sendLocation(), 1000);
    });
  }

}

var _default = WebSockets;
exports.default = _default;
//# sourceMappingURL=websockets.js.map