const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Volunteer = require('../models/volunteerModel');

// @desc registerVolunteer
// @route POST api/volunteer/register
// @access Public

const registerVolunteer = asyncHandler(async(req,res)=>{
    const {email,password, role, incharge} = req.body;
    
    if(!password || !email || !role){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const volunteerExists = await Volunteer.findOne({email})
    if(volunteerExists){
        res.status(400)
        throw new Error('Exisitng User')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newVolunteer = await Volunteer.create({
        email,
        password:hashedPassword,
        role,
        incharge:incharge?incharge:null,
    })

    if(newVolunteer){
        res.status(201).json({
            _id:newVolunteer.id,
            email:newVolunteer.email,
            role:newVolunteer.role,
            incharge:newVolunteer.incharge?newVolunteer.incharge:null,
            token:generateToken(newVolunteer._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Unsuccessful Registration')
    }
})

// @desc loginVolunteer
// @route POST api/volunteer/login
// @access Public

const loginVolunteer = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const presentVolunteer = await Volunteer.findOne({email})
    if(presentVolunteer && (await bcrypt.compare(password,presentVolunteer.password))){
        res.status(201).json({
            email:presentVolunteer.email,
            token:generateToken(presentVolunteer._id),
            role:presentVolunteer.role,
            incharge: presentVolunteer.incharge?presentVolunteer.incharge:null
        })
    }
    else{
        res.status(400)
        throw new Error('Unsuccessful Credentials')
    }
})

// @desc ViewMyProfile
// @route POST api/volunteer/profile
// @access Private{}

const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
    console.log(res)
})

const generateToken = (id)=>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}


module.exports = {
    registerVolunteer,
    loginVolunteer,
    getMe
}