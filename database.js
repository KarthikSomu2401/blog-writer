let mongoose = require('mongoose');
const envs = require('./configurations');
mongoose.connect(`${envs.MONGO_URL}`);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback){
        console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});
module.exports = db;
