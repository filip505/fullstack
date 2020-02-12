"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = controller;
exports.patch = exports.dele = exports.update = exports.put = exports.post = exports.get = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getValues(method, sufix, descriptor, middleware) {
  descriptor.value = {
    method,
    sufix: sufix ? sufix : '/',
    value: descriptor.value,
    middlewares: middleware ? descriptor.value.middlewares ? [...descriptor.value.middlewares, middleware] : [middleware] : null
  };
  return descriptor;
}

const get = sufix => (target, property, descriptor) => getValues('get', sufix, descriptor);

exports.get = get;

const post = sufix => (target, property, descriptor) => getValues('post', sufix, descriptor);

exports.post = post;

const put = sufix => (target, property, descriptor) => getValues('put', sufix, descriptor);

exports.put = put;

const update = sufix => (target, property, descriptor) => getValues('update', sufix, descriptor);

exports.update = update;

const dele = sufix => (target, property, descriptor) => getValues('delete', sufix, descriptor);

exports.dele = dele;

const patch = sufix => (target, property, descriptor) => getValues('patch', sufix, descriptor);

exports.patch = patch;

const createMiddleware = middleware => (target, property, descriptor) => {
  descriptor.value.middlewares = descriptor.value.middlewares ? [...descriptor.value.middlewares, middleware] : [middleware];
  return descriptor;
};

function controller(prefix) {
  return function (MyClass) {
    return function () {
      const router = new _koaRouter.default(prefix);
      const elements = Object.values(Object.getOwnPropertyDescriptors(MyClass.prototype));

      for (let element of elements) {
        const {
          method,
          sufix,
          value
        } = element.value;
        let m = value;

        if (method) {
          if (element.value.middlewares) {
            m = element.value.middlewares.reduce((prev, curr) => {
              return curr.bind(null, prev)();
            }, value);
          }

          router[method](prefix + sufix, m);
        }
      }

      return router;
    };
  };
}
//# sourceMappingURL=controller.decorator.js.map