const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleTags = require("./tag.model")
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
    /* interest:{
        type: String,
        //required: true
    }, */
    bio:{
        type: String
    },
    /* image:{
        type:String,
    }, */
    tags: [],

});

module.exports = mongoose.model("Profile", ProfileSchema);