const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

let qrSchema=new mongoose.Schema({
    
    _id: { type: String, default: uuidv4 },
    username:String,
    orgUrl:String
})

let qrModel=mongoose.model("qrModel",qrSchema)

module.exports=qrModel
