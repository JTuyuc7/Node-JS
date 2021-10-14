// CREATING THE ROUTE FOR USERS
const express = require('express');
const router = express.Router();
// Import the userController
const userController = require('../controllers/userController')
const { check } = require('express-validator');
// Router to add users
// /api/users
router.post('/',
    // BEFORE SENDING THE DATA WE HAVE TO VALIDATE THE FIELDS
    [
        check('nombre', 'Name is required').not().isEmpty(),
        check('password', 'Password needs to be at least 6 characters').isLength({ min: 6 }),
        check('email', 'Email is required').isEmail(),
        check('apellido', 'Last name is required').not().isEmpty()
    ],
    userController.createUser
)

module.exports = router;