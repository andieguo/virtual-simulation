function remoteTCP(){ 
  var net = require('net');                    
  var client = new net.Socket();

  client.setEncoding("utf8");

  var serverAddr = "zhiyun360.com";
  var port = 28082;

  var ZCloudID = '1155223953';
  var ZCloudKey = 'Xrk6UicNrbo3KiX1tYDDaUq9HAMHBYhuE2Sb4NLKFKdNcLH5';

  var auth_info = '{\"method\":\"authenticate\",\"uid\":\"'+ZCloudID+'\",\"key\":\"'+ZCloudKey+'\",\"version\":\"0.1.0\",\"autodb\":true}';

  var msg = '{"method":"sensor", "addr":"22:22:33:44:55:66:77:88", "data":"{A0=3.3,A1=3}"}';

  client.connect(port,serverAddr,function(){
    console.log('Connected to Server.');
    client.write(auth_info);
    setInterval(function(){
      client.write(msg);
      console.log("send the data to app.");
    },2000);
  });

  client.on("close",function(){
    console.log("closed");
  });
  
  client.on("data",function(data){
    console.log("From Server:"+data);
  });
}