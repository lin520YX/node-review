const STATUS = {
  PENDING: 'PENDING',
  FULFIllED: 'FULFIllED',
  REJECTED: 'REJECTED'
}
class MyPromise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.val = undefined
    this.reason = undefined
    const resolve = (val) => {
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.FULFIllED
        this.val = val
      }
    }
    const reject = (reason) => {
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onfulfilled, onRejected) {
    if (this.status == STATUS.FULFIllED) {
      onfulfilled(this.val)
    }
    if (this.status == STATUS.REJECTED) {
      onRejected(this.reason)
    }
  }
}
module.exports = MyPromise