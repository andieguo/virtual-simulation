function localWebsocket(){
	var ws = require('websocket.io')
	  , http = require('http').createServer().listen(28080)
	  , server = ws.attach(http)

	var msg = '{"method":"message", "addr":"22:22:33:44:55:66:77:88", "data":"{A0=3.3,A1=3}"}';

	server.on('connection', function (socket) {
	  socket.on('message', function (data) {//接收数据
		 console.log(data); 
	  });
	  socket.on('close', function () {
		  
	  });
	  setInterval(function(){//上报数据
		socket.send(msg);  
	  },5000);  
	});	
}