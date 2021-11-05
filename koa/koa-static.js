const path = require('path')
const fs = require('fs').promises
const {createReadStream} = require('fs')
const mime = require('mime')
module.exports = function static (dirname) {
  return async (ctx, next) => {
    const filePath = path.join(dirname,ctx.path)
    try {
      let statObj = await fs.stat(filePath)
      if(statObj.isFile()){
       ctx.set('Content-Type',mime.getType(filePath)+';charset=utf-8')
       ctx.body = createReadStream(filePath)
      //  console.log(ctx.req)
             //  createReadStream(filePath).pipe(res)
      }else{
        await next()
      }
    } catch (error) {
      await next()
    }
  
  }
}
