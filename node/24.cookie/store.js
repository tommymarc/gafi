let util = require('util');
let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp'); //创建目录
module.exports = function(session){
    let Store = session.Store;
    util.inherits(FileStore,Store);
    function FileStore(options){
        Store.call(this);
        let { root } = options; // root 就是存放session文件的根目录
        this.maxAge = options.maxAge || 0 ; //最长存活时间
        this.root = root ;
        mkdirp.sync(root);
    }
    FileStore.prototype.resolve = function(sid){
        return path.join(this.root,sid+ '.json');//路径 根目录+sid
    }
    FileStore.prototype.set = function(sid,session,callback){
        fs.writeFile(this.resolve(sid),JSON.stringify(session),callback);
    }
    FileStore.prototype.get =function(sid,callback){
        fs.readFile(this.resolve(sid),'utf8',function(err,data){
            if(err) return callback(err);
            data = JSON.parse(data);
            callback(null,data);
        })
    }
    FileStore.prototype.destroy = function(sid,callback){
        fs.unlink(this.resolve(sid),callback);//删除此路径结果
    }
    return FileStore;
}