const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27018/web',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
conn.on('open',()=>{
  console.log('cg')
})

// 1 集合 2 操作数据 3.固定存放的套路
const studentSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    lowercase:true
  },
  age:{
    type:Number,
    min:5,
    max:12
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
let Student = conn.model('Student',studentSchema,'student')
// __v: 0 防止并发
// 如果存储格式不正确会跑出异常
Student.create({username:'LYF'}).then(data=>{
  console.log(data)
  conn.close()
})