const envs = require('./configurations');
var app = require('express')();

var listener = app.listen(envs.PORT, function(){
    console.log('Listening on port ' + listener.address().port);
});