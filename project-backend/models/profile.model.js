const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    email:{
        type:String,
    },

    birthday:{
        type: String,
    },
    city:{
        type: String,
},
    occupation:{
        type: String,
        //required: true
    },
    interest:{
        type: String,
        //required: true
    },
    bio:{
        type: String
    },

});

module.exports = mongoose.model("Profile", ProfileSchema);