const EventEmitter = require('events')
const util = require('util')
// let event = new EventEmitter()

function Girl () {

}
util.inherits(Girl, EventEmitter)
// Girl.prototype = Object.create(EventEmitter.prototype)
// Girl.prototype.__proto__ = EventEmitter.prototype
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
let girl = new Girl()
girl.on('newListener', (type) => {
  console.log('type', type)
})
// 只触发一次 触发了之后销毁
// girl.once('aaa', () => {
//   console.log('aaa1')
// })
girl.on('aaa', () => {
  console.log('aaa1')
})
girl.on('aaa', () => {
  console.log('aaa2')
})
let eat = () => {
  console.log('eat1')
}

girl.on('aaa', eat)
// girl.off('aaa', eat)
girl.emit('aaa')
girl.emit('aaa')

