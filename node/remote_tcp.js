var tcp_client;

function remoteTCP(uid,ukey,serverAddr){ 
  var net = require('net');                    
  var client = new net.Socket();
  client.setEncoding("utf8");

  tcp_client = client;

  var port = 28082;

  var auth_info = '{\"method\":\"authenticate\",\"uid\":\"'+uid+'\",\"key\":\"'+ukey+'\",\"version\":\"0.1.0\",\"autodb\":true}';

  client.connect(port,serverAddr,function(){
    console.log('Connected to Server.');
    client.write(auth_info);
  });

  client.on("close",function(){
    console.log("closed");
  });
  
  client.on("data",function(data){
    //dat = JSON.parse(data);
    var method = data.substring(data.indexOf("method")+9);
    method = method.substring(0,method.indexOf("\""));

    if(method =="control"){
      var addr = data.substring(data.indexOf("addr")+7);
      addr = addr.substring(0,addr.indexOf("\""));

      var dat = data.substring(data.indexOf("data")+7);
      dat = dat.substring(0,dat.indexOf("\""));
      onMessageArrive(addr,dat);//消息回调
     }
  });
}

function remoteSendData(mac,data){
  var msg = {"method":"sensor", "addr":mac, "data":data};
  msg = JSON.stringify(msg);
  tcp_client.write(msg);
}