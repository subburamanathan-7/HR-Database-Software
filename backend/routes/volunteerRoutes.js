const express = require('express');
const router = express.Router();

const {authenticateVolunteer} = require('../middlewares/authMiddleware')

const {registerVolunteer, loginVolunteer, getMe} = require('../controllers/volunteerController');

router.route('/register').post(registerVolunteer)
router.route('/login').post(loginVolunteer)
// router.route('/logout').post(()=>{})

router.route('/profile').get(authenticateVolunteer,getMe)
module.exports = router;