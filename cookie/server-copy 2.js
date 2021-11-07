const http = require('http');
const querystring = require('querystring')
const crypto = require('crypto')
// 服务端设置的是set-cookie 客户端是cookie字段
function sign (val) {
  return crypto.createHmac('sha256', 'haHa').update(val).digest('base64')
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
    let [value, s] = result[key].split('.')

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
  if (req.url == '/read') {
    // name=lyf; age=28  
    // 多个分号空格隔开
    let res = req.getCookie('name', {
      signed: true
    })
    res.end(JSON.stringify(res))
  } else if (req.url == '/write') {
    // cookie 的存活时间 max-age/expires
    // max-age 以秒为单位
    // expires  绝对时间

    // domain 针对那个域名生效 二级域名
    // res.setHeader('Set-Cookie', ['name=lyf; max-age=10; domain', 'age=28'])
    // res.end('write ok')
    // path 限制只能在某个路径访问cookie
    // httpOnly 防止浏览器随意更改
    res.setCookie('name', 'lyf', {
      maxAge: 10,
      httpOnly: 'true'
    })
    res.end('write ok')

  }
}).listen(9999, () => {
  console.log('server port 9999')
})