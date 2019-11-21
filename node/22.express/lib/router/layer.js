function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
//判断这一层和传入的路径是否匹配
Layer.prototype.match = function(path){
    if(this.path == path){
        return true;
    }
    if(!this.route){
        //这一层是一个中间件层   /user/2
        // this.path = /user
        // return path.slice(0,this.path.length) == this.path
        return path.startsWith(this.path);
        // return path.startsWith(this.path + '/');
    }
    return false;
}
Layer.prototype.handle_request = function(req,res,next){
    this.handler(req,res,next);
}
Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length != 4){
        return next(err);
    }
    this.handler(err,req,res,next);
}
Layer.prototype.match = function(path){
    if(this.path == path){
        return true;
    }
    if(this.route){
        this.params = {};
        let matches = this.regexp.exec(path);
        if(matches){
            for(let i=1; i<matches.length; i++){
                let key = this.keys[i-1];
                let prop = key.name;
                this.params[prop] = matches[i];
            }
            console.log(this.params);
            return true;
        }
    }
}

module.exports = Layer;