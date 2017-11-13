# angular_demo
angularjs学习笔记
个人常用js库：selfLib/self_lib.js
  一、js常用
  /**
  * 1.1 判断是否为数字
  * isNumber
  * @ param str 传参
  * */

  /**
  *1.2 判断是否是对象
  * isObj
  * @ param obj 传参
   */

   /**
    * 1.3 判断是否为空
    * isEmpty
    * @param obj 传参
    */

    /**
     * 1.4 数组去重
     * unique1
     */
  二、解决浏览器兼容
      /**
       * 2.1 处理IE6-IE8不兼容forEach()与map()遍历
       * forEach遍历数组
       * @param callback [function] 回调函数；
       * @param context [object] 上下文；
       */

       /**
        * 2.2 map遍历数组
        * @param callback [function] 回调函数；
        * @param context [object] 上下文；
        */
  三、时间日期处理
      /**
       *  3.1 格式化日期 yyyy-mm-dd
       *  formateTime
       *  @param date 传入参数
       */

       /**
        *  3.2 计算N天后的日期
        *  getNday
        *  initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
        *  @param statDate 开始时间 如果未设置，默认为当天日期 格式：yyyymmdd/yyyy-mm-dd 2017-09-08
        *  @param days 几天后 可以为负数
        */

       /**
        *  3.3 获取指定日期所在周的周一日期
        *  getMonday
        *  @param date 格式：yyyy-mm-dd
        */


  四、功能函数
        /**
        *  4.1 HashTable
        *  HashTable
        *  精简版的哈希表
        *
        *函数名         	说明	                返回值
        *add(key,value)	添加项	             无
        *getValue(key)	    根据key取值	         object
        *remove(key)	    根据key删除一项	      无
        *containsKey(key)	是否包含某个key	      bool
        *containsValue(value)	是否包含某个值	      bool
        *getValues()	        获取所有的值的数组	  array
        *getKeys()	         获取所有的key的数组	  array
        *getSize()	         获取项总数	          int
        *clear()	         清空哈希表	           无
        */

        /**
         *  4.2 input限制输入框输入字符数为中文2个字符，英文1个字符
         *  maxCodeLength
         *  输入框文字长度限制
         *  使用方式： <input type='text' maxcodelength="60"/>
         *  @maxcodelength  字符长度，中文两个字符，英文一个字符
         */