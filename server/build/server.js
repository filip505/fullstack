"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _driver = _interopRequireDefault(require("./controller/driver.controller"));

var _fixtures = require("./database/fixtures");

var _http = _interopRequireDefault(require("http"));

var _websockets = _interopRequireDefault(require("./websockets"));

var _koaCors = _interopRequireDefault(require("koa-cors"));

var _worker = _interopRequireDefault(require("./worker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { PORT } from './env'
const PORT = process.env.PORT ? process.env.PORT : 3000;

const server = () => new Promise(async (resolve, reject) => {
  // await createFixtures()
  const app = new _koa.default();

  const server = _http.default.createServer(app.callback());

  const webSockets = new _websockets.default({
    server
  });
  const worker = new _worker.default();
  worker.start(1000);
  app.use((0, _koaCors.default)());
  app.use((0, _koaBodyparser.default)());
  app.use(_driver.default.routes());
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    resolve(server);
  });
});

var _default = server;
exports.default = _default;
//# sourceMappingURL=server.js.map