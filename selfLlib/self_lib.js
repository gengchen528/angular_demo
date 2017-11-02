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
 * unique1
 */
unique1 = function(){
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
};
//三、日期时间处理
    /**
     *  3.1 格式化日期 yyyy-mm-dd
     *  formateTime
     *  @param date 传入参数
     */
    formatTime = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };
    /**
     *  3.2 计算N天后的日期
     *  getNday
     *  initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
     *  @param statDate 开始时间 如果未设置，默认为当天日期 格式：yyyymmdd/yyyy-mm-dd 2017-09-08
     *  @param days 几天后 可以为负数
     */
    getNday = function (startDate, days){
        var initDate = startDate;
        if(!days){
            return initDate;
        }
        initDate = initDate.replace(/-/g,'');
        var date;
        // 是否设置了起始日期
        if(!initDate){ // 没有设置初始化日期，就默认为当前日期
            date = new Date();
        }else{
            var year = initDate.substring(0,4);
            var month = initDate.substring(4,6);
            var day = initDate.substring(6,8);
            date = new Date(year, month-1, day); // 月份是从0开始的
        }
        date.setDate(date.getDate() + days);
        var yearStr = date.getFullYear();
        var monthStr = ("0"+(date.getMonth()+1)).slice(-2, 8); // 拼接2位数月份
        var dayStr = ("0"+date.getDate()).slice(-2, 8); // 拼接2位数日期
        var result = "";
        result = yearStr+"-"+monthStr+"-"+dayStr;
        return result;
    };
    /**
     *  3.3 获取指定日期所在周的周一日期
     *  getMonday
     *  @param date 格式：yyyy-mm-dd
     */
    getMonday = function (date) {
        var nowDate = new Date(date);
        var firDay, M, Y, D;
        if (nowDate.getDay() === 0) {
            firDay = new Date(nowDate - (nowDate.getDay() + 6) * 86400000);//判断是否是周日
        } else {
            firDay = new Date(nowDate - (nowDate.getDay() - 1) * 86400000);
        }
        M = Number(firDay.getMonth()) + 1;
        Y = firDay.getFullYear();
        D = firDay.getDate();
        var formateTime = Y + "-" + M + "-" + D;
        return formateTime;
    }