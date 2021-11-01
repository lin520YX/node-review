const url = require('url')
module.exports = {
  get path(){
    let {pathname} = url.parse(this.req.url)
    return pathname
  }
}