const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const envs = require('./configurations');
const db = require('./database');
const user = require('./routes/user.route');
var app = express();

//app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/users', user);

var listener = app.listen(envs.PORT, function(){
    console.log('Listening on port ' + listener.address().port);
});