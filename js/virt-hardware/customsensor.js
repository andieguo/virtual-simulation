var customsensor = {

  html :  ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#attrEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">自定义传感器</div>' +
                 '<div class="view">' +
                    '<div class="panel-sensor" id="customsensor">'+
                        '<h3 class="title">'+
                          '传感器标题'+
                          '<div class="right">MAC地址：<span class="mac">11:22:33:44:55:66:77:88</span></div>'+
                        '</h3>'+
                        '<div class="body">'+
                          '<img class="img" src="images/sensor/customsensor.jpg" alt="">'+
                          '<div class="button">'+
                            '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                          '</div>'+
                          '<div class="value">'+
                            '当前值：<span class="t_value">0</span>&nbsp;&nbsp;'+
                            '上报间隔:<span class="t_interval">30</span>&nbsp;&nbsp;'+
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
                      '<div class="input-prepend mr10p" style="font-size:8px">' +
                        '<span class="add-on">通道选择</span>' +
                        '<input type="checkbox" name="var_a" value="A7" />A7' +
                        '<input type="checkbox" name="var_a" value="A6" />A6' +
                        '<input type="checkbox" name="var_a" value="A5" />A5' +
                        '<input type="checkbox" name="var_a" value="A4" />A4' +
                        '<input type="checkbox" name="var_a" value="A3" />A3' +
                        '<input type="checkbox" name="var_a" value="A2" />A2' +
                        '<input type="checkbox" name="var_a" value="A1" />A1' +
                        '<input type="checkbox" name="var_a" value="A0" />A0' +                                             
                      '</div>' +
                      '<div class="input-prepend mr10p" style="font-size:8px">' +
                        '<span class="add-on">变量选择</span>' +
                        '<input type="checkbox" name="var_v" value="V3" />V3' +
                        '<input type="checkbox" name="var_v" value="V2" />V2' +
                        '<input type="checkbox" name="var_v" value="V1" />V1' +
                        '<input type="checkbox" name="var_v" value="V0" />V0' +                                           
                      '</div><br>' + 
                      '<div class="input-prepend mr10p" style="font-size:8px">' +
                        '<span class="add-on">D0位设置</span>' +
                        '<input type="checkbox" name="var_d0" value="7" />7' +
                        '<input type="checkbox" name="var_d0" value="6" />6' +
                        '<input type="checkbox" name="var_d0" value="5" />5' +
                        '<input type="checkbox" name="var_d0" value="4" />4' +
                        '<input type="checkbox" name="var_d0" value="3" />3' +
                        '<input type="checkbox" name="var_d0" value="2" />2' +
                        '<input type="checkbox" name="var_d0" value="1" />1' +
                        '<input type="checkbox" name="var_d0" value="0" />0' +                                             
                      '</div>' +
                      '<div class="input-prepend mr10p" style="font-size:8px">' +
                        '<span class="add-on">D1位设置</span>' +
                        '<input type="checkbox" name="var_d1" value="7" />7' +
                        '<input type="checkbox" name="var_d1" value="6" />6' +
                        '<input type="checkbox" name="var_d1" value="5" />5' +
                        '<input type="checkbox" name="var_d1" value="4" />4' +
                        '<input type="checkbox" name="var_d1" value="3" />3' +
                        '<input type="checkbox" name="var_d1" value="2" />2' +
                        '<input type="checkbox" name="var_d1" value="1" />1' +
                        '<input type="checkbox" name="var_d1" value="0" />0' +                                             
                      '</div><br>' +   
                ' </div>',

  create: function(){//默认情况下无参数，可接收控件属性参数对象create(properties)
    var properties = {
        tid: "customsensor",
        title:"自定义传感器",
        mac:makeMacAddr("ZigBee"),
        V0:30,
        D0:1,
        node_type:"ZigBee",
        data_policy:"data_random",
        min_value:-10.0,
        max_value:60.0,
        power:"off"
    };

    //将create()输入的属性参数绘制控件UI
	if(arguments.length >0){
		$.extend(properties,arguments[0]);
	}
	else{
	    var e = $(".demo #customsensor");
	    var t = randomNumber();
	    var n = "customsensor_" + t;
	    e.attr("id", n);
	    $.extend(properties,{"tid":n});
	}
    
    var ui = new customSensorUI(properties);
    return ui;
  },

  showAttr: function(properties){
      $("#sensor_title").val(properties.title);
      $("#sensor_mac").val(properties.mac);
      $("#update_time").val(properties.V0);
      $("#min_value").val(properties.min_value);
      $("#max_value").val(properties.max_value); 
  },

  updateAttr: function(divid){
      var title = $("#sensor_title").val();
      var mac = $("#sensor_mac").val();
      var update_sw = $("#update_sw").val();
      var interval = $("#update_time").val();
      var node_type = $("#node_type").val();
      var data_policy = $("#data_policy").val();
      var min_value = $("#min_value").val();
      var max_value = $("#max_value").val();

      var properties = {
          tid: divid,
          title:title,
          mac:mac,
          V0:parseInt(interval),
          D0:parseInt(update_sw),
          node_type:node_type,
          data_policy:data_policy,
          min_value:parseFloat(min_value),
          max_value:parseFloat(max_value),
          power:"off"
      };
      
      var ui = new customSensorUI(properties);
      return ui;
  },

  updateData:function(divid){
      var range = {"min":uiTemplateObj[divid].min_value,"max":uiTemplateObj[divid].max_value};
      var val = makeSensorData(uiTemplateObj[divid].data_policy,range);      
      //传感器显示实时数据
      $("#"+divid).find(".t_value").text(val);

      var data = "{A0="+val+"}";
      pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
  },

  updateD0:function(divid,val){//更新上报状态
    if(val){//开启上报
      if(uiTemplateObj[divid].D0 != 1){
        uiTemplateObj[divid].D0 = 1;
        sensorIntervalObj[divid] =setInterval(function(){//开启定时器
          customsensor.updateData(divid);
        },(uiTemplateObj[divid].V0)*1000);
      }
    }
    else{//关闭上报
      if(uiTemplateObj[divid].D0 != 0){
        uiTemplateObj[divid].D0 = 0;
        clearInterval(sensorIntervalObj[divid]);//清除定时器
      }
    }
  },

  updateV0:function(divid,val){//更新上报间隔
    if(uiTemplateObj[divid].D0){
      clearInterval(sensorIntervalObj[divid]);//清除原定时器

      uiTemplateObj[divid].V0 = val;
      sensorIntervalObj[divid] =setInterval(function(){//开启定时器
        customsensor.updateData(divid);
      },val*1000);
    }

    //传感器控件显示
    $("#"+divid).find(".t_interval").val(val);
  },

  messageArrive:function(divid,chan,val){//{A0=?,V0=20}、{A0=?}、{v0=20}
    if(uiTemplateObj[divid].power == "off") return;
    
    if(chan == "A0" && val =='?'){
      customsensor.updateData(divid);
    }
    if(chan == "D0" && val =='?'){
        var data = "{D0=1}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
    }
    if(chan == "OD0" && val =='1'){
      customsensor.updateD0(divid,1);
    }
    if(chan == "CD0" && val =='1'){
      customsensor.updateD0(divid,0);
    }
    if(chan == "V0"){
      if(val =='?'){
        var  interval = uiTemplateObj[divid].V0;      
        var data = "{V0="+interval+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }
      else{
        customsensor.updateV0(divid,parseInt(val));
      }
    }
  }
}

function customSensorUI(prop)
{
	this.properties = prop;
	var html =  '<h3 class="title">'+
                prop.title +
                '<div class="right">MAC地址：<span class="mac">'+prop.mac+'</span></div>'+
              '</h3>'+
              '<div class="body">'+
                '<img class="img" src="images/sensor/customsensor.jpg" alt="">'+
                '<div class="button">'+
                  '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                '</div>'+
                '<div class="value">'+
                  '当前值：<span class="t_value">0</span>&nbsp;&nbsp;上报间隔:<span class="t_interval">'+prop.V0+'</span>&nbsp;&nbsp;<span class="node_type">'+prop.node_type+'</span>'+
                '</div>'+
              '</div>';

	$("#"+prop.tid).html(html);
}
