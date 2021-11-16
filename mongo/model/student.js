const mongoose = require('mongoose')
const conn = require('../db')
// 1 集合 2 操作数据 3.固定存放的套路
const StudentSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    lowercase:true
  },
  age:{
    type:Number,
    min:5,
    max:19
  },
  birthDay:{
    type:Date,
    default:Date.now()
  },
  hobby:{
    type:String,
    validate(value){
      return value ==='跑步'||value ==='铅球'
    }
  }
},{
  timestamps:{
    createAt:'createTimer',
    updateAt:'updateTimer'
  }
})
// 扩展静态方法
StudentSchema.static.findName = function(username){
 return  this.findOne({username})
}
StudentSchema.methods.findName = function(option){
  return this.model('Student').findOne(option)
}
module.exports  = conn.model('Student',StudentSchema,'student')
