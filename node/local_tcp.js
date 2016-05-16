function localTCP(){
	var net = require('net');

	var server = net.createServer();

	var msg = '{"method":"message", "addr":"22:22:33:44:55:66:77:88", "data":"{A0=3.3,A1=3}"}';

	server.on("connection",function(socket){
		console.log("new connection");
		
		socket.setEncoding("utf8");
		socket.on("data",function(data){
			console.log("From Client:"+data);
		});
		setInterval(function(){
			socket.write(msg);
		},2000);
		
	});

	server.listen(28081,function(){
		console.log("server is listening");
	});
}