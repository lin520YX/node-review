const http = require('http');
const querystring = require('querystring')
const crypto = require('crypto')
// 服务端设置的是set-cookie 客户端是cookie字段
function sign (val) {
  // 在传输base64 时候需要转化+ = /
  //  / => _
  // + => -
  // = => 空
  return crypto.createHmac('sha256', 'haHa').update(val + '').digest('base64').replace(/\/|\=|\+/g, '')
  // 加盐算法 放入不同的密钥 产生不同的结果 不可逆
}
http.createServer((req, res) => {
  let arr = []
  res.setCookie = function (key, value, options = {}) {
    let args = []
    if (options.maxAge) {
      args.push(`max-age=${options.maxAge}`)
    }
    if (options.domain) {
      args.push(`domain=${options.domain}`)
    }
    if (options.path) {
      args.push(`path=${options.path}`)
    }
    if (options.httpOnly) {
      args.push(`httpOnly=${options.httpOnly}`)
    }
    if (options.signed) {
      value = value + '.' + sign(value)
    }
    arr.push(`${key}=${value}; ${args.join('; ')}`)

    console.log(arr)
    res.setHeader('Set-Cookie', arr)
  }
  req.getCookie = function (key, option = {}) {
    let result = querystring.parse(req.headers.cookie, '; ', '=')
    let [value, s] = (result[key] || '').split('.')

    if (option.signed) {
      if (s == sign(value)) {
        return value
      } else {
        return undefined
      }
    } else {
      return value
    }
  }
  //  客户端访问次数
  if (req.url === '/visit') {
    let visit = req.getCookie('visit')
    if (visit) {
      visit++
    } else {
      visit = 1
    }
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.setCookie('visit', visit, { signed: true })
    res.end(`当前用户第${visit}次访问我`)
  }
}).listen(9999, () => {
  console.log('server port 9999')
})