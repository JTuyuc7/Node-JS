const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult  } = require('express-validator');
const User = require('../models/Usuarios');

exports.authUser = async ( req, res ) => {

    //VALIDATE IF THERE IS ANY ERRORS
    const errors = validationResult( req )
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }

    // EXTRACT THE EMAIL AND THE PASSWORD FROM THE REQUEST
    const { email, password } = req.body;

    try {

        //SEARCH IF THERE IS AN USER WITH THE EMAIL PROVIED
        let user = await User.findOne({ email })

        if( !user ){
            return res.status(400).json({ msg: 'User not found'})
        }

        // COMPARE THE PASSWORD IF IT EXIST
        const passcode = await bcrypt.compare( password, user.password );

        if( !passcode ){
            return res.status(400).json({ msg: 'Incorrect Password'})
        }

        // GENERATE THE JSONWEBTOKEN TO HAVE THE USER AUTHORIZED
        const payload = {
            user: {
                id: user.id,
                name: user.nombre,
                email: user.email,
                lastName: user.apellido
            }
        }

        jwt.sign( payload, process.env.SECRET, {
            expiresIn: 3600000
        }, ( error, token ) => {
            if( error) throw error;

            res.json({ token: token })
        })

    } catch (error) {
        console.log(error)
        res.status(404).json({msg: 'Unable to authorize the user'})
    }
}