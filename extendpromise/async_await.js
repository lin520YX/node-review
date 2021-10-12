// async function read () { // switch-case => babel 编译之后就是把一个函数分成多个case 采用指针的方式向下移动
//   let a = await b()
//   let b = await c()
//   return b
// }

// async 方法执行之后返回的是一个promise 
// async + await 是generator 的语法糖
"use strict";

function asyncGeneratorStep (gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error); return;
  }
  if (info.done) {
    resolve(value);
  }
  else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator (fn) {
  return function () {
    var self = this, args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next (value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw (err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function read () {
  return _read.apply(this, arguments);
}

function _read () {
  _read = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee () {
    var a, b;
    return regeneratorRuntime.wrap(function _callee$ (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return b();

          case 2:
            a = _context.sent;
            _context.next = 5;
            return c();

          case 5:
            b = _context.sent;
            return _context.abrupt("return", b);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _read.apply(this, arguments);
}