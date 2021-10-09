// 观察者模式 观察者模式 被观察者模式
// 将所有的观察者都放到被观察者中 基于发布订阅模式

// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.Observers = []
    this.state = 'e'
  }
  attach (Observer) {
    this.Observers.push(Observer)
  }
  setState (newState) {
    this.state = newState
    this.Observers.forEach(Observer => Observer.update(this))
  }
}
class Observer {
  constructor(name) {
    this.name = name
  }
  update (updataObj) {
    console.log(updataObj)
  }
}

let a = new Subject('我是被观察者a')
let b = new Observer('我是观察者b')
let c = new Observer('我是观察者c')
a.attach(b)
a.attach(c)
a.setState('aaaaaaa')