## cookie session localStorage sessionStorage的q区别
- localStorage sessionStorage 只能本地访问 不超过5m
- cookie http无状态协议 用来识别请求的  客户端和服务端都可以使用  每次请求会自动携带cookie 跨域默认不能携带cookie （cookie 是存放在客户端的 有安全问题 csrf）（合理设置cookie 否则每次请求都会携带cookie 4k）
- session 是基于cookie 知识一个对象存在于服务端中 通过一个唯一表示找到对应的信息，标识是通过cookie来发送的