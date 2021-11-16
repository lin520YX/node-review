const mongoose = require('mongoose')
const conn = require('../db')
// 1 集合 2 操作数据 3.固定存放的套路
const HomeworkSchema = new mongoose.Schema({
 title:String,
 content:String,
 studentId:{
  ref:"Student",
  type:mongoose.SchemaTypes.ObjectId
 }
},{
  timestamps:{
    createAt:'createTimer',
    updateAt:'updateTimer'
  }
})
module.exports = conn.model('Homework',HomeworkSchema,'homework')
