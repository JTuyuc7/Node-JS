// Config of using the DB

// Iport the ORM encharged to sent the reequest to the DB
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'}); // Pass the config to have access to the DB

// Create a function to connect the Db
const connectDB = async () => {

    try {
        
        await mongoose.connect( process.env.MONGO_DB, { // takes two arguments the URL of the connection and the config
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        });

        console.log('DB Connected') // send to the console if the connection was succesfully

    } catch (error) {
        console.log(error) // send to the console if there was no connection to DB
        process.exit(1)  // stop the app
    }
}

module.exports = connectDB;