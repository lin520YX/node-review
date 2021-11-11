const express = require('./express')
const app = express()
const article = require('./routes/aircle')
const user = require('./routes/user')
app.use('/article', article)
app.use('/user', user)
app.listen(4001, function () {
  console.log('4001')
})