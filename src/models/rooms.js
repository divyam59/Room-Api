//Room model
const mongoose = require('mongoose')
const validator = require('validator')

const room = mongoose.model('room',{
    //name of moderator or participant
    name:{
        type:String,
        required:true,
        trim:true
    },
    //status: moderatot/participant
    status:{
        type:String,
        required:true
    },
    title_of_meet:{
        type:String
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }

    },
    duration:{
        type:Number,
        required:true,
        min:1,
        max:40
    },
    participants:{
        type:Number,
        required:true,
        min:1,
        max:20
    },
    mode:{
        type:String,
        default:'adhoc'//can be adhoc, permanent, group
    },
    screen_share:{
        type:Boolean,
        default: true
    }
})
//Now i need to export this room to other files
module.exports = room