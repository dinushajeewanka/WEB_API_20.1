const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: false
    },
    features:{
        type:String,
        required: false
    },
    owner_name:{
        type:String,
        required: true
    },
    owner_mobile:{
        type:Number,
        required: true
    },
    photo:{
        type:String,
        required: true
    },
    adminId:{
        type: String,
        required : true 
    }
})

const Cat = mongoose.model("Cat",catSchema);

module.exports = Cat;