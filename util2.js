EventUtil = {
      //添加事件
      addHandler:function (ele,etype,ehandler){
        if(ele.addEventListener)
          ele.addEventListener(etype,ehandler,false);
        else if(ele.attachEvent)
          ele.attachEvent("on"+etype,ehandler);
        else
          ele["on"+etype] = ehandler;
      },
      //移除事件
      removeHandler:function (ele,etype,ehandler){
        if(ele.removeEventListener)
          ele.removeEventListener(etype,ehandler,false);
        else if(ele.detachEvent)
          ele.detachEvent("on"+etype,ehandler);
        else
          ele["on"+etype] = null;
      },
      //获得event对象
      getEvent:function (event){
        return event?event:window.event;
      },
      //获得target对象
      getTarget:function (event){
        return event.target || event.srcElement;
      },
      //阻止默认行为
      preventDefault:function (event){
        if(event.preventDefault)
          event.preventDefault();
        else
          event.returnValue = false;
      },
      //阻止冒泡
      stopPropagation:function (event){
        if(event.stopPropagation)
          event.stopPropagation();
        else
          event.cancelBubble = true;
      }
    };
