// 




// node 中也有自己的事件环 single-spa 包含了 i/o操作 从node10 之后和浏览器的顺序一致
// timers  定时器 setInterval 
// poll 轮询 执行i/o回调
// check setImmediate


setTimeout(() => {
  console.log('timer')
}, 0)
Promise.resolve().then(() => {
  console.log('promise')
})
//nextTick 在node 中比promise高
global.process.nextTick(() => {
  console.log(1111)
})
setImmediate(() => {
  console.log('setImmediate')
})