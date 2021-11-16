const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27018/web',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
module.exports = conn;