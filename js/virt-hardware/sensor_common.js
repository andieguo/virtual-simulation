var onMessageArrive;//消息到达回调函数

//自动生成MAC地址
function makeMacAddr(node_type){
	if(node_type == "ZigBee"){//zigbee
		var mac="";
		for(var i=0;i<8;i++){
		  mac=mac+makeRandom0F(2);
		  if(i<7){
			mac=mac+":"
		  }
		}
		return mac;
	}
	if(node_type == "IPv6"){//IPv6
		var mac="aaaa::";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(4);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
	if(node_type == "WiFi"){//WiFi
		var mac="aaaa:1::";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(4);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
	if(node_type == "Bluetooth"){//Bluetooth
		var mac="aaaa:2::";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(4);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
}

//生成n位0-F之间的随机数(返回字符串)
function makeRandom0F(n){
	var str=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	var num = "";
	for(var i=0;i<n;i++){
		var index = Math.floor(Math.random()*16); 
		num = num +str[index];
	}
	return num;
}

//传感器数据生成策略
function makeSensorData(policy,range){
	switch(policy){
		case "data_random":
			return makeRangeRandNum(range.min,range.max);
		default:
			return 0;
	}
}

//传感器生成任意区间随机数
function makeRangeRandNum(low,high){
	var r=high-low+1;
	return Math.floor(Math.random()*r+low);
}

//推送数据
function pushSensorData(mac,data){
	if(localServiceTag){
		wsSendData(mac,data);//websocket发送数据
		tcpSendData(mac,data);
	}
	if(remoteServiceTag){
		remoteSendData(mac,data);
	}
	
}