
const fs = require('fs')
const MyPromise = require('./mypromise')
function read (...args) {
  let dfd = MyPromise.defer()
  fs.readFile(...args, function (err, data) {
    if (err) dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise
}
read('promise2/age.txt', 'utf8').then(
  data => {
    console.log(data)
  },
  err => {
    console.log(err)
  }
)