function Layer (path, handler) {
  this.path = path
  this.handler = handler
}
Layer.prototype.match = function (pathname) {
  return this.path == pathname
}
module.exports = Layer