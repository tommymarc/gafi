function EventEmitter(){
    this.events = {};// 会把所有的事件监听函数放在这个对象里保存
    //指定给一个事件类型增加的监听函数数量最多有多少个
    this._maxListeners = 10;//默认10个
}


/**
 * setMaxListeners
 * 指定事件处理函数的最大量  n为整数值， 0为无限值
 */
EventEmitter.prototype.setMaxListeners = function(maxListeners){
    this._maxListeners = maxListeners;
}

/**
 *listeners
 * 获取指定事件的所有事件处理函数
 */
EventEmitter.prototype.listeners = function(event){
    return this.events[event]
}

/**
 *on   &&   addListener
 * 给指定的事件绑定事件处理函数，1参数 是事件类型，2参数 是事件监听函数
 */
EventEmitter.prototype.on = EventEmitter.prototype.addListener =
    function(type,listener){
        if(this.events[type]){
            //如果有，创建一个新的数组，把函数放进去
            this.events[type].push(listener);
            if(this._maxListeners!=0&&this.events[type].length>this._maxListeners){
                console.error(`MaxListenersExceededWarning:
                Possible EventEmitter memory leak detected. 
                ${this.events[type].length} $[type] listeners added. Use emitter.setMaxListeners() to increase limit`)
            }
        }else{
            //如果以前没有添加过此事件的监听函数，则赋一个数组
            this.events[type] = [listener]
        }
    };

/**
 *once
 * 指定事件指定只执行一次的事件处理函数
 */
EventEmitter.prototype.once = function(type,listener){
    //用完即焚
   let wrapper = (...rest)=>{
        listener.apply(this,rest);//先让原始的监听函数执行
        this.removeListener(type,wrapper);
    }
    this.on(type,wrapper);
}

//removeListener
EventEmitter.prototype.removeListener = function(type,listener){
    if(this.events[type]){
        //如果当前迭代的项目如果不等于参数的话就保留，否则过滤掉
        /*
        arr.filter(function(item){
            return item != listener;
        })
         */
        this.events[type] = this.events[type].filter(l=>l!=listener)
    }
}

/**
 * removeAllListeners
 * 移除事件上的所有监听函数
 */
EventEmitter.prototype.removeAllListeners = function(type){
    delete this.events[type];//把key 给删除掉
}

/**
 * emit
 * 手工触发指定事件
 */
EventEmitter.prototype.emit = function(type,...rest){
    //让监听函数挨个执行
    this.events[type]&&this.events[type].forEach(listener=>listener.apply(this.rest));
}
modulexports = EventEmitter;

