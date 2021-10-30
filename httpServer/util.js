function forEachObj(obj){
  Object.entries(obj).forEach(([key,value])=>{
   cb(value,key)
  })
}
exports.forEachObj = forEachObj