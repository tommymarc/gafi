/**
 * 对称加密  加密和摘要的区别
 * 摘要是不可以返回回来
 * 加密是可以返回回来
 * - 加密是用在与客户端通信的时候
 **/
let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let str = 'hello';
//拿到密钥
let pk = fs.readFileSync(path.join(__dirname,'rsa_private.key'))
let cipher = crypto.createCipher('blowfish',pk);
cipher.update(str,'utf8');
let result = cipher.final('hex');//输出加密后的结果
console.log(result);
//f900f050fd071f77

//还原
let decipher = crypto.createDecipher('blowfish',pk);
decipher.update(result,'hex');
let r = decipher.final('utf8');//输出解密后的结果
console.log(r);//hello