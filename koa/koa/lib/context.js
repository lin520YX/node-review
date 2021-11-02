let proto = {

}
module.exports = proto

function defineGetter (target, key) {
  proto.__defineGetter__(key, function () {
    return this[target][key]
  })
}

defineGetter('request', 'path')