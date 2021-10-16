const path = require('path')
const fs = require('fs')
const vm = require('vm')
class Module {
  constructor(fileName) {
    this.id = fileName;
    this.path = path.dirname(fileName)
    this.exports = {}
  }
  static _resolveFilename (fileName) {
    let filePath = path.resolve(__dirname, fileName)
    let isExist = fs.existsSync(filePath)
    if (isExist) return filePath
    let keys = Reflect.ownKeys(Module._extensions) // ['.js','.json']
    for (let i = 0; i < keys.length; i++) {
      let newFile = filePath + keys[i];
      if (fs.existsSync(newFile)) return newFile
    }
    throw new Error('module not found')
  }
  static wrapper (content) {
    return `(function(exports,require,module,__filename,__dirname){
      ${content}
    })`
  }
  static _extensions = {
    '.js': (module) => {
      let content = fs.readFileSync(module.id, 'utf8')
      let str = Module.wrapper(content)
      let fn = vm.runInThisContext(str)
      let exports = module.exports
      fn.call(exports, exports, myReq, module, module.id, module.path)
    },
    '.json': (module) => {
      let content = fs.readFileSync(module.id, 'utf8')
      module.exports = content //手动吧json的结果赋予给module.export
    }
  }
  load () {
    // 加载时候需要获取文件的后缀名 根据后缀名采用不同的策略进行加载
    let extension = path.extname(this.id)
    Module._extensions[extension](this)
  }
}

function myReq (filename) {
  filename = Module._resolveFilename(filename)
  let module = new Module(filename)
  module.load()
  return module.exports
}
const r = myReq('./a')
console.log(r)