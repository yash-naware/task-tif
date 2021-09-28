const mongoose = require("mongoose") 
const validator = require("validator")

const Student = mongoose.model('Student',{
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("invalid date")
            }
        }
    },
    schoolname:{
        type: String,
        required: true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
    
})
module.exports = Student