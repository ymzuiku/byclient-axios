import { ByClientAxios } from 'byclient-axios';

const client = ByClientAxios({
  url: 'http://127.0.0.1:4010/less',
  checkKey: '123456',
  RSAKey: `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOEUd7IIl4xOHT3lDcj+6lJeVYM0zeu4
wi6CGqTTJs5+8p+OxxwzuN5QHa8hQMSbcN5A56195veV6PrIaoBsmd0CAwEAAQ==
-----END PUBLIC KEY-----
-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBAKGs4Is9jSUrPnzbhsKTpu4SgZTp88td9Vgd9m0tv/NRGxvFsihP
rLqa1KKkpNtnHiu6SsDBoWkjuCOFl2LefLUCAwEAAQJAFeiocRYBN4U5rY/OHjYG
DAMD/lsJx4hPBAbjav4lIeKnWKJChoA+43wHGvwQPZFbzKZKosmRicwenqWdIF6H
wQIhAOIYC6TPql6pCrc0BVVFFFph2JUpPLF7VP75jnJ3wPwFAiEAtw9/u795Igfo
pnCT3FMG8WPzqNHinGkiGoshNQ+tDPECIQDNoRrt8WU9JLc3OlvjWqmRLk6CEvg9
XzNFlwkkOKBPVQIhAKsvBi6mpfrp1GhYXByrU5HF+yPCaZwEQEz8D+iTqSqxAiAX
dLvc2BcdKQcSPUbs5gMGS1XGJkBJoQNYX11tdTztJw==
-----END RSA PRIVATE KEY-----
`,
});

client({
  method: 'insertOne',
  args: [{ name: 'dog你好', age: 100 }],
}).then(res => {
  console.log(res);
});
