
const STATUS = {
  PENDING: 'PENDING',
  FULFIllED: 'FULFIllED',
  REJECTED: 'REJECTED'
}
function resolvePromise (x, promise2, resolve, reject) {
  if (x == promise2) { //防止自己等待自己
    return reject(new TypeError('出错了'))
  } else if (typeof x == 'function' || typeof x == 'object' && x !== null) {
    let called
    try {
      // 如果是then 是一个函数 我就认为他是个函数
      let then = x.then
      if (typeof then == 'function') {
        then.call(x, data => {
          if (called) return
          called = true
          // data 可能还是一个promise
          resolvePromise(data, promise2, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}
class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.val = undefined
    this.reason = undefined
    this.onResolveCallbacks = []
    this.onRejectCallbacks = []
    const resolve = (val) => {
      // 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
      if (val instanceof Promise) {
        return val.then(resolve, reject)
      }
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.FULFIllED
        this.val = val
        this.onResolveCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
        this.onRejectCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onfulfilled, onRejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    let promise2 = new Promise((resolve, reject) => {
      if (this.status == STATUS.FULFIllED) {
        setTimeout(() => {
          try {
            resolvePromise(onfulfilled(this.val), promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status == STATUS.REJECTED) {
        setTimeout(() => {
          try {
            resolvePromise(onRejected(this.reason), promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status == STATUS.PENDING) {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              resolvePromise(onfulfilled(this.val), promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              resolvePromise(onRejected(this.reason), promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  catch (err) {
    this.then(null, err)
  }
  all (promises) {
    return new Promise((resolve, reject) => {
      let result = []
      let timers = 0
      function processData (index, val) {
        result[index] = val
        if (++timers === promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        if (!(promises[i] instanceof Promise)) {
          promises[i].then(data => {
            processData(i, data)
          }, reject)
        } else {
          processData(i, promises[i])
        }
      }
    })
  }
  finally (cb) {
    // 最终的不是try catch finally
    return this.then(data => {
      return Promise.resolve(cb()).then(() => data)
    }, err => {
      return Promise.resolve(cb()).then(() => {
        throw err
      })
    })
  }
  race (promises) {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        const element = promises[index];
        if (element && typeof element == 'function') {
          element.then(resolve, reject)
        } else {
          resolve(element)
        }
      }
    })
  }
  allSettled (promises) {
    return new Promise((resolve, reject) => {
      let result = []
      let timers = 0
      function processData (index, val) {
        result[index] = val
        if (++timers === promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        if (!(promises[i] instanceof Promise)) {
          promises[i].then(data => {
            processData(i, data)
          }, err => {
            processData(i, err)
          })
        } else {
          processData(i, promises[i])
        }
      }
    })
  }
  static resolve (val) {
    return new Promise((resolve) => {
      resolve(val)
    })
  }
  static reject (err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
}
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise