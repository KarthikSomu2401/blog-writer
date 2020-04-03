const envs = require('./configurations');
var app = require('express')();

console.log(`Your environment is ${envs.NODE_ENV}`);
console.log(`Your port is ${envs.PORT}`);
console.log(`Your url is ${envs.MONGO_URL}`);

var listener = app.listen(envs.PORT, function(){
    console.log('Listening on port ' + listener.address().port);
});