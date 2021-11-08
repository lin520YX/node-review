// json web token 令牌
// 跨域身份验证
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const jwt = require('jwt-simple')
const crypto = require('crypto')
const jwt1 = {
  toBaseUrl (content) {
    return content.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
  },
  toBase64 (content) {
    return this.toBaseUrl(Buffer.from(JSON.stringify(content)).toString('base64'))
  },
  base64urlUnescape (str) {
    str += new Array(5 - str.length % 4).join('-')
    return str.replace(/\-/g, '+').replace(/_/g, '/')
  },
  sign (content, secret) {
    return this.toBaseUrl(crypto.createHmac('sha256', secret).update(content).digest('base64'))
  },
  encode (payload, secret) {
    let header = this.toBase64({ typ: 'JWT', alg: 'HS256' })
    let content = this.toBase64(payload)
    let sign = this.sign(header + '.' + content, secret)
    return header + '.' + content + '.' + sign
  },
  decode (token, secret) {
    let [header, content, sign] = token.split('.')
    let newSign = this.sign(header + '.' + content, secret)
    if (newSign == sign) {
      // 转为二进制
      return JSON.parse(Buffer.from(this.base64urlUnescape(content), 'base64').toString())
    } else {
      throw new Error('令牌出错')
    }
  }
}
router.get('/login', async ctx => {
  // 访问login 就会生成一个令牌返还给你
  let token = jwt1.encode({
    username: 'admin',
    expires: new Date(Date.now() + 20 * 1000 * 1000).toGMTString()
  }, 'lyf')
  ctx.body = {
    token
  }
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
  // eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwaXJlcyI6Ik1vbiwgMDggTm92IDIwMjEgMTg6MjI6MzYgR01UIn0.
  // SVCr2NpTmq_TaQ19-ZIaoO40_jliDmFJ5XfUoAfpfRA
})
router.get('/validate', async ctx => {
  let authorization = ctx.headers['authorization']
  if (authorization) {
    let r = {}
    try {
      r = jwt.decode(authorization, 'lyf')
      if (r.expires < Date.now().getTime()) {
        // 失效
      }
    } catch (error) {
      r.message = 'sx'
    }
    ctx.body = {
      ...r
    }
  }
})

app.use(router.routes())
app.listen(4003, () => {
  console.log(4003)
})


