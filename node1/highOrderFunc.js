// 高阶函数“两个特点满足一个就是高阶函数”
// 1 我们给一个函数传入一个函数
// 2 一个函数返回一个函数

// 装饰器模式 对原本功能进行包装

// function a () {

// }
// a(() => { })

function core (a, b, c) {
  console.log('core', a, b, c)
}

Function.prototype.before = function (beforeFn) {
  return (...args) => { //箭头函数中没有this 没有arguments 没有prototype
    beforeFn()
    this(...args)
  }
}
let newFn = core.before(() => {
  console.log('core before')
})
newFn(1, 2, 3)

// 闭包 定义函数的作用域 和调用的作用域是同一个