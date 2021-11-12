const ejs = require('ejs')
const path = require('path')

const fs = require('fs')
function renderFile(filename,data,cb){
  let template = fs.readFileSync(filename,'utf8')
  template = template.replace(/<%=(.+?)%>/g,function(){
    return data[arguments[1]]
  })
  cb(null,template)
}
renderFile(path.resolve(__dirname,'template.html'),{name:'lyf'},function(err,data){
  console.log(err,data)
})