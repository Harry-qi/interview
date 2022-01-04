/**
 * 手写new
 * 1. 创建一个新的对象
 * 2. 继承父类原型上的方法
 * 3. 添加父类的属性到新的对象上并初始化. 保存方法的执行结果
 * 4. 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
 * **/
export function myNew(fn:Function,...arg:any):object{
    // 不推荐使用__proto__ 
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
    let obj = Object.create(fn.prototype)  
    let r = fn.apply(obj,arg)
    return r instanceof Object ? r : obj
}

/**
 * 手写call 
 * 
 * **/
Function.prototype.call = function(context,...arg){
    var context = context || window;
    const fn = Symbol();
    context[fn] = this;   //更改this指向
    const result = context[fn](...arg);  //执行代码并返回
    delete context[fn];
    return result;
}
/**
 * 手写apply
 * 
 * **/
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

/**
 * 手写map
 * 语法：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters
 * 传当前值，当前下标，map 方法调用的数组，thisArg可选
 * 返回值：一个由原数组每个元素执行回调函数的结果组成的新数组。
*/
Array.prototype.map = function(fn:Function,obj) {
    let arr = [];
    for(let i = 0; i < this.length; i++) {
        let res = obj!==undefined ?  fn(this[i], i, this).call(obj) : fn(this[i], i, this)
        arr.push(res);
    }
    return arr;
};
/**
 * 手写forEach
 * 语法：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#%E8%AF%AD%E6%B3%95
 * 传当前值，当前下标，forEach() 方法正在操作的数组，thisArg可选
 * 返回值：undefined
*/
Array.prototype.forEach = function(fn:Function,obj:object) {
    for(let i = 0; i < this.length; i++) {
        obj!==undefined ?  fn(this[i], i, this).call(obj) : fn(this[i], i, this)
    }
};
/**
 * 手写filter
 * 语法：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#%E5%8F%82%E6%95%B0
 * 传当前值，当前下标,调用了 filter 的数组本身，thisArg可选
 * 返回值: 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
*/
Array.prototype.filter = function(fn:Function,obj:object) {
    let res = []
    // fn()会返回一个true或者false
    for(let i = 0; i < this.length; i++) {
        let r = obj!==undefined ?  fn(this[i], i, this).call(obj) : fn(this[i], i, this)
        if(r){
            //通过测试则push
            res.push(this[i])
        }
    }
    return res
};
/**
 * 手写find
 * 语法: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find#parameters
 * 参数：当前值，当前下标,数组本身，thisArg可选
 * 返回值: 数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。
*/
Array.prototype.find = function(fn:Function,obj:object) {
    let res = undefined
    // fn()会返回一个true或者false
    for(let i = 0; i < this.length; i++) {
        let r = obj!==undefined ?  fn(this[i], i, this).call(obj) : fn(this[i], i, this)
        if(r){
            // 满足条件就中断循环
            res = this[i]
            break
        }
    }
    return res
};

/**
 * 柯里化
 * */ 
function curry(fn){
    
}