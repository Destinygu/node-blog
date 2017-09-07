var server = require('../app');

//socket部分
var io = require('socket.io').listen(server);
io.on('connection',function (socket) {
    // 向客户端发送信息
    socket.emit('hello','欢迎你');
    socket.on('thanks',function(data){
      console.log(data);
    })
    socket.broadcast.emit('a','有新人进来了');
});

server.listen(3000);