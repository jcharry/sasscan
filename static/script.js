var badImages = [];
//var badImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.gif', '6.jpg', '7.jpg', ];
var goodImages = [];
var overlayImages = [];
var audio = [];

var sayings = ['lessen your leavings', 'slash your trash', 'trim your trash', 'dwindle your rubbish','step down your scraps', 'think about your trash'];

window.addEventListener('load', function() {
    for (var i = 0; i < 19; i++) {
        badImages.push(document.getElementById(i));
    }

    for (var i = 0; i < 9; i++) {
        goodImages.push(document.getElementById('good'+i));
    }

    for (var i = 0; i < 7; i++) {
        audio.push(document.getElementById('audio' + i));
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
        playing = true;
        //var randInt = randomIntFromInterval(0, audio.length - 1);
        //audio[randInt].play();
        startShow();
        //setTimeout(startShow, 300);
    }

});

function startShow() {
    // Start the show 
    playing = true;


    imageCounter = 0;
    var timer = setInterval(function() {
        if (imageCounter > badImages.length) {imageCounter = 0;}
        // Hide all images
        hideAll(badImages);
        hideAll(overlayImages);
        //document.getElementById('buzz').play();
        
        var randInt = randomIntFromInterval(0, badImages.length -1);
        badImages[randInt].style.display = 'block';
        overlayImages[0].style.display = 'block';

        var randAudioInt = randomIntFromInterval(0, audio.length - 1);
        audio[randAudioInt].play();

        imageCounter++;
    }, 1000);

    // Stop showing bad images
    // Show good image, then final screen
    setTimeout(function() {
        clearInterval(timer);
        hideAll(badImages);
        hideAll(overlayImages);

        //Show good image
        randInt = randomIntFromInterval(0, goodImages.length -1);
        console.log(randInt);
        document.getElementById('ding').play();
        overlayImages[1].style.display = 'block';
        goodImages[randInt].style.display = 'block';
        setTimeout(function() {
            hideAll(overlayImages);
            hideAll(goodImages);
            document.getElementById('finalscreen').style.display = 'flex';
            var randSayingInt = randomIntFromInterval(0, sayings.length - 1);
            document.getElementById('finalmessage').innerHTML = sayings[randSayingInt];
            setTimeout(function() {
                
                // show final screen
                setTimeout(function() {
                    document.getElementById('finalscreen').style.display = 'none';
                    document.getElementById('startscreen').style.display = 'block';
                }, 2000);

                playing = false;
            }, 2000);
        }, 2000);
    }, 3900);

    // When done, set playing = false again

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
