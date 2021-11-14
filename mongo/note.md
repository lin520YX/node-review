https://github.com/mongodb/homebrew-brew

brew services stop mongodb-community
brew services start mongodb-community


mongod --dbpath "filePath" -p 

- 需要配置用户 上线时数据库必须配置用户密码

- show dbs 显示所有库
- use admin 切换库表示进入了某个数据库
- show collections 显示所有集合
- db.createCollection
db.createUser({user:"lyf","pwd":"lin123159",roles:[{role:"dbOwner","db":"web"}]})
db.auth() 登陆用户
db.student.insert(插入对象)
db.student.update() //修改数据
db.student.find(查询所有显示字段0，1不能混用)
db.student.remove() //删除

db.student.update({name:'lyf'},{$set:{a:2}},{multi:true})

db.createCollection('student')


- 导出倒入 csv
mongoexport -d web -c student --csv -f name,a -o a.csv
mongoimport --db web --collection student --file a.csv


备份
mongodump --db web --collection student --out backup
mongorestore backup