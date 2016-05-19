var ws_list=[];

function localWebsocket(uid,ukey){
	var ws = require('websocket.io');
	var http = require('http').createServer().listen(28080);
	var server = ws.attach(http);

	server.on('connection', function (socket) {
		socket.on('message', function (data) {//接收客户端数据
		 //console.log(data);
		 var dat = JSON.parse(data);
		 if(dat.method =="control"){
		 	onMessageArrive(dat.addr,dat.data);//消息回调
		 }
		 if(dat.method =="authenticate"){
		 	if(dat.uid == uid && dat.key == ukey){//ID、key验证
				ws_list.push(socket);
		 	}
		 	else{//验证错误，断开连接
		 		socket.end();
		 	}
		 }

		});
		socket.on('close', function () {
		  console.log("closed");
		});
		//var msg = '{"method":"message", "addr":"22:22:33:44:55:66:77:88", "data":"{A0=3.3,A1=3}"}';
		//socket.send(msg); 
	});	
}

function wsSendData(mac,data){
	var msg = {"method":"message", "addr":mac, "data":"{A0="+data+"}"};
	msg = JSON.stringify(msg);

	var len = ws_list.length;
	if(len>0){
		for(var i in ws_list){
			ws_list[i].send(msg);
		}
	}
}