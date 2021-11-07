class ArticleController {
  constructor() { }
  add (ctx, next) {
    ctx.body = '文章添加'
  }
  list (ctx, next) {
    ctx.body = '文章列表'
  }
}
module.exports = ArticleController