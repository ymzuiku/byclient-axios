# byclient-axios

byclient 的浏览器请求端
设置了 serverless 之后，大部分 mongodb 数据库的操作都迁移到了前端， client 请求：

```js
import { ByClientAxios } from 'byclient-axios';

const client = ByClientAxios({
  url: 'http://0.0.0.0:4010/less',
  // 若后端设置了 checkKey, 前端就必须传递预定密钥
  checkKey: '123456',
  // 若后端设置了 RSAKey, 前端必须设置交互后的密钥
  // public key 和 private key 要交换，不显性传递
  RSAKey: `
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCylxvsvCWPMEqqd/ge1x2aCJibEL7WNTD0Bi4FmKfEkfGaxbeH
gLYcy+OR42SbjyvzJN35+B89y6yaAuBVZKHAZaU571iQ2YzKsSYRJvm8rU0T4w2M
2sE7SsSp+4LUd5C7eSoSXdsUaKattNl/FrMyftOWa9sd82cn/6nySbd4HQIDAQAB
AoGAblKkwICV3zeg2F/WGg8fTTlENH6KtT8Up5ptsa1U7jyN+ONs9bsQRQe65DOJ
wgMWzlQXAEVD32PDkzx1oqrQtEafJqrKTJH5tpHHKJ9be9wrj6se2S8Y3g5/6g8M
SrwOY8e2kDgGVtDx3dPRb59QCPDioAzUkDG/h34UEc+Zmo0CQQDZkjM6no8bsnxc
0nQFPVUHhG2ahMQymFMcmV6LrEONcCUeDDfUbvySnnb9GxE6K4IdbDOn5VXVZQE+
2+4OMi/3AkEA0iJVSU5bLVMvhN9elz3hR25Dz+g+xUwgflyc9RzdKLidJYL20T00
5XNLYMilFa0XAjV4R+e2TwqPVLKS8IK7iwJBAJO98qmwuC8vscF6a6yPLGlRZPgT
hgNxaqa2AvzHuouWBq5zz4mi4EJT9ysCsV0V5GJEcoNleTbSQtlDkVD0hZsCQQCE
TnnEnkFqWGYjE0FLmPqvLw4jaeeb8kLDTSzGaFYXvaW0aLFfLVqQ3fcoCS1oaIOE
MIZ7P7naKpv0iDtck/PhAkAEZWW+WOWGXuKH1b9fXsnmEVfMVSiYuQ+2ADtQ41UB
/VCcY8b6os69oKGkNsV38GaCrMJS5RUnC2a9vuVAyA/H
-----END RSA PRIVATE KEY-----  
`,
});

// 发起此请求，服务端执行 db.collection[method](...args):
client({
  db: 'test',
  col: 'anima',
  method: 'insertOne',
  args: [{ name: 'dog', age: '11', createAt: Date.now() }],
}).then(res => {
  console.log(res.data);
});

// 客户端操作数据库，暂时仅支持以下 method:
// const canUseMethod = new Set([
//   'insert',
//   'insertMany',
//   'insertOne',
//   'deleteOne',
//   'update',
//   'updateMany',
//   'updateOne',
//   'replaceOne',
//   'find',
//   'findOne',
// ]);

// 我们还可以描述哪些字段存表之前，在后端使用sha256加密，或将字段转为ObjectId:
client({
  db: 'test',
  col: 'user',
  method: 'insertOne',
  argsSha256: ['0.password'], // 调整字段：args[0][password]
  argsObjectId: ['0._id'], // 调整字段：args[0][_id]
  args: [{ _id: '5df3d87143234867f3626f2f', username: 'dog', password: 'bbb', createAt: Date.now() }],
}).then(res => {
  console.log(res.data);
});

// 我们看到，创建之后，整个对象也返回了，我们为了节流，可以屏蔽ops:
client({
  db: 'test',
  col: 'user',
  method: 'insertOne',
  argsSha256: ['0.password'], // 调整字段：args[0][password]
  argsObjectId: ['0._id'], // 调整字段：args[0][_id]
  args: [{ _id: '5df3d87143234867f3626f2f', username: 'dog', password: 'bbb', createAt: Date.now() }],
  // 删除返回值的 ops[0] 字段, 注意，前端设置 remove 仅适合减少数据流量，如要提高数据安全性，请在后端设置 impose.remove
  remove: ['ops.0'],
}).then(res => {
  console.log(res.data);
});

// 更新操作:
client({
  db: 'test',
  col: 'user',
  method: 'updateOne',
  // 若在服务端设置了 impose.user, 其中描述了必须声明对 user 表的操作必须校验 username 和 password
  args: [{ username: { $eq: 'dog' }, password: { $eq: 'bbb' } }, { $set: { money: 100, updateAt: Date.now() } }],
  trim: ['ops.0.password'],
}).then(res => {
  console.log(res.data);
});

// 删除操作:
client({
  db: 'test',
  col: 'user',
  method: 'deleteOne',
  // 若在服务端设置了 impose.user, 其中描述了必须声明对 user 表的操作必须校验 username 和 password
  args: [{ username: { $eq: 'dog' }, password: { $eq: 'bbb' } }],
}).then(res => {
  console.log(res.data);
});
```
