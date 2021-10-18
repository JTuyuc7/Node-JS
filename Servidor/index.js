const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
connectDB() // Connect to the DB


app.use(express.json({ extended: true})); // Enable to use Joson with express

// SHOW SOMENTHING ON THE BROWSER
app.use('/api/users', users );

// ROUTE TO HAVE ACCES TO THE ACCOUNT
app.use('/api/auth', auth );


// Crear un Puerto para que la app este corriendo
const PORT = process.env.PORT || 4000
app.listen( PORT, () => console.log('Server Running') );