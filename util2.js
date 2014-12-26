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
    
    
    //加载XML文件 
    function loadXML(path){
       var xmlDoc = null
       try{
         xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
       }catch(e1){
         console.dir("e1:"+e1);
         try{
           xmlDoc = document.implementation.createDocument("","",null);
         }catch(e2){
           //TODO
           console.dir("e2:"+e2);
         }
       } 
       try{
         xmlDoc.async = false;//同步
         xmlDoc.load(path);//chrome不支持此方法 解决办法是: 使用ajax的xmlrequest代替.
         return (xmlDoc);
       }catch(e3){
         console.dir("e3:"+e3);
       }
     }
