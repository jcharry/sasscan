// HTTP Portion
var fs = require('fs'); // Using the filesystem module

var express = require('express');
var app = express();
var server = require('http').Server(app);
//var httpServer = http.createServer(requestHandler);

var Gpio = require('onoff').Gpio;
var button = new Gpio(18, 'in', 'rising');

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(server);
server.listen(8080);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function (socket) {

    console.log("We have a new client: " + socket.id);

    button.watch(function(err, value) {
        if (err) console.log(err);

        io.sockets.emit('message', value);
        console.log(value);

    });

    socket.on('disconnect', function() {
        console.log("Client has disconnected");
    });
});
