var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
    console.log('server running on port 3000 ......')
});
// WARNING: app.listen(80) will NOT work here!

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function (socket) {
        console.log('a user disconnected');
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
    //socket.emit('chat message', "Chat now ...");
});
