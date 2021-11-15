const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27018/web',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
conn.on('open',()=>{
  console.log('cg')
})

// 1 集合 2 操作数据 3.固定存放的套路
const studentSchema = new mongoose.Schema({
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
async function main(){
  try {
    // 增加 创建一个人
    // let res =  await Student.create({username:'LYF'})
  // let  res =   await new Student({username:'hh',age:'11'}).save()
  // let res = await Student.updateOne({username:'LYF'},{age:'20'}) //更新一个
  // let res = await Student.findById('6192646ad08c30bc896ee54c')//更新一个

  // 删除
  // let res =await  Student.deleteOne({_id:'6192646ad08c30bc896ee54c'})
  // console.log(res)

  // await Student.create([{username:'LYF'},{username:'LYF2'},{username:'LYF3'},{username:'LYF4'}])
    let limit = 2
    const currentPage = 1
    let r = await Student.find({}).limit(limit).skip((currentPage-1)*limit).countDocuments()
    console.log(r)
} catch (error) {
    console.log(error)
  }
  conn.close()
}
main()
// Student.create({username:'LYF'}).then(data=>{
//   console.log(data)
// })
// (async ()=>{
//   try {
//     let res = await Student.create({username:'LYF'})
//    } catch (error) {
     
//    }
//    conn.close()
// })()
// async function main(){
  
// }
// main()
// __v: 0 防止并发
// 如果存储格式不正确会跑出异常
// (async ()=>{

// })()
// (function(){

// })()