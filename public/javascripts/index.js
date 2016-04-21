window.addEventListener('load', function() {
    
    // On first window load, start checking for button presses
    startCheckingForButton();
    
    console.log($);

    var state = 'waiting'
    function checkForState() {
        switch (state) {
            case 'waiting':
                console.log('waiting');
        }
        
    }

    function playSound() {
        var sounds = ['scream', 'scream1', 'seriously1', 'seriously2', 'shotgun'];
        var randInt = Math.floor(Math.random() * sounds.length);
        // Pick random sound
        //document.getElementById(sounds[randInt]).play();
        document.getElementById('scream1').play();
        setTimeout(function(){
            document.getElementById('disappointed').style.display = 'block';
            setTimeout(function() {
                document.getElementById('disappointed').style.display = 'none';
            }, 3000);
        }, 2000);
    }

    var checkForButton;
    function startCheckingForButton() {
        console.log('checking for button presses');
        checkForButton = setInterval(function() {
            $.get('/data', function(res) {
                if (res == 0) {
                    console.log('button pressed')
                    stopCheckingForButton();
                    playSound();
                }

                document.getElementById('data').innerHTML = res;
            });
            //$.ajax({
                //type: 'GET',
                //url: '/data',
                //success: function(res) {
                        //if (res == 0) {
                            //console.log('button pressed');
                            //stopCheckingForButton();
                            //playSound();
                            
                        //}
                        //document.getElementById('data').innerHTML = res;
                //},
                //error: function(err) {
                    ////console.log(err);
                //}
            //}); 
        }, 100);
    }

    function stopCheckingForButton(check) {
        console.log('stopping check for button presses');
        if (checkForButton) {
            clearInterval(checkForButton);
            setTimeout(startCheckingForButton, 5000); 
        }
    }


});
