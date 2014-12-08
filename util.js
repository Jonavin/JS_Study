    /**
    **转换为2进制
    **/
    var defS = "0000000000000000000000000000000";//31个零
    function toBinaryString(num){
      var _ns = num.toString(2),
          _nsl = _ns.length,
          _dif = 31-_nsl,
          _rs = "(0{"+_dif+"})",
          _reg = new RegExp(_rs),
          _isNeg = _ns.charCodeAt(0) === 45;//是否是负数

      return (_isNeg?"1":"0")+defS.substring(0,_dif).replace(_reg,"$1"+_ns.replace("-",""));
    }
