var socket = io.connect('http://localhost:8080/');

socket.on('connect', function() {
    console.log("Connected");
});

// Receive a message
socket.on('message', function(data) {
    console.log('message received');
});
