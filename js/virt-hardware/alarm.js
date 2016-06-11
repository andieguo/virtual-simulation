var alarm = {

  html :  ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#attrEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">声光报警</div>' +
                 '<div class="view">' +
                    '<div class="panel-sensor" id="alarm">'+
                        '<h3 class="title">'+
                          '声光报警标题'+
                          '<div class="right">MAC地址：<span class="mac">11:22:33:44:55:66:77:88</span></div>'+
                        '</h3>'+
                        '<div class="body">'+
                          '<img class="img" src="images/sensor/alarm00.jpg" alt="">'+
                          '<div class="button">'+
                            '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                            '<input class="btn-data btn_sensor" type="button" value="K1">'+
                            '<input class="btn-data btn_sensor" type="button" value="K2">'+
                          '</div>'+
                          '<div class="value">'+
                            'D1值：<span class="t_value">0</span>&nbsp;&nbsp;'+
                            '上报开关:<span class="d0_value">30</span>&nbsp;&nbsp;上报间隔:<span class="v0_value">30</span>&nbsp;&nbsp;'+
                            '<span class="node_type">ZigBee</span>'+
                          '</div>'+
                          '<audio src="#" autoplay="autoplay" loop="loop"></audio>'+
                        '</div>'+
                    '</div>'+
                 '</div>'+
         '</div>',

  configHtml :  '<div class="attr-header">属性设置<button data-target="#close" class="close">&times;</button></div>' +
                    '<div class="attr-body">' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">标题</span>' +
                        '<input class="w150p widgetAttrChange" id = "sensor_title" type="text" placeholder="标题名称">' +
                      '</div>' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">MAC地址：</span>' +
                        '<input class="w200p widgetAttrChange" id="sensor_mac" type="text" disabled="true ">' +
                      '</div>' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">节点类型</span>' +
                        '<select class="w100p widgetAttrChange" id="node_type">' +
                            '<option value="ZigBee" selected="selected">ZigBee</option>' +
                            '<option value="IPv6">IPv6</option>' +
                            '<option value="Bluetooth">Bluetooth</option>' +
                            '<option value="WiFi">WiFi</option>' +
                        '</select>' +
                      '</div><br>' + 
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">通道</span>' +
                        '<input class="w200p widgetAttrChange" id="sensor_mac" type="text" value="D1" disabled="true ">' +
                      '</div>' + 
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">D0设置</span>' +
                        '<select class="w50p widgetAttrChange" id="var_d0">' +
                            '<option value="0">0</option>' +
                            '<option value="1" selected="selected">1</option>' +
                        '</select>' +
                      '</div>' +                  
                      '<div class="input-prepend mr10p var_v" chan="V0">' +
                        '<span class="add-on">V0值</span>' +
                        '<input class="w50p widgetAttrChange" value ="0" type="text">' +
                      '</div>'+
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">D1设置</span>' +
                        '<select class="w50p widgetAttrChange" id="var_d1">' +
                            '<option value="0" selected="selected">0</option>' +
                            '<option value="1">1</option>' +
                        '</select>' +
                      '</div>' +                            
                ' </div>',

  create: function(){//默认情况下无参数，可接收控件属性参数对象create(properties)
    var properties = getSensorAttrModal();
    properties.tid = "alarm";
    properties.title = "声光报警";
    properties.mac = makeMacAddr("ZigBee");
    properties.dlist = [
                            {
                                "var_name": "D0",
                                "data_bit": 1,
                                "recent_val": 1
                            },
                            {
                                "var_name": "D1",
                                "data_bit": 1,
                                "recent_val": 0
                            }
                        ];
    properties.vlist = [
                            {
                                "var_name": "V0",
                                "val": "120"
                            }
                        ];

    //将create()输入的属性参数绘制控件UI
  if(arguments.length >0){
    $.extend(properties,arguments[0]);
  }
  else{
      var e = $(".demo #"+properties.tid);
      var t = randomNumber();
      var n = properties.tid+"_" + t;
      e.attr("id", n);
      $.extend(properties,{"tid":n});
  }
    
    var ui = new AlarmUI(properties);
    return ui;
  },

  showAttr: function(properties){
      $("#sensor_title").val(properties.title);
      $("#sensor_mac").val(properties.mac);
      $("#node_type").find("option[value='"+properties.node_type+"']").attr("selected",true);

      //变量V0显示
      $("[chan = V0]").find("input").val(properties.vlist[0].val);
      //变量D0显示
      $("#d0_value").find("option[value='"+properties.dlist[0].data_bit+"']").attr("selected",true);
      //变量D1显示
      $("#d1_value").find("option[value='"+properties.dlist[1].recent_val+"']").attr("selected",true);
  },

  updateAttr: function(divid){
      var properties = getSensorAttrModal();
      properties.tid = divid;
      properties.title = $("#sensor_title").val();
      properties.mac = $("#sensor_mac").val();
      properties.node_type = $("#node_type").val();

      //遍历V0变量信息
      $(".var_v").each(function(){
        var t = {
            "var_name": $(this).attr("chan"),
            "val": parseInt($(this).find("input").val())
        };
        properties.vlist.push(t);
      });

      //D0信息
      var t =  {
          "var_name": "D0",
          "data_bit": parseInt($("#var_d0").val()),
          "recent_val": parseInt($("#var_d0").val())
      };
      properties.dlist.push(t);

      //D1信息
      var t =  {
          "var_name": "D1",
          "data_bit": 1,
          "recent_val": parseInt($("#var_d1").val())
      };
      properties.dlist.push(t);
      //console.log(properties);        
      var ui = new AlarmUI(properties);
      return ui;
  },

  updateData:function(divid){
    //获取通道上报开关值
    var D0 = getD0Value(divid);

    var data ="";
    if(D0){
      var D1 = getD1Value(divid);
      if(D1 != undefined){
        data = "{D1="+D1+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      } 
    }
  },

  updateD0:function(divid,val){//更新上报状态
    var D0 = getD0Value(divid);
    if(cmd == "open"){//OD0命令
      if((D0 & val) < val){//开启新通道的上传开关
        var t = D0|val;
        setD0Value(divid,t);
        $("#"+divid).find(".d0_value").text("D0="+t);

        clearInterval(sensorIntervalObj[divid]);//清除定时器
        //获取上报时间间隔
        var V0 = getV0Value(divid);
        //开启新的定时器
        sensorIntervalObj[divid] =setInterval(function(){
          var sensor = divid.substring(0,divid.indexOf('_'));
          gUiObject[sensor].updateData(divid);//交给传感器处理
        },V0*1000);
      }
    }
    if(cmd == "close"){//CD0命令
      if((D0 & val) > 0){//
        var t = D0-(D0&val);
        setD0Value(divid,t);
        $("#"+divid).find(".d0_value").text("D0="+t);

        clearInterval(sensorIntervalObj[divid]);//清除定时器
        //获取上报时间间隔
        var V0 = getV0Value(divid);
        //开启新的定时器
        sensorIntervalObj[divid] =setInterval(function(){
          var sensor = divid.substring(0,divid.indexOf('_'));
          gUiObject[sensor].updateData(divid);//交给传感器处理
        },V0*1000);
      }
    } 
  },
  updateD1:function(divid,val,cmd){//更新D1的值
    var D1 = getD1Value(divid);
    if(cmd == "open"){//OD1命令
      if((D1 & val) < val){
        var t = D1|val;
        setD1Value(divid,t);
        if(t == 1){
          $("#"+divid).find("img").attr("src","images/sensor/alarm01.jpg");
          $("#"+divid).find("audio").attr("src","audio/alarm.mp3");
        }

        $("#"+divid).find(".t_value").text(t);
        var data = "{D1="+t+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }
    }
    if(cmd == "close"){//CD1命令
      if((D1 & val) > 0){//
        var t = D1-(D1&val);
        setD1Value(divid,t);
        if(t == 0){
          $("#"+divid).find("img").attr("src","images/sensor/alarm00.jpg");
          $("#"+divid).find("audio").attr("src","#");
        }
        $("#"+divid).find(".t_value").text(t);
        var data = "{D1="+t+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }
    }    
  },
  updateV0:function(divid,val){//更新上报间隔
    setV0Value(divid,val);
    $("#"+divid).find(".v0_value").text(val);
    
    if(getD0Value(divid)){
      var V0 = getV0Value(divid);
      clearInterval(sensorIntervalObj[divid]);//清除原定时器
      var sensor = divid.substring(0,divid.indexOf('_'));

      sensorIntervalObj[divid] =setInterval(function(){//开启定时器
        gUiObject[sensor].updateData(divid);
      },V0*1000);
    }
  },

  messageArrive:function(divid,chan,val){
    if(uiTemplateObj[divid].power == "off") return;
    var sensor = divid.substring(0,divid.indexOf('_'));

    if(chan == "D0" && val =='?'){
      var D0 = getD0Value(divid);
      if(D0 !=undefined){
        var data = "{D0="+D0+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }

    }
    if(chan == "OD0"){
      gUiObject[sensor].updateD0(divid,val,"open");
    }
    if(chan == "CD0"){
      gUiObject[sensor].updateD0(divid,val,"close");
    }
    if(chan == "D1" && val =='?'){
      var D1 = getD1Value(divid);
      if(D1 != undefined){
        var data = "{D1="+D1+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }

    }
    if(chan == "OD1"){
      gUiObject[sensor].updateD1(divid,val,"open");
    }
    if(chan == "CD1"){
      gUiObject[sensor].updateD1(divid,val,"close");
    }
    if(chan == "V0"){
      if(val =='?'){
        var interval = getV0Value(divid);
        if(interval != undefined){   
          var data = "{V0="+interval+"}";
          pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
        }
      }
      else{
        if(getV0Value(divid) != undefined){
          gUiObject[sensor].updateV0(divid,parseInt(val));
        }

      }
    }
  },
  handSensorBtnEvt:function(key,divid){
    if(uiTemplateObj[divid].power == "on"){
      var sensor = divid.substring(0,divid.indexOf('_'));
      switch(key){
        case "K1"://控制开,并立马上报
          gUiObject[sensor].updateD1(divid,1,"open");
          break;
        case "K2"://控制关,并立马上报
          gUiObject[sensor].updateD1(divid,1,"close");
          break;
        default:
          break;
      }    
    }
  }
}

function AlarmUI(prop)
{
	this.properties = prop;
	var html =  '<h3 class="title">'+
                prop.title+
                '<div class="right">MAC地址：<span class="mac">'+prop.mac+'</span></div>'+
              '</h3>'+
              '<div class="body">'+
                '<img class="img" src="images/sensor/alarm00.jpg" alt="">'+
                '<div class="button">'+
                  '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                  '<input class="btn-data btn_sensor" type="button" value="K1">'+
                  '<input class="btn-data btn_sensor" type="button" value="K2">'+
                '</div>'+
                '<div class="value">'+
                  'D1值：<span class="t_value">0</span>&nbsp;&nbsp;'+
                  'D0值:<span class="d0_value">1</span>&nbsp;&nbsp;V0值:<span class="v0_value">30</span>&nbsp;&nbsp;'+
                  '<span class="node_type">ZigBee</span>'+
                '</div>'+
                '<audio src="#" autoplay="autoplay" loop="loop"></audio>'+
              '</div>';
	$("#"+prop.tid).html(html);
  var str="";

  //显示D1值
  var D1 = prop.dlist[1].recent_val;
  $("#"+prop.tid).find(".t_value").text(D1);
  if(D1 == 1){
    $("#"+prop.tid).find("img").attr("src","images/sensor/alarm01.jpg");
    $("#"+prop.tid).find("audio").attr("src","audio/alarm.mp3");
  }
  if(D1 == 0){
    $("#"+prop.tid).find("img").attr("src","images/sensor/alarm00.jpg");
    $("#"+prop.tid).find("audio").attr("src","#");
  }

  //显示V0相关的值
  $("#"+prop.tid).find(".v0_value").text(prop.vlist[0].val);

  //显示D0
  $("#"+prop.tid).find(".d0_value").text(prop.dlist[0].recent_val);
}