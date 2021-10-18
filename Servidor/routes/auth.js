// IMPORT EXPRESS TO HAVE ACCES TO THE ROUTE
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');


// DEFINE THE ROUTE FOR AUTHENTICATION
// /api/auth
router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Incorrect Password').isLength({ min: 6 })
    ],
    authController.authUser
);

module.exports = router;