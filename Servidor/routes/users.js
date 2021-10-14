// CREATING THE ROUTE FOR USERS
const express = require('express');
const router = express.Router();
// Import the userController
const userController = require('../controllers/userController')

// Router to add users
// /api/users
router.post('/',
    userController.createUser
)

module.exports = router;