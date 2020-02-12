"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFixtures = exports.deleteFixtures = exports.createUser = void 0;

var _randopeep = _interopRequireDefault(require("randopeep"));

var _fileSync = require("../helper/fileSync.helper");

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUser = async () => {
  const file = await (0, _fileSync.readFile)('./index.get.json', 'utf8');
  var list = JSON.parse(file);
  var data = {
    id: _uuid.default.v1(),
    driverName: _randopeep.default.name(),
    driverCityOrigin: _randopeep.default.address.city(),
    driverLanguage: ['de', 'en', 'nl', 'fr', 'es', 'ar'][Math.floor(Math.random() * 7)],
    driverPhone: _randopeep.default.address.phone(),
    driverGender: ['male', 'female'][Math.floor(Math.random() * 2)],
    driverInfo: _randopeep.default.corporate.catchPhrase(0),
    carMake: _randopeep.default.corporate.name('large', 0),
    kmDriven: Math.floor(Math.random() * 100000),
    location: _randopeep.default.address.geo()
  };
  list.push(data);
  await (0, _fileSync.writeFile)("./index.get.json", JSON.stringify(list));
  return data;
};

exports.createUser = createUser;

const deleteFixtures = async () => {
  await (0, _fileSync.writeFile)("./index.get.json", JSON.stringify([]));
};

exports.deleteFixtures = deleteFixtures;

const createFixtures = async () => {
  await deleteFixtures(); // mock 10 users

  for (let i = 0; i < 10; i++) {
    await createUser();
  }
};

exports.createFixtures = createFixtures;
//# sourceMappingURL=fixtures.js.map