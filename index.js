var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
    console.log(`Server running on port ${PORT} ......`)
});
app.get('/', function (req, res) {
    res.json('hello !');
})
io.on('connection', function (socket) {
    console.log(`a user connected with id: ${socket.id}`);
    socket.on('disconnect', function () {
        console.log(`a user disconnected with id: ${socket.id}`);
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});
