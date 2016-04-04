console.log($);

var state = 'waiting'
function checkForState() {
    switch (state) {
        case 'waiting':
            console.log('waiting');
    }
    
}

function playSound() {
}

setInterval( function() {
    $.ajax({
        type: 'GET',
        url: '/data',
        success: function(res) {
                if (res == 0) {
                    console.log('button pressed');
                }
                document.getElementById('data').innerHTML = res;
        },
        error: function(err) {
        }
    }); 
}, 100);



