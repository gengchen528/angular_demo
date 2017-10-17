/*
**本文件主要收藏一些封装完成的一些常用函数
  一、js常用
  二、解决浏览器兼容
 */


// 一、js常用

/**
* 1.1 判断是否为数字
* isNumber
* @ param str 传参
* */
isNumber = function (str){
    var n = Number(str);
    if (!isNaN(n)){
        return true;
    }else{
        return false;
    }
};
/**
*1.2 判断是否是对象
* isObj
* @ param obj 传参
 */
isObj= function (obj){
    if (typeof obj==="object") {
        return true;
    }else{
        return false;
    }
};
/**
 * 1.3 判断是否为空
 * isEmpty
 * @param obj 传参
 */
isEmpty= function (obj){
    var obj=obj;
    if(obj===""||obj===null||obj===undefined||obj==="null"||obj==="undefined"){
        return true;
    }else{
        return false;
    }
};
/**
 * 1.4 数组去重
 */
Array.prototype.unique1 = function(){
    var res = [this[0]];
    for(var i = 1; i < this.length; i++){
        var repeat = false;
        for(var j = 0; j < res.length; j++){
            if(this[i] === res[j]){
                repeat = true;
                break;
            }
        }
        if(!repeat){
            res.push(this[i]);
        }
    }
    return res;
};
//二、处理浏览器兼容性问题

//2.1 处理IE6-IE8不兼容forEach()与map()遍历
/**
 * forEach遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myForEach = function myForEach(callback,context){
    context = context || window;
    if('forEach' in Array.prototye) {
        this.forEach(callback,context);
        return;
    }
    //IE6-8下自己编写回调函数执行的逻辑
    for(var i = 0,len = this.length; i < len;i++) {
        callback && callback.call(context,this[i],i,this);

};
/**
 * map遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myMap = function myMap(callback,context){
    context = context || window;
    if('map' in Array.prototye) {
        return this.map(callback,context);
    }
    //IE6-8下自己编写回调函数执行的逻辑
    var newAry = [];
    for(var i = 0,len = this.length; i < len;i++) {
        if(typeof  callback === 'function') {
            var val = callback.call(context,this[i],i,this);
            newAry[newAry.length] = val;
        }
    }
    return newAry;
}