/*可燃气体传感器*/
var combustibleGas = {

  html :  ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#attrEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">可燃气体</div>' +
                 '<div class="view">' +
                    '<div class="panel-sensor" id="combustibleGas">'+
                        '<h3 class="title">'+
                          '可燃气体标题'+
                          '<div class="right">MAC地址：<span class="mac">11:22:33:44:55:66:77:88</span></div>'+
                        '</h3>'+
                        '<div class="body">'+
                          '<img class="img" src="images/sensor/combustibleGas00.jpg" alt="">'+
                          '<div class="button">'+
                            '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                            '<input class="btn-data btn_sensor" type="button" value="K1">'+
                            '<input class="btn-data btn_sensor" type="button" value="K2">'+
                          '</div>'+
                          '<div class="value">'+
                            '状态：<span class="t_value">0</span>Lx&nbsp;&nbsp;'+
                            '上报开关:<span class="d0_value">30</span>&nbsp;&nbsp;上报间隔:<span class="v0_value">30</span>&nbsp;&nbsp;'+
                            '<span class="node_type">ZigBee</span>'+
                          '</div>'+
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
                        '<input class="w200p widgetAttrChange" id="sensor_mac" type="text" value="A0" disabled="true ">' +
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
                      '<div class ="var_a" chan="A0">' +                  
                        '<div class="input-prepend mr10p">' +
                          '<span class="add-on">A0数据策略</span>' +
                          '<select class="w100p widgetAttrChange data_policy">' +
                              '<option value="data_random" selected="selected">随机数</option>' +
                          '</select>' +
                        '</div>' + 
                        '<div class="input-prepend mr10p">' +
                          '<span class="add-on">最小值</span>' +
                          '<input class="w50p widgetAttrChange min_value" value ="0" type="text">' +
                        '</div>' +
                        '<div class="input-prepend mr10p">' +
                          '<span class="add-on">最大值</span>' +
                          '<input class="w50p widgetAttrChange max_value" value ="1" type="text">' +
                        '</div>' + 
                      '</div>' +                            
                ' </div>',

  create: function(){//默认情况下无参数，可接收控件属性参数对象create(properties)
    var properties = getSensorAttrModal();
    properties.tid = "combustibleGas";
    properties.title = "可燃气体";
    properties.mac = makeMacAddr("ZigBee");
    properties.alist = [
                          {
                              "var_name": "A0",
                              "recent_val": 0,
                              "data_policy": {
                                  "min_val": 0,
                                  "max_val": 1,
                                  "method": "data_random"
                              }
                          }
                      ];
    properties.dlist = [
                            {
                                "var_name": "D0",
                                "data_bit": 1,
                                "recent_val": 1
                            }
                        ];
    properties.vlist = [
                            {
                                "var_name": "V0",
                                "val": "30"
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
    
    var ui = new CombustibleGasUI(properties);
    return ui;
  },

  showAttr: function(properties){
      $("#sensor_title").val(properties.title);
      $("#sensor_mac").val(properties.mac);
      $("#node_type").find("option[value='"+properties.node_type+"']").attr("selected",true);
      //变量A0显示
      $("[chan =A0]").find(".data_policy").find("option[value='"+properties.alist[0].data_policy.method+"']").attr("selected",true);
      $("[chan =A0]").find(".min_value").val(properties.alist[0].data_policy.min_val);
      $("[chan =A0]").find(".max_value").val(properties.alist[0].data_policy.max_val);
      //变量V0显示
      $("[chan = V0]").find("input").val(properties.vlist[0].val);
      //变量D0显示
      $("#d0_value").find("option[value='"+properties.dlist[0].data_bit+"']").attr("selected",true);
  },

  updateAttr: function(divid){
      var properties = getSensorAttrModal();
      properties.tid = divid;
      properties.title = $("#sensor_title").val();
      properties.mac = $("#sensor_mac").val();
      properties.node_type = $("#node_type").val();

      //遍历A0-1变量信息
      $(".var_a").each(function(){
        var t = {
            "var_name": $(this).attr("chan"),
            "recent_val": 0,
            "data_policy": {
                "min_val": parseFloat( $(this).find(".min_value").val()),
                "max_val": parseFloat( $(this).find(".max_value").val()),
                "method": $(this).find(".data_policy").val()
            }
        };
        properties.alist.push(t);
      });

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

      //console.log(properties);        
      var ui = new CombustibleGasUI(properties);
      return ui;
  },

  updateData:function(divid){
    //获取通道上报开关值
    var D0 = getD0Value(divid);
    //上传各通道数据
    var data ="";
    if(uiTemplateObj[divid].alist.length >0){//若有A0-A7则主动上报A0-A7的值
      for(var i in uiTemplateObj[divid].alist){
        var str = uiTemplateObj[divid].alist[i].var_name;
        var bit = parseInt(str.substring(1));
        if(Math.pow(2,bit) & D0){//开启上报开关才能上报数据
          var t = makeSensorData(uiTemplateObj[divid].alist[i].data_policy,uiTemplateObj[divid].alist[i].recent_val);

          //传感器前端显示
          $("#"+divid).find(".t_value").text(t);
          if(t){
            $("#"+divid).find("img").attr("src","images/sensor/combustibleGas01.jpg");
          }
          else{
            $("#"+divid).find("img").attr("src","images/sensor/combustibleGas00.jpg");
          }

          //临时保存
          uiTemplateObj[divid].alist[i].recent_val = t;
          data = data+uiTemplateObj[divid].alist[i].var_name+"="+t+",";
        }
      }
      if(data !=""){
        data = data.substring(0,data.lastIndexOf(','));
        data = '{'+data+'}';
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }    
    }
  },

  updateD0:function(divid,val,cmd){//更新上报状态
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
    
    var reg = /^.*A[0].*$/;
    if(reg.test(chan) && val =='?'){
      for(var i in uiTemplateObj[divid].alist){
        if(uiTemplateObj[divid].alist[i].var_name == chan){
          var data = chan +"=" +uiTemplateObj[divid].alist[i].recent_val;
          data ='{'+data +'}';
          pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
        }
      }
    }
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
      switch(key){
        case "K1"://模拟检测出可燃气体、并立马上报
          if(uiTemplateObj[divid].alist[0].recent_val == 0){

            uiTemplateObj[divid].alist[0].recent_val = 1;

            var val = uiTemplateObj[divid].alist[0].recent_val;
            $("#"+divid).find(".t_value").text(val);
            $("#"+divid).find("img").attr("src","images/sensor/combustibleGas01.jpg");
            var data = "";
            var D0 = getD0Value(divid);
            if(D0 == 1){
              data = '{A0='+val+'}';
              pushSensorData(uiTemplateObj[divid].mac,data);
            } 
          }
          break;
        case "K2"://模拟无可燃气体、并立马上报
          if(uiTemplateObj[divid].alist[0].recent_val == 1){

            uiTemplateObj[divid].alist[0].recent_val = 0;

            var val = uiTemplateObj[divid].alist[0].recent_val;
            $("#"+divid).find(".t_value").text(val);
            $("#"+divid).find("img").attr("src","images/sensor/combustibleGas00.jpg");

            var data = "";
            var D0 = getD0Value(divid);
            if(D0 == 1){
              data = '{A0='+val+'}';
              pushSensorData(uiTemplateObj[divid].mac,data);
            } 
          }
          break;
        default:
          break;
      }    
    }
  }
}

function CombustibleGasUI(prop)
{
	this.properties = prop;
	var html =  '<h3 class="title">'+
                prop.title+
                '<div class="right">MAC地址：<span class="mac">'+prop.mac+'</span></div>'+
              '</h3>'+
              '<div class="body">'+
                '<img class="img" src="images/sensor/combustibleGas00.jpg" alt="">'+
                '<div class="button">'+
                  '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                  '<input class="btn-data btn_sensor" type="button" value="K1">'+
                  '<input class="btn-data btn_sensor" type="button" value="K2">'+
                '</div>'+
                '<div class="value">'+
                  '状态：<span class="t_value">0</span>&nbsp;&nbsp;'+
                  'D0值:<span class="d0_value">1</span>&nbsp;&nbsp;V0值:<span class="v0_value">30</span>&nbsp;&nbsp;'+
                  '<span class="node_type">ZigBee</span>'+
                '</div>'+
              '</div>';
	$("#"+prop.tid).html(html);
  var str="";

  //显示状态
  $("#"+prop.tid).find(".t_value").text(prop.alist[0].recent_val);

  //显示V0相关的值
  $("#"+prop.tid).find(".v0_value").text(prop.vlist[0].val);

  //显示D0
  $("#"+prop.tid).find(".d0_value").text(prop.dlist[0].recent_val);
}