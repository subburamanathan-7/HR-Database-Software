const asyncHandler = require('express-async-handler')
const Contacts = require('../models/contactModel')
const Volunteers = require('../models/volunteerModel')

// @desc getHR
// @route GET/api/database
// @Private{Director,Volunteer}

const listContacts = asyncHandler(async(req,res)=>{
    let contacts
    if(req.user.role === 'Director'){
        contacts = await Contacts.find({incharge:req.user.id})
    }
    else if(req.user.role === 'Admin'){
        contacts = await Contacts.find({})
    }
    else{
        contacts = await Contacts.find({volunteer:req.user.id})
    }
    res.status(200).json({contacts})
    // console.log(contacts)
})

// @desc addHR
// @route POST/api/database
// @access Private {Director,Volunteer}

const addContact = asyncHandler(async(req,res)=>{
    const {name, company, contactNumber, email,internship}  = req.body
    
    const ContactExists = await Contacts.findOne({contactNumber})

    if(!req.user){
        res.status(401)
        throw new Error('Please Log In')
    }

    if(ContactExists){
        res.status(400)
        throw new Error('HR Already Exists')
    }
    //Create HR
    const newHR = await Contacts.create({
        volunteer:req.user.role ==='Volunteer'?req.user.id:null,
        incharge:req.user.role ==='Volunteer'?req.user.incharge:req.user.id,
        name,
        company,
        contactNumber,
        email,
        internship,
    })

    if(newHR){
        res.status(200).json(newHR)
    }
    else{
        res.status(400)
        throw new Error('Invalid HR Details')
    }
})

// @desc updateHR
// @route PUT/api/database/:id
// @access Private{Director,Volunteer}
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    
    if(!req.user){
        res.status(401)
        throw new Error('Please Log In')
    }
    if(req.user.role==='Director'){
        if(contact.incharge.toString() !== req.user.id){
            res.status(401)
            throw new Error('Director not Authorized')
        }
    }
    else if(req.user.role==='Volunteer'){
        if(contact.volunteer.toString() !== req.user.id){
            res.status(401)
            throw new Error('Volunteer not Authorized')
        }
    }
    if(!contact){
        res.status(400)
        throw new Error('Contact not listed')
    }
    const updatedContact = await Contacts.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(201).json({updatedContact})
})


// @desc deleteHR
// @route DEL/api/database/:id
// @access Private {Director,Volunteer}

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(req.user.role==='Director'){
        if(contact.incharge.toString() !== req.user.id){
            res.status(401)
            throw new Error('Director not Authorized')
        }
    }
    else if(req.user.role==='Volunteer'){
        if(contact.volunteer.toString() !== req.user.id){
            res.status(401)
            throw new Error('Volunteer not Authorized')
        }
    }
    if(!contact){
        res.status(400)
        throw new Error('Contact not listed')
    }
    const removedContact = await Contacts.findByIdAndRemove(req.params.id)
    res.status(200).json({removedContact})
})

module.exports = {
    listContacts,
    addContact,
    updateContact,
    deleteContact
}