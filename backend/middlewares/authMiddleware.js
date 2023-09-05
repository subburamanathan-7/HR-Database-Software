const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Volunteer = require('../models/volunteerModel')

const authenticateVolunteer = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await Volunteer.findById(decoded.id).select('-password')
            next()
        }
        catch(e){

            console.log(e)
            res.status(401)
            throw new Error('Volunteer not authenticated')
        }
    }
    if(!token){
        res.status(402)
        throw new Error('Token Not Found')
    }
})
module.exports = {authenticateVolunteer};