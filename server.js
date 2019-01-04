var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./models/users');
var Message = require('./models/message');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

var dbUri = 'mongodb://admin:admin123@ds231205.mlab.com:31205/app-chat'

const options = {
    useNewUrlParser: true,
}

mongoose.connect(dbUri, options).then(
    () => {
        console.log('Database is connected')
    },
    (err) => {
        console.log(`Can not connect to the database: ${err}`)
    })

mongoose.Promise = global.Promise

var db = mongoose.connection

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function () {
//     console.log('Connected database !')
// });

app.get('/', function (req, res) {
    res.json('Hello world !');
})

app.post('/user', function (req, res) {
    const user = new User(req.body);
    user.save(function (err) {
        if (err) return handleError(err);
    })


})

io.on('connection', function (socket) {
    console.log(`a user connected with id: ${socket.id}`);
    socket.on('disconnect', function () {
        console.log(`a user disconnected with id: ${socket.id}`);
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
        const message = new Message({
            "message": msg
        });
        message.save()
            .try(function (result) {
                console.log(result)
            })
            .catch(function (err) {
                console.log(err);
            })
    });
})

server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT} ......`)
})