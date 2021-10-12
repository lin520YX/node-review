//代码的执行顺序  事件环

// 计算机中调度任务分配任务的单位是进程
// 进程中包含线程
// 浏览器是一个多进程模型 每一个页签都是一个进程
// 主进程->用户界面
// 渲染进程-> 浏览器内核 js ui 渲染
// 处理请求，网络进程 绘图进程 gpu渲染进程 插件独立的进程


// 渲染进程 ->线程 
// js的主线程 是单线程 ui渲染和js共用线程 互斥的 从上倒下依次执行
// 事件 定时器 ajax 都是其他的线程都包含在主线程中
// webworker 工作线程he主线程不平等 (主线程中可以操作dom)

// 常见的异步方法 宏任务（宿主环境提供的异步方法都是宏任务）、微任务（语言本身提供的 promise.then mutationObserver） 

// 整个微任务和宏任务的调度顺序是怎么样的

function a () {
  console.log('a')
  function b () {
    console.log('b')
    setTimeout(() => {
      Promise.resolve().then(res => {
        console.log('p2')
      })
      console.log('s1')

      Promise.resolve().then(res => {
        console.log('p3')
      })
    })
    Promise.resolve().then(res => {
      console.log('p')
    })
    function c () {
      console.log('c')

    }
    c()
  }
  b()
}
a()

