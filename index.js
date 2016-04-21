var socket = io.connect('http://localhost:8080/');

socket.on('connect', function() {
    console.log("Connected");
});

// Receive a message
socket.on('message', function(data) {
    console.log('message received');
});


//var sendmessage = function() {
    //var message = document.getElementById('message').value;
    //console.log("Sending: " + message);
    
    //// Send a messaage
    //socket.send(message);
//};

//var sendother = function() {
    //var othermessage = document.getElementById('message').value;
    //console.log("sending: " + othermessage);
    
    //// Send any kind of data with a custom event
    ////socket.emit('otherevent',{ othermessage: othermessage });
    //socket.emit('otherevent', othermessage);
//};

