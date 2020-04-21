const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let UserLogSchema = new Schema({
  fullName: { type: String, required: true},
  emailId: { type: String, required: true},
  timestamp: {type: Date, required: true},
  action: { type: String, required: true},

});

const UserLog = mongoose.model("UserLog", UserLogSchema, "userlog");

module.exports = UserLog;
