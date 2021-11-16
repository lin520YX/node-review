const Student = require('./model/student')
const HomeWork = require('./model/homework')
const conn = require('./db')
;(async()=>{
  // let student = await Student.create({username:'lyffff',age:'15'})
  // await HomeWork.create({title:'1111',content:'hhh',studentId:student._id})
  // 关联查询
  // let r = await HomeWork.findById('61927a63d98be9df977559bd').populate('studentId',{username:1})
  // console.log(r)
})();