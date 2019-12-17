import { ByClientAxios } from 'byclient-axios';

const client = ByClientAxios({
  url: 'http://127.0.0.1:4010/less',
  checkKey: '123456',
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

client({
  method: 'insertOne',
  args: [{ name: 'dog你好', age: 100 }],
}).then(res => {
  console.log(res);
});
