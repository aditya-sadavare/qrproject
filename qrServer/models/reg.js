const mongoose = require("mongoose");

let regSchema=new mongoose.Schema({
    username:String,
    pass:String,
    name:String
})

let regModel=mongoose.model("regModel",regSchema)

module.exports=regModel
