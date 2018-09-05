/*
**本文件主要收藏一些封装完成的一些常用函数
  一、js常用
  二、解决浏览器兼容
  三、时间日期处理
  四、功能函数
  五、Dom操作
  六、正则判断
  七、过滤器
 */


// 一、js常用

/**
 * 1.1 判断是否为数字
 * @name isNumber
 * @ param str 传参
 * @return {Boolean}
 * */
     function isNumber(str) {
        var n = Number(str);
        if (!isNaN(n)) {
            return true;
        } else {
            return false;
        }
    };
/**
 * 1.2 判断是否是对象
 * @name isObj
 * @param obj 传参
 * @return {Boolean}
 */
    function isObj(obj) {
        if (typeof obj === "object") {
            return true;
        } else {
            return false;
        }
    };
/**
 * 1.3 判断是否为空
 * @name isEmpty
 * @param obj 传参
 * @return {Boolean}
 */
     function isEmpty(obj) {
        var obj = obj;
        if (obj === "" || obj === null || obj === undefined || obj === "null" || obj === "undefined") {
            return true;
        } else {
            return false;
        }
    };
/**
 * 1.4 数组去重
 * @name unique1
 * @return [arry]
 */
     function unique1() {
        var res = [this[0]];
        for (var i = 1; i < this.length; i++) {
            var repeat = false;
            for (var j = 0; j < res.length; j++) {
                if (this[i] === res[j]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                res.push(this[i]);
            }
        }
        return res;
    };

/**
 *
 * @desc 1.5 判断两个数组是否相等
 * @name  arrayEqual
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
    function arrayEqual(arr1, arr2) {
        if (arr1 === arr2) return true;
        if (arr1.length != arr2.length) return false;
        for (var i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

/**
 *
 * @desc 1.6.1 判断元素是否有某个class
 * @name  hasClass
 * @param {HTMLElement} ele
 * @param {String} cls
 * @return {Boolean}
 */
    function hasClass(ele, cls) {
        return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
    }

/**
 *
 * @desc  1.6.2 为元素添加class
 * @name  addClass
 * @param  {HTMLElement} ele
 * @param  {String} cls
 */

    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.className += ' ' + cls;
        }
    }

/**
 *
 * @desc 1.6.3 为元素移除class
 * @name  removeClass
 * @param {HTMLElement} ele
 * @param {String} cls
 */

    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }
/**
 *
 * @desc   1.7 判断`obj`是否为空
 * @name   isEmptyObject
 * @param  {Object} obj
 * @return {Boolean}
 */
    function isEmptyObject(obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return false
        return !Object.keys(obj).length
    }

/**
 *
 * @desc 1.8 随机生成颜色
 * @name randomColor
 * @return {String}
 */
    function randomColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }

/**
 *
 * @desc 1.9 生成指定范围随机数
 * @name randomNum
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
    function randomNum(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }


//二、处理浏览器兼容性问题

/**
 * 2.1 处理IE6-IE8不兼容forEach()与map()遍历
 * forEach遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myForEach = function myForEach(callback, context) {
	context = context || window;
	if ('forEach' in Array.prototye) {
		this.forEach(callback, context);
		return;
	}
	//IE6-8下自己编写回调函数执行的逻辑
	for (var i = 0, len = this.length; i < len; i++) {
		callback && callback.call(context, this[i], i, this);

	}
};
    /**
     * 2.2 map遍历数组
     * @param callback [function] 回调函数；
     * @param context [object] 上下文；
     */
    Array.prototype.myMap = function myMap(callback, context) {
        context = context || window;
        if ('map' in Array.prototye) {
            return this.map(callback, context);
        }
        //IE6-8下自己编写回调函数执行的逻辑
        var newAry = [];
        for (var i = 0, len = this.length; i < len; i++) {
            if (typeof  callback === 'function') {
                var val = callback.call(context, this[i], i, this);
                newAry[newAry.length] = val;
            }
        }
        return newAry;
    };
    /**
     *
     * @desc 2.3 获取浏览器类型和版本
     * @name getExplore
     * @return {String}
     */
	function getExplore() {
		var sys = {},
			ua = navigator.userAgent.toLowerCase(),
			s;
		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
			(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
				(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
					(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
						(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
							(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
								(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
		// 根据关系进行判断
		if (sys.ie) return ('IE: ' + sys.ie)
		if (sys.edge) return ('EDGE: ' + sys.edge)
		if (sys.firefox) return ('Firefox: ' + sys.firefox)
		if (sys.chrome) return ('Chrome: ' + sys.chrome)
		if (sys.opera) return ('Opera: ' + sys.opera)
		if (sys.safari) return ('Safari: ' + sys.safari)
		return 'Unkonwn'
	}
    /**
     *
     * @desc 2.4 获取操作系统类型
     * @name getOS
     * @return {String}
     */
    function getOS() {
        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        if (/mac/i.test(appVersion)) return 'MacOSX'
        if (/win/i.test(appVersion)) return 'windows'
        if (/linux/i.test(appVersion)) return 'linux'
        if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
        if (/android/i.test(userAgent)) return 'android'
        if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    }

    /**
     *
     * @desc 2.5 判断浏览器是否支持webP格式图片
     * @name isSupportWeb
     * @return {Boolean}
     */
    function isSupportWebP() {
        return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }



//三、日期时间处理
    /**
     *  3.1 格式化日期 yyyy-mm-dd
     *  formateTime
     *  @param date 传入参数
     */
    function formatTime(date) {
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
    function getNday(startDate, days) {
        var initDate = startDate;
        if (!days) {
            return initDate;
        }
        initDate = initDate.replace(/-/g, '');
        var date;
        // 是否设置了起始日期
        if (!initDate) { // 没有设置初始化日期，就默认为当前日期
            date = new Date();
        } else {
            var year = initDate.substring(0, 4);
            var month = initDate.substring(4, 6);
            var day = initDate.substring(6, 8);
            date = new Date(year, month - 1, day); // 月份是从0开始的
        }
        date.setDate(date.getDate() + days);
        var yearStr = date.getFullYear();
        var monthStr = ("0" + (date.getMonth() + 1)).slice(-2, 8); // 拼接2位数月份
        var dayStr = ("0" + date.getDate()).slice(-2, 8); // 拼接2位数日期
        var result = "";
        result = yearStr + "-" + monthStr + "-" + dayStr;
        return result;
    };
    /**
     *  3.3 获取指定日期所在周的周一日期
     *  getMonday
     *  @param date 格式：yyyy-mm-dd
     */
    function getMonday(date) {
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
    /**
     * @desc   3.4 格式化${startTime}距现在的已过时间
     * @name   formatPassTime
     * @param  {Date} startTime
     * @return {String}
     */
    function formatPassTime(startTime) {
        var currentTime = Date.parse(new Date()),
            time = currentTime - startTime,
            day = parseInt(time / (1000 * 60 * 60 * 24)),
            hour = parseInt(time / (1000 * 60 * 60)),
            min = parseInt(time / (1000 * 60)),
            month = parseInt(day / 30),
            year = parseInt(month / 12);
        if (year) return year + "年前"
        if (month) return month + "个月前"
        if (day) return day + "天前"
        if (hour) return hour + "小时前"
        if (min) return min + "分钟前"
        else return '刚刚'
    }
    /**
     *
     * @desc   3.5 格式化现在距${endTime}的剩余时间
     * @name   formatRemainTime
     * @param  {Date} endTime
     * @return {String}
     */
    function formatRemainTime(endTime) {
        var startDate = new Date(); //开始时间
        var endDate = new Date(endTime); //结束时间
        var t = endDate.getTime() - startDate.getTime(); //时间差
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
    }

//四、功能函数
    /**
     *  4.1 HashTable
     *  HashTable
     *  精简版的哈希表
     *
     *函数名            说明                    返回值
     *add(key,value)    添加项                 无
     *getValue(key)        根据key取值             object
     *remove(key)        根据key删除一项          无
     *containsKey(key)    是否包含某个key          bool
     *containsValue(value)    是否包含某个值          bool
     *getValues()            获取所有的值的数组      array
     *getKeys()             获取所有的key的数组      array
     *getSize()             获取项总数              int
     *clear()             清空哈希表               无
     */
    function HashTable() {
        var size = 0;
        var entry = new Object();
        this.add = function (key, value) {
            if (!this.containsKey(key)) {
                size++;
            }
            entry[key] = value;
        }
        this.getValue = function (key) {
            return this.containsKey(key) ? entry[key] : null;
        }
        this.remove = function (key) {
            if (this.containsKey(key) && (delete entry[key])) {
                size--;
            }
        }
        this.containsKey = function (key) {
            return (key in entry);
        }
        this.containsValue = function (value) {
            for (var prop in entry) {
                if (entry[prop] == value) {
                    return true;
                }
            }
            return false;
        }
        this.getValues = function () {
            var values = new Array();
            for (var prop in entry) {
                values.push(entry[prop]);
            }
            return values;
        }
        this.getKeys = function () {
            var keys = new Array();
            for (var prop in entry) {
                keys.push(prop);
            }
            return keys;
        }
        this.getSize = function () {
            return size;
        }
        this.clear = function () {
            size = 0;
            entry = new Object();
        }
    }

    /**
     *  4.2 input限制输入框输入字符数为中文2个字符，英文1个字符
     *  maxCodeLength
     *  输入框文字长度限制
     *  使用方式： <input type='text' maxcodelength="60"/>
     *  @maxcodelength  字符长度，中文两个字符，英文一个字符
     */

    function maxCodeLength() {
        $('input[type="text"]').on('input', function (e) {
            var $that = $(this);
            var limitLen = $that.attr("maxcodelength")                      //定义所需字节数
            $that.attr('maxlength', limitLen);
            setTimeout(function () {
                var value = $that.val(),
                    reg = /[\u4e00-\u9fa5]{1}/g,             //中文
                    notReg = /\w{1}/g;                      //非中文
                var resultCn = value.match(reg);
                var resultEn = value.match(notReg);
                if (resultCn) {
                    limitLen = limitLen - (resultCn.length * 2);
                }
                if (resultEn) {

                    limitLen = limitLen - resultEn.length;
                }
                if (limitLen <= 0) {
                    var finalLen = value.length + limitLen;
                    value = value.substring(0, finalLen);
                    $that.attr('maxlength', limitLen);
                    $that[0].value = value;
                }
            }, 0);

        });
    }

    /**
     *
     * @desc 4.3.1 根据name读取cookie
     * @name getCookie
     * @param  {String} name
     * @return {String}
     */
    function getCookie(name) {
        var arr = document.cookie.replace(/\s/g, "").split(';');
        for (var i = 0; i < arr.length; i++) {
            var tempArr = arr[i].split('=');
            if (tempArr[0] == name) {
                return decodeURIComponent(tempArr[1]);
            }
        }
        return '';
    }

    /**
     *
     * @desc 4.3.2 根据name删除cookie
     * @name removeCookie
     * @param  {String} name
     */
    function removeCookie(name) {
        // 设置已过期，系统会立刻删除cookie
        setCookie(name, '1', -1);
    }

    /**
     *
     * @desc  4.3.3 设置Cookie
     * @name  setCookie
     * @param {String} name
     * @param {String} value
     * @param {Number} days
     */
    function setCookie(name, value, days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = name + '=' + value + ';expires=' + date;
    }


    /**
     * @desc 4.4 根据keycode获得键名
     * @name getKeyName
     * @param  {Number} keycode
     * @return {String}
     */
    var keyCodeMap = {
        8: 'Backspace',
        9: 'Tab',
        13: 'Enter',
        16: 'Shift',
        17: 'Ctrl',
        18: 'Alt',
        19: 'Pause',
        20: 'Caps Lock',
        27: 'Escape',
        32: 'Space',
        33: 'Page Up',
        34: 'Page Down',
        35: 'End',
        36: 'Home',
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down',
        42: 'Print Screen',
        45: 'Insert',
        46: 'Delete',

        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',

        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',

        91: 'Windows',
        93: 'Right Click',

        96: 'Numpad 0',
        97: 'Numpad 1',
        98: 'Numpad 2',
        99: 'Numpad 3',
        100: 'Numpad 4',
        101: 'Numpad 5',
        102: 'Numpad 6',
        103: 'Numpad 7',
        104: 'Numpad 8',
        105: 'Numpad 9',
        106: 'Numpad *',
        107: 'Numpad +',
        109: 'Numpad -',
        110: 'Numpad .',
        111: 'Numpad /',

        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',

        144: 'Num Lock',
        145: 'Scroll Lock',
        182: 'My Computer',
        183: 'My Calculator',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };
    function getKeyName(keycode) {
        if (keyCodeMap[keycode]) {
            return keyCodeMap[keycode];
        } else {
            console.log('Unknow Key(Key Code:' + keycode + ')');
            return '';
        }
    }
    /**
     * @desc 4.5 深拷贝，支持常见类型
     * @name deepClone
     * @param {Any} values
     */
    function deepClone(values) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == values || "object" != typeof values) return values;

        // Handle Date
        if (values instanceof Date) {
            copy = new Date();
            copy.setTime(values.getTime());
            return copy;
        }

        // Handle Array
        if (values instanceof Array) {
            copy = [];
            for (var i = 0, len = values.length; i < len; i++) {
                copy[i] = deepClone(values[i]);
            }
            return copy;
        }

        // Handle Object
        if (values instanceof Object) {
            copy = {};
            for (var attr in values) {
                if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy values! Its type isn't supported.");
    }
    /**
     * @desc  4.6 函数节流。
     * @name  throttle
     * 适用于限制`resize`和`scroll`等函数的调用频率
     *
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
     *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
     *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     *
     * @return {Function}  新的节流函数
     */
    function throttle(delay, noTrailing, callback, debounceMode) {

        // After wrapper has stopped being called, this timeout ensures that
        // `callback` is executed at the proper times in `throttle` and `end`
        // debounce modes.
        var timeoutID;

        // Keep track of the last time `callback` was executed.
        var lastExec = 0;

        // `noTrailing` defaults to falsy.
        if (typeof noTrailing !== 'boolean') {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }

        // The `wrapper` function encapsulates all of the throttling / debouncing
        // functionality and when executed will limit the rate at which `callback`
        // is executed.
        function wrapper() {

            var self = this;
            var elapsed = Number(new Date()) - lastExec;
            var args = arguments;

            // Execute `callback` and update the `lastExec` timestamp.
            function exec() {
                lastExec = Number(new Date());
                callback.apply(self, args);
            }

            // If `debounceMode` is true (at begin) this is used to clear the flag
            // to allow future `callback` executions.
            function clear() {
                timeoutID = undefined;
            }

            if (debounceMode && !timeoutID) {
                // Since `wrapper` is being called for the first time and
                // `debounceMode` is true (at begin), execute `callback`.
                exec();
            }

            // Clear any existing timeout.
            if (timeoutID) {
                clearTimeout(timeoutID);
            }

            if (debounceMode === undefined && elapsed > delay) {
                // In throttle mode, if `delay` time has been exceeded, execute
                // `callback`.
                exec();

            } else if (noTrailing !== true) {
                // In trailing throttle mode, since `delay` time has not been
                // exceeded, schedule `callback` to execute `delay` ms after most
                // recent execution.
                //
                // If `debounceMode` is true (at begin), schedule `clear` to execute
                // after `delay` ms.
                //
                // If `debounceMode` is false (at end), schedule `callback` to
                // execute after `delay` ms.
                timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
            }

        }

        // Return the wrapper function.
        return wrapper;

    }

    /**
     * @desc 4.7 函数防抖
     * @name debounce
     * @requires  throttle
     * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
     * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
     * @example 适用场景：如在线编辑的自动存储防抖。
     * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}  atBegin       可选，默认为false。
     *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
     如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
     * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                  执行去抖动功能时，，调用`callback`。
     *
     * @return {Function} 新的防抖函数。
     */
    function debounce(delay, atBegin, callback) {
        return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
    };


//五、Dom操作
    /**
     *
     * @desc 5.1 获取滚动条距顶部的距离
     * @name getScrollTop
     */
    function getScrollTop() {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }

    /**
     *
     * @desc  5.2 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
     * @param {HTMLElement} ele
     * @returns { {left: number, top: number} }
     */
    function offset(ele) {
        var pos = {
            left: 0,
            top: 0
        };
        while (ele) {
            pos.left += ele.offsetLeft;
            pos.top += ele.offsetTop;
            ele = ele.offsetParent;
        };
        return pos;
    }

    /**
     * @desc 5.3 设置滚动条距顶部的距离
     * @name setScrollTop
     */
    function setScrollTop(value) {
        window.scrollTo(0, value);
        return value;
    }

    /**
     *
     * @desc  5.4 在${duration}时间内，滚动条平滑滚动到${to}指定位置
     * @name scrollTo
     * @requires  setScrollTop 和 getScrollTop
     * @param {Number} to
     * @param {Number} duration
     */
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    function scrollTo(to, duration) {
        if (duration < 0) {
            setScrollTop(to);
            return
        }
        var diff = to - getScrollTop();
        if (diff === 0) return
        var step = diff / duration * 10;
        requestAnimationFrame(
            function () {
                if (Math.abs(step) > Math.abs(diff)) {
                    setScrollTop(getScrollTop() + diff);
                    return;
                }
                setScrollTop(getScrollTop() + step);
                if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
                    return;
                }
                scrollTo(to, duration - 16);
            });
    }
    /**
     *
     * @desc   5.5 url参数转对象
     * @name   parseQueryString
     * @param  {String} url  default: window.location.href
     * @return {Object}
     */
    function parseQueryString(url) {
        url = url == null ? window.location.href : url
        var search = url.substring(url.lastIndexOf('?') + 1)
        if (!search) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }
    /**
     *
     * @desc   5.6 对象序列化
     * @name   stringfyQueryString
     * @param  {Object} obj
     * @return {String}
     */
    function stringfyQueryString(obj) {
        if (!obj) return '';
        var pairs = [];

        for (var key in obj) {
            var value = obj[key];

            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }

        return pairs.join('&');
    }
//六、正则判断
    /**
     *
     * @desc   6.1 判断是否为邮箱地址
     * @name   isEmail
     * @param  {String}  str
     * @return {Boolean}
     */
    function isEmail(str) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    }

    /**
     *
     * @desc  6.2 判断是否为身份证号
     * @name  isIdCard
     * @param  {String|Number} str
     * @return {Boolean}
     */
    function isIdCard(str) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }

    /**
     *
     * @desc   6.2 判断是否为手机号
     * @name   isPhoneNum
     * @param  {String|Number} str
     * @return {Boolean}
     */
    function isPhoneNum(str) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
    }

    /**
     *
     * @desc   6.3 判断是否为URL地址
     * @name   isUrl
     * @param  {String} str
     * @return {Boolean}
     */
    function isUrl(str) {
        return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
    }

//七、过滤器
    /**
     *
     * @desc   7.1 现金额转大写
     * @name   digitUppercase
     * @param  {Number} n
     * @return {String}
     */
    function digitUppercase(n) {
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    }






