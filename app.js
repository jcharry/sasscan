// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);

var Gpio = require('onoff').Gpio;
var button = new Gpio(18, 'in', 'falling');



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

    button.watch(function(err, value) {
        if (err) console.log(err);

        io.sockets.emit('message', value);
        console.log(value);

    });

    socket.on('disconnect', function() {
        console.log("Client has disconnected");
    });
	}
);

httpServer.listen(8080);
