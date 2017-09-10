var server = require('../app');
var io = require('socket.io').listen(server);
var userList = [];

io.on('connection',function (socket) {

    // 接受用户名并广播
    socket.on('userIn',function(userName){
      socket.userName = userName;
      if(!userList.includes(userName)){
        userList.push(userName);
        socket.userList = userList;
        io.emit('tellUserIn',userName,userList);
      }  
    });

    socket.on('send',function(chatContent){
      io.emit('receive',chatContent,socket.userName);
    }); 

    socket.on('disconnect', function() {
      // if判断防止重复登录引起问题
      if(socket.userList != undefined){
        var i = socket.userList.indexOf(socket.userName);
        socket.userList.splice(i,1);
        io.emit('userOut',socket.userName,socket.userList);
      }
    });
});

server.listen(3000 ,() =>{
  console.log(`server:${server.address().address}${server.address().port}`);
});