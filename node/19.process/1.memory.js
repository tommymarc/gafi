/**
 * process.memoryUsage()
 * 内存的使用情况
 *
 **/
let s = process.memoryUsage();
console.log(s);
let buf = Buffer.alloc(1024*1024*1024);

/** {
 * node v8引擎内存使用量是有上线的， 32位里最多是.7g 64为最多是1.7g
    rss: 17166336,  总使用量
    heapTotal: 4210688,  堆
    heapUsed: 2056832,
    external: 651333  buffer的内存是单独分配的，属于external
}
 **/
s = process.memoryUsage();
console.log(s);
//v8 的内存垃圾收集(标记清除法，计数垃圾收集罚) 内存快照分析，内存泄漏排查