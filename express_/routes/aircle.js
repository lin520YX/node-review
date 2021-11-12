const express = require('../express');
let router = express.Router();// 既充当了类 又充当了函数

// /article/add
router.get('/add', function (req, res, next) {
  res.end('article add')
})

router.get('/remove', function (req, res, next) {
  res.end('article remove')
})

let router2 = express.Router();
router2.get('/xxx', function (req, res, next) {
  res.end('xxx');
})

router.use('/a', router2)



// router = (req,res,next)=>{}
module.exports = router;