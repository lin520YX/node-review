const Student = require('./model/student')
// Student.findByName('lyf').then(data=>{

// })
new Student().findName({username:'lyf'}).then(data=>{
  console.log(data)
})