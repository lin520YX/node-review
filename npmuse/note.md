- 包是由多个模块组成 （在node中每个js 都是一个模块）
- npm init -y 初始化的信息文件 不能写注释
- 包分为全局包和本地包  代码中使用的都是本地包 命令行中使用的都是全局包
- nrm node registry manager  默认npm源
```
/usr/local/bin/nrm -> /usr/local/lib/node_modules/nrm/cli.js
```

> npm 之所以能用使用因为npm 放在path目录下 其他安装的全局包都在npm下 所以可以当成全局命令使用

- npm link 把当前的目录放在
```
/usr/local/bin/npmuse -> /usr/local/lib/node_modules/npmuse/bin/www.js
/usr/local/lib/node_modules/npmuse -> /Users/lyf/Documents/node-review/npmuse
```
- 全局包必须增加 bin字段 会通过配置做软链 表示node 执行#! /usr/bin/env node
- 安装模块（第三方模块） 依赖方式
- 1.开发依赖 npm install webpack -save-d  (npm install webpack -D)
- 2.项目依赖 npm install jQurey --save (npm install jQurey -S || npm install jQurey)
- 3.同版本依赖 peerDependencies
- 4.捆绑依赖 
- 5.可选依赖
- npm install --production  默认只安装生产环境下的
- 常用版本号（major,minor,patch） 正式版 ^2.0.0  必须以2开头 不能低于当前指定版本 ～2.2.2 开头是2.2
- alpha beta rc


