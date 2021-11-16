const Student = require('./model/student')
const HomeWork = require('./model/homework')
const conn = require('./db')
const mongoose = require('mongoose')

;(async () => {
    // let student = await Student.create({username:'lyffff111',age:'15'})
    // await HomeWork.create({title:'1111',content:'hhh11',studentId:student._id})
    // 关联查询
    // let r = await HomeWork.findById('61927a63d98be9df977559bd').populate('studentId',{username:1})
    // console.log(r)

   let res =  await Student.aggregate([
        // {
        //     $limit:10
        // },
        {
          $group:{
            _id:'$username',
            age:{$avg:'$age'} //$avg $sum
          }
        }
        
    ])
    console.log(res)
})()
