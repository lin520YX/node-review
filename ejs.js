const ejs = require('ejs')
const path = require('path')

const fs = require('fs')
function renderFile(filename,data,cb){
  let template = fs.readFileSync(filename,'utf8')
  let head = `let str = ''\r\n`
  head +=`with(obj){\r\n`
  head +="str+=`"
  head +=template.replace(/<%(.+?)%>/g,function(){
    return '`\r\n'+arguments[1]+'\r\nstr+=`'
  })
  let tail = '`\r\n}\r\n return str'

  let fn = new Function('obj',head+tail)
 cb(null,fn(data))
  // 1 替换<%%>
  // 2 把需要的东西拼凑在一个字符串 
  // 3 new Function
  // 4 with
  // template = template.replace(/<%=(.+?)%>/g,function(){
  //   return data[arguments[1]]
  // })
  // cb(null,template)
}
renderFile(path.resolve(__dirname,'template.html'),{name:'lyf',arr:[1,2,3]},function(err,data){
  console.log(err,data)
})

