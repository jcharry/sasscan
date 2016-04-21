// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
httpServer.listen(8080);

var Gpio = require('onoff').Gpio;
var button = new Gpio(18, 'in', 'both');


// Any normal http request
function requestHandler(req, res) {
    //console.log(req);
	// Read index.html
	fs.readFile(__dirname + '/index.html', 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
            res.end(data);
  		}
  	);
}

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function (socket) {

    console.log("We have a new client: " + socket.id);

    var timer = setInterval(function() {
        var state = button.readSync();
        if (state === 0) {
            io.sockets.emit('message', state);
        }
    },200);
	
		// When this user "send" from clientside javascript, we get a "message"
		// client side: socket.send("the message");  or socket.emit('message', "the message");
		//socket.on('message', 
			//// Run this function when a message is sent
			//function (data) {
				//console.log("message: " + data);
				
				//// Call "broadcast" to send it to all clients (except sender), this is equal to
				//// socket.broadcast.emit('message', data);
				//socket.broadcast.send(data);
				
				//// To all clients, on io.sockets instead
				//// io.sockets.emit('message', "this goes to everyone");
			//}
		//);
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		//socket.on('otherevent', function(data) {
			//// Data comes in as whatever was sent, including objects
			//console.log("Received: 'otherevent' " + data);
		//});
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected");
		});
	}
);

