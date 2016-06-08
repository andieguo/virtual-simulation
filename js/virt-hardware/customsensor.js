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
                            '当前值：<span class="t_value">0</span>'+
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
                        '<input type="checkbox" name="var_d0" value="128" />7' +
                        '<input type="checkbox" name="var_d0" value="64" />6' +
                        '<input type="checkbox" name="var_d0" value="32" />5' +
                        '<input type="checkbox" name="var_d0" value="16" />4' +
                        '<input type="checkbox" name="var_d0" value="8" />3' +
                        '<input type="checkbox" name="var_d0" value="4" />2' +
                        '<input type="checkbox" name="var_d0" value="2" />1' +
                        '<input type="checkbox" name="var_d0" value="1" />0' +                                             
                      '</div>' +
                      '<div class="input-prepend mr10p" style="font-size:8px">' +
                        '<span class="add-on">D1位设置</span>' +
                        '<input type="checkbox" name="var_d1" value="128" />7' +
                        '<input type="checkbox" name="var_d1" value="64" />6' +
                        '<input type="checkbox" name="var_d1" value="32" />5' +
                        '<input type="checkbox" name="var_d1" value="16" />4' +
                        '<input type="checkbox" name="var_d1" value="8" />3' +
                        '<input type="checkbox" name="var_d1" value="4" />2' +
                        '<input type="checkbox" name="var_d1" value="2" />1' +
                        '<input type="checkbox" name="var_d1" value="1" />0' +                                             
                      '</div><br>' + 
                      '<div id="var_vlist"></div>' + 
                      '<div id="var_alist"></div>' + 
                ' </div>',

  create: function(){//默认情况下无参数，可接收控件属性参数对象create(properties)
    var properties = sensorAttrModal;
    properties.tid = "customsensor";
    properties.mac = makeMacAddr("ZigBee");


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
    
    var ui = new customSensorUI(properties);
    return ui;
  },

  showAttr: function(properties){
      $("#sensor_title").val(properties.title);
      $("#sensor_mac").val(properties.mac);
      $("#node_type").find("option[value='"+properties.node_type+"']").attr("selected",true);
      //变量A显示
      for(var i in properties.alist){
        $("[value = "+properties.alist[i].var_name+"]:checkbox").attr("checked", true);
        var chanHtml = getVarAHtml(properties.alist[i].var_name);
        $("#var_alist").append(chanHtml);

        var t_obj = $("[chan = "+properties.alist[i].var_name+"]");
        t_obj.find(".data_policy").find("option[value='"+properties.alist[i].data_policy.method+"']").attr("selected",true);
        t_obj.find(".min_value").val(properties.alist[i].data_policy.min_val);
        t_obj.find(".max_value").val(properties.alist[i].data_policy.max_val);
      }
      //变量V显示
      for(var i in properties.vlist){
        $("[value = "+properties.vlist[i].var_name+"]:checkbox").attr("checked", true);
        var chanHtml = getVarVHtml(properties.vlist[i].var_name);
        $("#var_vlist").append(chanHtml);

        $("[chan = "+properties.vlist[i].var_name+"]").find("input").val(properties.vlist[i].val);
      }
      //变量D0、D1显示
      var list = [128,64,32,16,8,4,2,1];
      for(var i in properties.dlist){
        var r =0;
        var num =  properties.dlist[i].data_bit;
        for(var j in list){
          r = num / list[j];
          num = num % list[j];
          if(r>=1){
            if(properties.dlist[i].var_name == "D0"){
              $("[name = var_d0]:checkbox").each(function(){
                if(parseInt($(this).val()) == list[j] ) $(this).attr("checked", true);
              });
            }
            if(properties.dlist[i].var_name == "D1"){
                $("[name = var_d1]:checkbox").each(function(){
                if(parseInt($(this).val()) == list[j] ) $(this).attr("checked", true);
              });
            }
          }
        }
      }
  },

  updateAttr: function(divid){
      var properties = sensorAttrModal;
      properties.tid = divid;
      properties.title = $("#sensor_title").val();
      properties.mac = $("#sensor_mac").val();
      properties.node_type = $("#node_type").val();
      properties.alist = [];
      properties.vlist = [];
      properties.dlist = [];

      //遍历A0-7变量信息
      $(".var_a").each(function(){
        var t = {
            "var_name": $(this).attr("chan"),
            "recent_val": "0",
            "data_policy": {
                "min_val": parseFloat( $(this).find(".min_value").val()),
                "max_val": parseFloat( $(this).find(".max_value").val()),
                "method": $(this).find(".data_policy").val()
            }
        };
        properties.alist.push(t);
      });

      //遍历V0-3变量信息
      $(".var_v").each(function(){
        var t = {
            "var_name": $(this).attr("chan"),
            "val": parseInt($(this).find("input").val())
        };
        properties.vlist.push(t);
      });

      //遍历D0信息
      var t_d0=0;
      $("[name = var_d0]:checkbox").each(function(){
       if($(this).is(":checked")){
        t_d0 = t_d0 | parseInt($(this).val());
       }
      });
      if(t_d0){
        var t =  {
            "var_name": "D0",
            "data_bit": t_d0,
            "recent_val": t_d0
        };
        properties.dlist.push(t);
      }

      //遍历D1信息
      var t_d1=0;
      $("[name = var_d1]:checkbox").each(function(){
       if($(this).is(":checked")){
        t_d1 = t_d1 | parseInt($(this).val());
       }
      });   
      if(t_d1){
        var t =  {
            "var_name": "D1",
            "data_bit": t_d1,
            "recent_val": t_d1
        };
        properties.dlist.push(t);
      }
      //console.log(properties);        
      var ui = new customSensorUI(properties);
      return ui;
  },

  updateData:function(divid){
    //获取通道上报开关值
    var D0 = getD0Value(divid);
    //上传各通道数据
    var data ="";
    for(var i in uiTemplateObj[divid].alist){
      var str = uiTemplateObj[divid].alist[i].var_name;
      var bit = parseInt(str.substring(1));
      if(Math.pow(2,bit) & D0){//开启上报开关才能上报数据
        var t = makeSensorData(uiTemplateObj[divid].alist[i].data_policy);
        uiTemplateObj[divid].alist[i].recent_val = t;
        data = data+uiTemplateObj[divid].alist[i].var_name+"="+t+",";
      }
    }
    if(data !=""){
      data = data.substring(0,data.lastIndexOf(','));
      data = '{'+data+'}';
      pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
    }    
    //传感器显示实时数据
    $("#"+divid).find(".t_value").text(data);
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

  updateD1:function(divid,val,cmd){//更新D1的值
    var D1 = getD1Value(divid);
    if(cmd == "open"){//OD0命令
      if((D1 & val) < val){//开启新通道的上传开关
        var t = D1|val;
        setD1Value(divid,t);
        $("#"+divid).find(".d1_value").text("D1="+t);
      }
    }
    if(cmd == "close"){//CD0命令
      if((D1 & val) > 0){//
        var t = D1-(D1&val);
        setD1Value(divid,t);
        $("#"+divid).find(".d1_value").text("D1="+t);
      }
    }    
  },
  updateV0:function(divid,val){//更新上报间隔
    setV0Value(divid,val);
    $("#"+divid).find(".v0_value").text("V0="+val);
    
    if(getD0Value(divid)){
      var V0 = getV0Value(divid);
      clearInterval(sensorIntervalObj[divid]);//清除原定时器
      sensorIntervalObj[divid] =setInterval(function(){//开启定时器
        customsensor.updateData(divid);
      },V0*1000);
    }
    //传感器控件显示
    //$("#"+divid).find(".t_interval").val(val);
  },

  messageArrive:function(divid,chan,val){//{A0=?,V0=20}、{A0=?}、{v0=20}
    if(uiTemplateObj[divid].power == "off") return;
    
    var reg = /^.*A[0-7].*$/;
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
      customsensor.updateD0(divid,val,"open");
    }
    if(chan == "CD0"){
      customsensor.updateD0(divid,val,"close");
    }
    if(chan == "D1" && val =='?'){
      var D1 = getD1Value(divid);
      if(D1 != undefined){
        var data = "{D1="+D1+"}";
        pushSensorData(uiTemplateObj[divid].mac,data);//推送数据给订阅者
      }

    }
    if(chan == "OD1"){
      customsensor.updateD1(divid,val,"open");
    }
    if(chan == "CD1"){
      customsensor.updateD1(divid,val,"close");
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
          customsensor.updateV0(divid,parseInt(val));
        }

      }
    }
  }
}

function customSensorUI(prop)
{
	this.properties = prop;
	var html =  '<h3 class="title">'+ prop.title +
                '<div class="right">MAC地址：<span class="mac">'+prop.mac+'</span></div>'+
              '</h3>'+
              '<div class="body">'+
                '<img class="img" src="images/sensor/customsensor.jpg" alt="">'+
                '<div class="button">'+
                  '<input class="power_switch btn-power" type="image" value="ON" src="images/power-off.png">'+
                '</div>'+
                '<div class="value">'+
                  '当前值：<span class="t_value"></span>&nbsp;&nbsp;<span class="d0_value"></span>&nbsp;&nbsp;'+
                  '<span class="d1_value"></span>&nbsp;&nbsp;<span class="v0_value"></span>&nbsp;&nbsp;<span class="node_type">'+prop.node_type+'</span>'+
                '</div>'+
              '</div>';

	$("#"+prop.tid).html(html);
  //
  var str="";

  //显示A0相关的值
  for(var i in prop.alist){
    str = str+prop.alist[i].var_name+"=0,"
  }
  if(str !=""){
    str = str.substring(0,str.lastIndexOf(','));
    str = '{'+str+'}';
    $("#"+prop.tid).find(".t_value").text(str);
  }

  //显示V0相关的值
  for(var i in prop.vlist){
    if(prop.vlist[i].var_name == "V0"){
      str = "V0="+prop.vlist[i].val;
      $("#"+prop.tid).find(".v0_value").text(str);
    }
  }
  //显示D0、D1相关的值
  for(var i in prop.dlist){
    if(prop.dlist[i].var_name == "D0"){
      str = "D0="+prop.dlist[i].data_bit;
      $("#"+prop.tid).find(".d0_value").text(str);
    }
    if(prop.dlist[i].var_name == "D1"){
      str = "D1="+prop.dlist[i].data_bit;
      $("#"+prop.tid).find(".d1_value").text(str);
    }
  }  
}

