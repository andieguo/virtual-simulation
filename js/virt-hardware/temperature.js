var temperature = {

  html :  ' <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>'+
                '<span class="configuration"><button type="button" class="btn btn-mini" data-target="#attrEditorModal" role="button" data-toggle="modal">编辑</button></span>'+
                 '<div class="preview">温度传感器</div>' +
                 '<div class="view">' +
                    '<div class="panel-sensor" id="temperature">'+
                        '<h3 class="title">温度传感器标题</h3>'+
                        '<div class="body">'+
                            '<div>MAC地址：<span class="mac">11:22:33:44:55:66:77:88</span></div>'+
                            '<img src="images/sensor/temperature.jpg" alt="">'+
                            '<div>'+
                                '<input type="button" class="power_switch" value="ON">'+
                                '<input type="button" value="UP">'+
                                '<input type="button" value="DOWN">'+
                            '</div>'+
                            '<div>'+
                                '当前温度：<span class="t_value">32</span>℃  上报间隔:<span class="t_interval">30</span>'+
                            '</div>'+
                            '<div class="node_type">ZigBee</div>'+
                        '</div>'+
                    '</div>'+
                 '</div>'+
         '</div>',

  configHtml :  '<div class="attr-header">属性设置<button data-target="#close" class="close">&times;</button></div>' +
                    '<div class="attr-body">' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">标题</span>' +
                        '<input class="w150p widgetAttrChange" id = "sensor_title" type="text" placeholder="标题名称">' +
                      '</div><br>' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">MAC地址：</span>' +
                        '<input class="w200p widgetAttrChange" id="sensor_mac" type="text" disabled="true ">' +
                      '</div><br>' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">设定上报间隔</span>' +
                        '<input class="w50p widgetAttrChange" id="update_time" type="text">' +
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
                        '<span class="add-on">数据生成策略</span>' +
                        '<select class="w100p widgetAttrChange" id="data_policy">' +
                            '<option value="data_random" selected="selected">随机数</option>' +
                            '<option value="data_sin">正弦函数</option>' +
                            '<option value="data_cos">余弦函数</option>' +
                        '</select>' +
                      '</div>' + 
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">最小值</span>' +
                        '<input class="w50p widgetAttrChange" id="min_value" type="text">' +
                      '</div>' +
                      '<div class="input-prepend mr10p">' +
                        '<span class="add-on">最大值</span>' +
                        '<input class="w50p widgetAttrChange" id="max_value" type="text">' +
                      '</div>' +      
                ' </div>',

  create: function(){//默认情况下无参数，可接收控件属性参数对象create(properties)
    var properties = {
        tid: "temperature",
        title:"温度传感器",
        mac:makeMacAddr("ZigBee"),
        interval:30,
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
	    var e = $(".demo #temperature");
	    var t = randomNumber();
	    var n = "temperature_" + t;
	    e.attr("id", n);
	    $.extend(properties,{"tid":n});
	}
    
    var ui = new TemperatureUI(properties);
    return ui;
  },

  showAttr: function(properties){
      $("#sensor_title").val(properties.title);
      $("#sensor_mac").val(properties.mac);
      $("#update_time").val(properties.interval);
      $("#min_value").val(properties.min_value);
      $("#max_value").val(properties.max_value);  
  },

  updateAttr: function(divid){
      var title = $("#sensor_title").val();
      var mac = $("#sensor_mac").val();
      var interval = $("#update_time").val();
      var node_type = $("#node_type").val();
      var data_policy = $("#data_policy").val();
      var min_value = $("#min_value").val();
      var max_value = $("#max_value").val();

      var properties = {
          tid: divid,
          title:title,
          mac:mac,
          interval:interval,
          node_type:node_type,
          data_policy:data_policy,
          min_value:parseFloat(min_value),
          max_value:parseFloat(max_value),
          power:"off"
      };
      
      var ui = new TemperatureUI(properties);
      return ui;
  },

  messageArrive:function(divid,chan,val){//{A0=?,V0=20}、{A0=?}、{v0=20}
    if(uiTemplateObj[divid].power == "off") return;
    
    if(chan == "A0" && val =='?'){
      var range = {"min":uiTemplateObj[divid].min_value,"max":uiTemplateObj[divid].max_value};
      var data = makeSensorData(uiTemplateObj[divid].data_policy,range);
      pushSensorData(uiTemplateObj[divid].mac,data);

      //传感器显示实时数据
      $("#"+divid).find(".t_value").text(data);
    }
    if(chan == "D0" && val =='?'){

    }
    if(chan == "OD0" && val =='1'){

    }
    if(chan == "CD0" && val =='1'){

    }
    if(chan == "V0"){
      if(val =='?'){

      }
      else{
        val = parseInt(val);
      }
    }
  }
}

function TemperatureUI(prop)
{
	this.properties = prop;
	var html =  '<h3 class="title">'+prop.title+'</h3>'+
              '<div class="body">'+
                  '<div>MAC地址：<span class="mac">'+prop.mac+'</span></div>'+
                  '<img src="images/sensor/temperature.jpg" alt="">'+
                  '<div>'+
                      '<input type="button" class="power_switch" value="ON">'+
                      '<input type="button" value="UP">'+
                      '<input type="button" value="DOWN">'+
                  '</div>'+
                  '<div>'+
                      '当前温度：<span class="t_value">0</span>℃  上报间隔:<span class="t_interval">'+prop.interval+'</span>'+
                  '</div>'+
                  '<div class="node_type">'+prop.node_type+'</div>'+
              '</div>';
	$("#"+prop.tid).html(html);
}