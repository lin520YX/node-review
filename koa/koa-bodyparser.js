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
      resolve(Buffer.concat(arr))
    })
  })
}