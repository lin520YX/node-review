// 函数柯里化

// 柯里化也是一个高阶函数

// 1.typeof(他是什么类型  不能区分对象) 2.consstructor 判断构造函数
// 3. instanceof 4.Object.prototype.toString.call

// 判断元素的类型

// function isType (typing) {
//   return (...args) => {
//     return Object.prototype.toString.call(...args) == `[object ${typing}]`
//   }
// }
// let utils = {};
// ['String', 'Number', 'Boolean'].forEach(method => {
//   utils[`is` + method] = isType(method)
// });
// console.log(utils.isNumber(123))

// 柯里化函数 的入参每次都是一个
function sum (a, b, c, d) {
  return a + b + c + d
}
const curring = (fn, arr = []) => {
  //arr 收集每次调用传入的参数
  let len = fn.length;
  console.log(fn.length) //指代参数
  return function (...args) {
    let newArgs = [...arr, ...args]
    if (newArgs.length === len) {
      return fn(...newArgs)
    } else {
      return curring(fn, newArgs)
    }
  }
}
// let newSum = curring(sum)
// console.log(newSum(1)(3)(5)(3))



function isType (typing, val) {
  return Object.prototype.toString.call(val) == `[object ${typing}]`
}
let newIsType = curring(isType)
let isString = newIsType('String')
// 偏函数