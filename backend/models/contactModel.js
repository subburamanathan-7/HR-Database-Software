const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    {
        volunteer:{
            type:mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'Volunteer', //Model Name
        },
        incharge:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Volunteer', //Model Name
        },
        name:{
            type:String,
            required:[true,'Please add an email']
        },
        company:{
            type:String,
            required:[true,'Please add a company']
        },
        contactNumber:{
            type:Number,
            required:[true,'Please add a contact']
        },
        email:{
            type:String,
            required:[true,'Please add a email']
        },
        address:{
            type:String,
        },
        status:{
            type:String,
        },
        interviewMode:{
            type:String
        },
        HRCount:{
            type:Number,
        },
        transport:{
            type:String
        },
        internship:{
            type:Boolean
        },
        department:[{
            INT:Boolean,
            CSE:Boolean,
            AI_DS:Boolean,
            ECE:Boolean,
            EEE:Boolean,
            BIO:Boolean,
            CHEM:Boolean,
            CIV:Boolean,
            AUT:Boolean,
            MEC:Boolean,
            MAR:Boolean,
        }],
        comments:{
            type:String,
        },
    }
)

module.exports = mongoose.model('contact',contactSchema)