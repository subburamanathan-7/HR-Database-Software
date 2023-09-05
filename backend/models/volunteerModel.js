const mongoose = require('mongoose')

const volunteerSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,'Please add an email']
        },
        password:{
            type:String,
            required:[true,'Please add a password']
        },
        role:{
            type:String,
            enum:['Volunteer','Director','Admin'],
            required:[true, 'Please specify the role']
        },
        incharge:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Volunteer', //Model Name
            required:[
                ()=>{
                    return this.role === 'Volunteer'
                }
            ]
        }
    }
)

module.exports = mongoose.model('Volunteer',volunteerSchema)