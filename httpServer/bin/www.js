#! /usr/bin/env node

const serverConfig = require('./serverConfig')
const program = require('commander')
Object.values(serverConfig).forEach(val=>{
  program.option(val.option,val.descriptor)
})
// 发布订阅
// program.on('--help',()=>{
//   console.log('Usage')
//   Object.values(serverConfig).forEach(val=>{
//     console.log('  '+val.usage)
//   })
// })
program.parse(process.argv)
const options = program.opts();
// console.log(program)
const finalConfig = {}
Object.entries(serverConfig).forEach(item=>{
  const [key,value] = item
  finalConfig[key] = options[key]||value.default
})
console.log('finalConfig',finalConfig)
// console.log(program)
