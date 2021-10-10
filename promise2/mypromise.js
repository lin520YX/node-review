const STATUS = {
  PENDING: 'PENDING',
  FULFIllED: 'FULFIllED',
  REJECTED: 'REJECTED'
}
function resolvePromise (x, promise2, resolve, reject) {
  if (x === promise2) { //防止自己等待自己
    return reject(new Error('出错了'))
  } else if (Object.prototype.toString.call(x) == '[object Function]' || typeof x == 'object' && x !== null) {
    let called
    try {
      // 如果是then 是一个函数 我就认为他是个函数
      if (Object.prototype.toString.call(x.then) == '[object Function]') {
        x.then.call(x, data => {
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
class MyPromise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.val = undefined
    this.reason = undefined
    this.onResolveCallbacks = []
    this.onRejectCallbacks = []
    const resolve = (val) => {
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
    let promise2 = new MyPromise((resolve, reject) => {
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
}
module.exports = MyPromise