// IMPORT THE MODEL TO NSERT A USER INTO THE DB
const User = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res ) => {

    // Validate that there is no erros
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {
        // EXTRACT THE EMAIL TO VERIFY THERE IS NOT DUPLICATED USER
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        // RETURN IF THER IS ALREADY A USER
        if( user ){
            res.status(400).json({ msg: 'User already exist'});
            return;
        }

        // CREATE THE USER
        user = new User(req.body)

        // HASH THE USER PARSSWORD
        const salt = await bcrypt.genSalt(10);

        // SAVE THE NEW HASH PASSWORD
        user.password = await bcrypt.hash( password, salt )

        // SAVE THE USER
        const savedUser = await user.save();

        res.send({ msg: 'User saved', savedUser })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Unable to create user'})
    }
}