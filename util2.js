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
     
         //下边方法的数据
    var abd = [{
        text: "123",
        children: [{
            text: "123_1",
            children: [{
                text: "123_1_1",
                children: [{
                    text: "123_1_1_1",
                    children: []
                },
                {
                    text: "123_1_1_2",
                    children: []
                }]
            },
            {
                text: "123_1_2",
                children: []
            }]
        }]
    }];
    
    //获得最深而且含有子节点的节点
    function getDeepest(){
      var s = JSON.stringify(abd).trim(), rg = /\[\{(?:"text":("\w+"*?))/g,r = s.match(rg),ln = r.length;
      return r[ln-2]
    }
    getDeepest();
    
    
       function startRead(){
      var file = document.getElementById("myfile").files.item(0);
      if(file){
        getAsText(file);
      }
    }
    
    function getAsText(infile){
      var reader = new FileReader(); 
      reader.readAsText(infile,"UTF-8");
      reader.onprogress = updateProGress;
      reader.onload = onLoad;
      reader.onerror = onError;
      
    }
    
    
    function updateProGress(event){
      console.log(event);
      if(event.lengthComputable){
        var loaded = event.loaded/event.total;
        console.log(loaded);
        if(loaded<1){
          
        }
      }
    }
    
    function onLoad(event){
      var ret = event.target.result;
      //console.log(ret);
    }
    
    function onError(event){
      console.log(event.target.error.name);
    }
