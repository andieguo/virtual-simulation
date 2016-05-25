var tcp_list=[];

function localTCP(uid,ukey){
	var net = require('net');
	var server = net.createServer();

	server.on("connection",function(socket){
		socket.setEncoding("utf8");
		socket.on("data",function(data){
			var dat = JSON.parse(data);
			if(dat.method =="control"){
				onMessageArrive(dat.addr,dat.data);//消息回调
			}
			if(dat.method =="authenticate"){
				if(dat.uid == uid && dat.key == ukey){//ID、key验证
					tcp_list.push(socket);
				}
				else{//验证错误，断开连接
					socket.end();
				}
			}			
		});		
	});

	server.listen(28081,function(){
		console.log("server is listening");
	});
}

function tcpSendData(mac,data){
	var msg = {"method":"message", "addr":mac, "data":data};
	msg = JSON.stringify(msg);

	var len = tcp_list.length;
	if(len>0){
		for(var i in tcp_list){
			tcp_list[i].write(msg);
		}
	}
}