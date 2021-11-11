const express = require('../express');
let router = express.Router() //既是类 又是函数
router.get('/add', function (req, res, next) {
  res.end('user add')
})
router.get('/remove', function (req, res, next) {
  res.end('user remove')
})
module.exports = router