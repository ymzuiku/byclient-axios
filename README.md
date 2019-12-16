# lightning-fetch

lightning-base 的浏览器请求端
设置了 serverless 之后，大部分 mongodb 数据库的操作都迁移到了前端， client 请求：

```js
import { Lightning } from 'lightning-axios';

const lightning = Lightning({
  url: 'http://0.0.0.0:4010/lightning',
  // 若后端设置了 checkKey, 前端就必须传递预定密钥
  checkKey: '123456',
  // 若后端设置了 RSAKey, 前端必须设置交互后的密钥
  // public key 和 private key 要交换，不显性传递
  RSAKey: `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI6ZEQnI7LICgjpmYtwpRhBa5vIVPHTS
6VVHE/WVoK6cduwwJyNX7PYgFHT9CrKJVdd99XmqN2TbNRaFkTetaA0CAwEAAQ==
-----END PUBLIC KEY-----
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJcEhpW60HpyTQ4ALikyoYkmqb40uTVd5BBWf8jHvXmsP+jv4UgM
Zc9tbSxBC6ug3FsiFaHzLT+6cfSq+HIsFxkCAwEAAQJAZIHVlJc1oxipYdUK485X
pfD+baGnVfY8EAeRmi4dU3khoO3837K7nEF6/zlb0/E59xA3ytw0ww6D7pKIa02S
gQIhAN2qtBZ6AhWxYzXvxc6y43eq74LvMfp7XYfNqkMaaW7RAiEArmiEnojnD3Aj
hEct0npSPpPQC+LygJ2SQTFxBFUaBckCIHtOQe9e31oB2xZd0sMwb6hZxfIn7L1R
cq3gkh3Ry2SBAiBUFiYifSTRp6IoC11HRhxS+Vbr9C4w3kd+UQUJLrKOKQIhAMAb
xRNJjNFCbTEyKb65ydGFYtcwzcX+AUcLlOb/n7G+
-----END RSA PRIVATE KEY-----   
`,
});

// 发起此请求，服务端执行 db.collection[method](...args):
lighting({
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
lighting({
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
lighting({
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
lighting({
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
lighting({
  db: 'test',
  col: 'user',
  method: 'deleteOne',
  // 若在服务端设置了 impose.user, 其中描述了必须声明对 user 表的操作必须校验 username 和 password
  args: [{ username: { $eq: 'dog' }, password: { $eq: 'bbb' } }],
}).then(res => {
  console.log(res.data);
});
```
