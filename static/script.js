var socket = io.connect('http://localhost:8080/');

socket.on('connect', function() {
    console.log("Connected");
});

// Receive a message
var playing = false;
socket.on('message', function(data) {
    // Start the show!
    if (playing === false) {
        // Start the show 
        playing = true;
        console.log('show starting');

        setTimeout(function() {
            playing = false;
        }, 3000);
        //
        //
        //
        // When done, set playing = false again
    }
    else {
        console.log('currently playing');
        // We're playing, so ignore
        // any inputs for now
    }
});
