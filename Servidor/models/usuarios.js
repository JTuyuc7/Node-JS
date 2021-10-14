// DEFINE THE MODEL OF THE USER FOR VALIDATION
const mongoose = require('mongoose')

// DEFINE THE SCHEMA
const UsersSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    apellido: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
})

//
module.exports = mongoose.model('User', UsersSchema)