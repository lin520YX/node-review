// md5 特点 摘要算 不叫加密算法 加密 必须得揭秘但是md5 无法反解释
// 1 两段不同得内容  摘要出得结果得长度不同
// 2）如果传入得内容不同输出得结果不同 雪崩效应
// 3） md5 不可逆


const crpto = require('crypto')
// update 可以放字符串或者buffer
console.log(crpto.createHash('md5').update('1234').digest('base64'))
console.log(crpto.createHash('md5').update('12').update('34').digest('base64'))

// 不适合大文件