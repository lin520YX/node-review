const querystring = require('querystring')
module.exports = function bodyParser () {
  return async (ctx, next) => {
    ctx.request.body = await body(ctx)
    await next()
  }
}

async function body (ctx) {
  return new Promise((resolve, reject) => {
    let arr = []
    ctx.req.on('data', (chunk) => {
      arr.push(chunk)
    })
    ctx.req.on('end', () => {
      // username=123123&&password=123123
      // 请求体 
      // 1.表单格式 a=1&b=2
      // 2.json格式 {a:1,b:2}
      // 3 文件格式

      // Content-Type: application/x-ww-form-urlencoded
      let data = Buffer.concat(arr)
      let type = ctx.get('Content-Type')
      if (type == 'application/x-www-form-urlencoded') { //a=1&b=2
        resolve(querystring.parse(data.toString()))
      } else {
        resolve()
      }
      // let data = Buffer.concat(arr)
      // resolve(Buffer.concat(arr))
    })
  })
}