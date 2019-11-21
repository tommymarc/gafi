// parser 方法解析请求对象，其实就是请求信息，然后解析出请求过程
//拿到请求信息(请求行、请求头、请求体)，解析后传给http监听
let fs = require('fs');
let path = require('path');
let {StringDecoder} = require('string_decoder');
//把buffer 转成字符串，可以保证不乱码
let decoder = new StringDecoder();
/*
  流有一个特点，读一点少一点
  总请求长度为130k  请求头部是70k ，请求体应该是60k
  第一次读取 64k，会继续读取64k  读走了128k
  那么只剩下2k，则第三次读取的请求体是不完整的
  unshift()方法，可以把读多的塞回buffer内部
 */
function parser(requestStream,requestListener){
    function onReadable(){
        // let data = requestStream.read();// data 是buffer 16进制数据
        //  以上方法可能有时候不能读完，需要用到while 来操作
        let buf;
        let buffers = [];
        while(null != (buf = requestStream.read())){
            buffers.push(buf);
            let result = Buffer.concat(buffers);
            //先将buf转换成字符串
            // let str = decoder.write(buf);
            let str = decoder.write(result);
            //判断buf 里面是否有'\r\n\r\n' 换行符
            //如果buf 里有换行符在中间
            if(str.match(/\r\n\r\n/)){
                //累加所有buffer
                // let result = Buffer.concat(buffers).toString();
                //切割分隔符 转换成数组
                let values =  str.split(/\r\n\r\n/);
                // let headers = values[0];// 拿到第一个返回值，请求体
                let headers = values.shift();// 拿到第一个返回值，请求体
                let headerObj = parseHeader(headers);
                Object.assign(requestStream,headerObj);
                let body = values.join('\r\n\r\n');
                requestStream.removeListener('readable',onReadable);
                //unshift
                //把读取多的部分返回buffer
                requestStream.unshift(Buffer.from(body));
                //callback()
                return requestListener(requestStream);
            }
            /*
            else{
                //如果请求头很长，超过了64k 并未找到'\r\n\r\n'换行分隔符
                //先读一段数据，如果没有找到，放到buffers 里面
                buffers.push(buf);
            }
             */
        }
    }
    //readable 自行解析
    requestStream.on('readable',onReadable);
}
function parseHeader(headerStr){
    let lines = headerStr.split(/\r\n/);
    let startLine = lines.shift();
    let starts = startLine.split(' ');
    let method = starts[0];
    let url = starts[1];
    let protocal = starts[2];
    let protocalName = protocal.split('/')[0];
    let protocalVersion = protocal.split('/')[1];

    let headers = {};
    lines.forEach(line=>{
        // 拿到每一行的key 跟value
        let row = line.split(':');
        headers[row[0]] = row[1]
    });
    return {headers,method,url,protocalName,protocalVersion}
    // lines.map();
}
let rs = fs.createReadStream(path.join(__dirname,'req.txt'));
//socket 拆成两个对象，一个请求一个响应
parser(rs,function(req){
    //请求信息:  method url headers
    console.log(req.method);   //POST
    console.log(req.url);      //路径 '/'
    console.log(req.headers);
    req.on('data',function(data){
        console.log(data.toString());
    })
    req.on('end',function(){
        console.log('请求处理结束，开始响应res.end()');
    })
})