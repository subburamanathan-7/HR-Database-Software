const express = require('express');
const router = express.Router();

const {listContacts, addContact, updateContact, deleteContact} = require('../controllers/contactController')
const {authenticateVolunteer} = require('../middlewares/authMiddleware')

router.route('/').get(authenticateVolunteer,listContacts).post(authenticateVolunteer,addContact)
router.route('/:id').put(authenticateVolunteer,updateContact).delete(authenticateVolunteer,deleteContact)


module.exports = router;