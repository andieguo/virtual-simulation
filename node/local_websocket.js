var ws_list=[];
var onMessageArrive;
function localWebsocket(uid,ukey){
	var ws = require('websocket.io')
	  , http = require('http').createServer().listen(28080)
	  , server = ws.attach(http)

	var msg = '{"method":"message", "addr":"22:22:33:44:55:66:77:88", "data":"{A0=3.3,A1=3}"}';

	server.on('connection', function (socket) {
	  ws_list.push(socket);
	  socket.on('message', function (data) {//接收客户端数据
		 //console.log(data);
		 var dat = JSON.parse(data);
		 if(dat.method =="control"){
		 	onMessageArrive(dat.addr,dat.data);
		 }

	  });
	  socket.on('close', function () {
		  
	  });
	socket.send(msg); 
	});	
}