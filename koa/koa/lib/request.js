const url = require('url')
module.exports = {
  get path () {
    let { pathname } = url.parse(this.req.url)
    return pathname
  },
  get query () {
    let { query } = url.parse(this.req.url, true)
    return query
  }
}
// console.log(url.parse('http://aaaa.com?aaa=vvv', true).query.aaa)