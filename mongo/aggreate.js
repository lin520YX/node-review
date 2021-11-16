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

   let res =  await HomeWork.aggregate([
        {
            $lookup: {
                from: 'student', //查询那个表
                localField: 'studentId', //当前home中的key
                foreignField: '_id', //关联了什么
                as:'user' //查出来之后什么字段
            },
        },
        // {
        //   $project:{
        //     title:1   //显示结果
        //   }
        // },
        // {
        //   $limit:2
        // }
        // {
        //   $group:{
        //     _id:"$studentId"
        //   }
        // },
        // {
        //   $match:{
        //     _id:mongoose.Types.ObjectId('61927a63d98be9df977559bd')
        //   }
        // }
    ])
    console.log(res)
})()
