var server = require('../app');
var io = require('socket.io').listen(server);
var userList = [];

io.on('connection',function (socket) {

    // 接受用户名并广播
    socket.on('userIn',function(userName){
      socket.userName = userName;
      userList.push(userName);
      io.emit('tellUserIn',userName,userList);
    });

    socket.on('send',function(chatContent){
      io.emit('receive',chatContent,socket.userName);
    }); 

    socket.on('disconnect', function() {
      io.emit('userOut',socket.userName);
    });
});

server.listen(3000 ,() =>{
  console.log(`server:${server.address().address}${server.address().port}`);
});