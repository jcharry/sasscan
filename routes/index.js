var express = require('express');
var router = express.Router();
var Gpio = require('onoff').Gpio;

var button = new Gpio(18, 'in', 'both');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res, next) {
    var state = button.readSync()
    res.json(state);
});

module.exports = router;
