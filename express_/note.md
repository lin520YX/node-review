## koa 和 express 的区别
- express 内部采用回调函数来实现的 koa es6 语法 内部使用了promise
- koa 内部比较小巧(use listen) koa-static koa-view koa-router ，express内部包含了很多中间件
- 都可以按照自己的规则express koa 实现mvc 没有约束 
- koa 底层采用了上下文 express 内部使用的就是原生的req res 进行了封装
- koa和express 都有中间件的概念 express 内部不支持promise