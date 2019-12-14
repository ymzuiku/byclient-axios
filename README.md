# lightning-fetch

lightning-base 的浏览器请求端

```js
import { Lightning } from 'lightning-axios';

// public key 和 private key 要交换，不显性传递
const lightning = Lightning({
  url: 'http://0.0.0.0:4010/lightning',
  keys: `
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

lightning({
  method: 'insertOne',
  args: [{ name: 'dog你好', age: 100 }],
}).then(res => {
  console.log(res);
});
```
