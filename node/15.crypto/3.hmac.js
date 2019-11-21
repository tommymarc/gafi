/**
 * Hmac   摘要
 * 验证方法性  服务器 客户端设置摘要，一致则正确
 * @type {module:crypto}
 *
 * 生成密钥
 * PEM是OpenSSL 的标准格式，OpenSSL 使用PEM文件格式存储证书和密钥，是基于Base64编码的证书
 * $ openssl genrsa -out rsa_private.key 1024
 */

let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
//密钥生成，计算机生成随机的
let key = fs.readFileSync(path.join(__dirname,'rsa_private.key'))
//密码 123    加盐(key)算法
let hmac = crypto.createHmac('sha1','abc');
hmac.update('123');
let result = hmac.digest('hex');
console.log(result);
//be9106a650ede01f4a31fde2381d06f5fb73e612