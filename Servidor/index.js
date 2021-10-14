const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/users');

const app = express();
connectDB() // Connect to the DB


app.use(express.json({ extended: true})); // Enable to use Joson with express

// SHOW SOMENTHING ON THE BROWSER
app.use('/api/users', users )


// Crear un Puerto para que la app este corriendo
const PORT = process.env.PORT || 4000
app.listen( PORT, () => console.log('Server Running') );