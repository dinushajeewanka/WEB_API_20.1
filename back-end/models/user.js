const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: false
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;