var badImages = [];
//var badImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.gif', '6.jpg', '7.jpg', ];
var goodImages = [];
var overlayImages = [];
window.addEventListener('load', function() {
    for (var i = 0; i < 12; i++) {
        badImages.push(document.getElementById(i));
    }

    for (var i = 0; i < 9; i++) {
        goodImages.push(document.getElementById('good'+i));
    }

    overlayImages.push(document.getElementById('buzzimg'));
    overlayImages.push(document.getElementById('dingimg'));

    console.log(goodImages);
    
});
var socket = io.connect('http://localhost:8080/');

socket.on('connect', function() {
    console.log("Connected");
});

// Receive a message
var playing = false;
socket.on('message', function(data) {

    if (playing === false) {
        document.getElementById('scream').play();
        setTimeout(startShow, 300);
    }

});

function startShow() {
    // Start the show!
    if (playing === false) {
        // Start the show 
        playing = true;


        imageCounter = 0;
        var timer = setInterval(function() {
            if (imageCounter > badImages.length) {imageCounter = 0;}
            // Hide all images
            hideAll(badImages);
            hideAll(overlayImages);
            document.getElementById('buzz').play();
            badImages[imageCounter].style.display = 'block';
            overlayImages[0].style.display = 'block';
            imageCounter++;
        }, 1000);

        // Stop showing bad images
        // Show good image, then final screen
        setTimeout(function() {
            clearInterval(timer);
            hideAll(badImages);
            hideAll(overlayImages);

            //Show good image
            randInt = randomIntFromInterval(0,8);
            console.log(randInt);
            document.getElementById('ding').play();
            overlayImages[1].style.display = 'block';
            goodImages[randInt].style.display = 'block';
            setTimeout(function() {
                hideAll(overlayImages);
                hideAll(goodImages);
                document.getElementById('finalscreen').style.display = 'flex';
                setTimeout(function() {
                    // show final screen

                    setTimeout(function() {
                        document.getElementById('finalscreen').style.display = 'none';
                        document.getElementById('startscreen').style.display = 'block';
                    }, 2000);

                    playing = false;
                }, 2000);

            }, 2000);
        }, 5900);

        // When done, set playing = false again
    }
    else {
        console.log('currently playing');
        // We're playing, so ignore
        // any inputs for now
    }

}

function hideAll(images) {
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
