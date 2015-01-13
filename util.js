   /**
    JS中如果整数内存大于32位时, JS会自动屏蔽掉32位以后字节
    **/
        
    
    /**
    **转换为2进制，目前只考虑输入为十进制,只针对内存在32位之内的数值（2147483647）
    **/
    var defS = "0000000000000000000000000000000";//31个零
    function toBinaryString(num){
      var _ns = num.toString(2),
          _nsl = _ns.length,
          _dif = 31-_nsl,
          _rs = "(0{"+_dif+"})",
          _reg = new RegExp(_rs),
          _isNeg = _ns.charCodeAt(0) === 45;//是否是负数
      return (_isNeg?"10":"0")+defS.substring(0,_dif).replace(_reg,"$1"+_ns.replace("-",""));
    }
    /**
    **转换为10进制，目前只考虑输入为2进制，因为默认定义的数字为十进制所以输入参数为2进制数字的字符串表示
    **/
    function toDecimalString(num){
       var _n = num.length===32,//2进制字符串的长度是否等于32位
           _isNeg = false,//是否是负数
           _rg = /(0*)1/;
       if(_n){
         _isNeg = num.charAt(0) == 1;
         num = num.substring(1);//去除符号位
       }
       num = num.replace(_rg,""+1);
      return (_isNeg?"-":"")+parseInt(num,2)
    }
    
   /**
    *计算最大值 参数可以是数组和多个参数
    **/
    function max(){
      var _max = Math.max,
          _args = [].slice.call(arguments),
          _isAry = {}.toString.call(_args[0]) == "[object Array]";
      return _max.apply(null,_isAry?_args[0]:_args);
    }
    
    /**
    *计算最大值 参数可以是数组和多个参数,上边的改进版
    **/
    function max2(fst){
      var _max = Math.max,_isAry = fst instanceof Array;
      return _max.apply(null,_isAry?fst:arguments);
    }
    
    /**
    *计算最大值 参数可以是数组和多个参数
    **/
    function max3(fst){
      return Math.max.apply(null,(fst instanceof Array)?fst:arguments);
    }
    
    
    //对象数组比较 TODO 可优化
    function by(n){
      var t = arguments[1]||"asc",
          isAsc = (t.toLowerCase() === "asc"),
          cpr = function (now,next){
            var _r = isAsc?now[n].localeCompare(next[n]):next[n].localeCompare(now[n]);//包含中文的比较
            return _r;
          }
      return cpr;
    }
    //普通数组比较
    by.normal = function (){
      var t = arguments[0]||"asc",
          isAsc = (t.toLowerCase() === "asc"),
          cpr = function(now,next){
              var _r = isAsc?(now-next):(next-now);
              return _r;
          }
      return cpr;
    }
    //优化上边
   //对象数组比较
    function by(n){
       var t = arguments[1]||"asc",isAsc = (t.toLowerCase() === "asc"),cpr = "".localeCompare;//优化点
       return function (now,next){
            var _r = isAsc?cpr.call(now[n],next[n]):cpr.call(next[n],now[n]);//优化点
            return _r;
       }

    }
    //普通数组比较
    by.normal = function (){
      var t = arguments[0]||"asc",isAsc = (t.toLowerCase() === "asc");
      return function(now,next){
          var _r = isAsc?(now-next):(next-now);
          return _r;
      }

    }
    //下划线转驼峰
    function line2Camel(str){
      var rg = /[_-](\w|\d)/g,r = rg.test(str),fm = RegExp["$+"].toUpperCase();
      return str.replace(rg,fm);
    }
    //驼峰转下划线
    function camel2Line(str,lt){
      var rg = /([A-Z])/g,lt = lt||"_";
      return str.replace(rg,lt+"$1");
    }
    
   //取得location.href的指定参数
    function getParam(key){
      var s = location.search,rg = new RegExp(key+"=(\\w)&*"),r = rg.test(s);
      return RegExp["$+"];
    }
    
    //函数扩展
    function XArray(){
       var array = new Array();
       [].push.apply(array,arguments);
       //自定义方法
       array.toStr = function (){
         console.log(this.join(" fuck "));
         console.log(this.reverse().join(" fuck "));//为了公平
       }
       return array
     }
     
    //获得字符串的字节
    function getBytes(str){
      var ret = [],code = "".charCodeAt;
      (function (){
         for(var i = 0,n = str.length;i<n;i++){
           ret.push(code.call(str[i])&0xff);
         }
      })();
      return ret;
    }
    
    /*
      获取元素样式
      */
     function css(obj,cn){
         var cs = obj.currentStyle || getComputedStyle(obj,null);
         return cs[cn];
     }
    
    //未知字符
    function fixedCharCodeAt (str, idx) {
          idx = idx || 0;
          var code = str.charCodeAt(idx);
          var hi, low;
          if (0xD800 <= code && code <= 0xDBFF) {
              hi = code;
              low = str.charCodeAt(idx+1);
              if (isNaN(low)) {
                  throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
              }
              return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
          }
          if (0xDC00 <= code && code <= 0xDFFF) { 
              return false;
          }
          return code;
      }
    
    //已知字符
    function knownCharCodeAt (str, idx) {
        str += '';
        var code,
            end = str.length;

        var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        while ((surrogatePairs.exec(str)) != null) {
            var li = surrogatePairs.lastIndex;
            if (li - 2 < idx) {
                idx++;
            }
            else {
                break;
            }
        }

        if (idx >= end || idx < 0) {
            return NaN;
        }

        code = str.charCodeAt(idx);
      
        var hi, low;
        if (0xD800 <= code && code <= 0xDBFF) {
            hi = code;
            low = str.charCodeAt(idx+1);
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        return code;
    }
    
   //数组分块模式
    function chunk(array,process,context){
      setTimeout(function (){
        var item = array.shift();//删除并返回第一个元素
        process.call(context,item);
        if(array.length>1)
          setTimeout(arguments.callee,100);//严格模式下有问题
      },100);
    }
    
    //数组复制
    function arrayClone(array){
      return array.concat();
    }
    //数组复制2
    function arrayClone2(array){
      return array.slice();
    }
   //求连续最大的五位数
   function solution(s) {
       var r = /(?=(\d{4}))/g,
       rt = s.replace(r, "$1,").split(",");
       return Math.max.apply(null, rt);
   }
   //添加千分位号
   function addThSign(s) {
      //var r0 = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;（最正确的）
      var r = /(\d)(?=(\d{3})+(?!\d))/g;
      return rt = s.replace(r, "$1,");  
   }

