const querystring = require('querystring')
module.exports = function bodyParser () {
  return async (ctx, next) => {
    ctx.request.body = await body(ctx)
    await next()
  }
}

Buffer.prototype.split = function (bondary) {
  let arr = []
  let offset = 0
  let currentPosition = 0
  while (-1 != (currentPosition = this.indexOf(bondary, offset))) {
    arr.push(this.slice(offset, currentPosition))
    offset = currentPosition + bondary.length
  }
  arr.push(this.slice(offset))
  return arr
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
      // console.log(type)
      if (type == 'application/x-www-form-urlencoded') { //a=1&b=2
        resolve(querystring.parse(data.toString()))
      } else if (type == 'application/json') {
        resolve(JSON.parse(data.toString()))
      } else if (type == 'text/plain;charset=UTF-8') {
        resolve(data.toString())
      } else if (type.startsWith('multipart/form-data')) {
        // ------WebKitFormBoundary8AazAfGT7jwg3TEJ
        // Content-Disposition: form-data; name="username"

        // 12321
        // ------WebKitFormBoundary8AazAfGT7jwg3TEJ
        // Content-Disposition: form-data; name="password"

        // 312321
        // ------WebKitFormBoundary8AazAfGT7jwg3TEJ
        // Content-Disposition: form-data; name="avatar"; filename="node.txt"
        // Content-Type: text/plain

        // dsfsdfdsfs

        // ------WebKitFormBoundary8AazAfGT7jwg3TEJ--
        // 分段传输 给我当前客户端提交的数据和一个分隔符 multipart/form-data 后面会给个bondary
        // console.log(data.toString())

        let bondary = '--' + type.split('=')[1]
        let lines = data.split(bondary)
        lines = lines.slice(1, -1)
        let resultObj = {}
        lines.forEach(line => {
          let [head, body] = line.split('\r\n\r\n')
          if (head) {
            let key = head.toString().match(/name="(.+?)"/)[1]
            if (!head.includes('filename')) {
              resultObj[key] = body.slice(0, -2).toString()
            }
          }
        })
        // console.log(lines.toString())
        resolve(resultObj)
      } else {
        resolve()
      }
      // let data = Buffer.concat(arr)
      // resolve(Buffer.concat(arr))
    })
  })
}
