// import express from 'express';
const express = require('express');
const app = express();

require('dotenv').config(); //import dotenv
const cors = require('cors'); // import cors

// connect to database
const connectDB = require('./config/db');
connectDB();

// import routes
const userRoutes = require('./routes/userRoutes');

// middleware
app.use(express.json());
app.use(cors());

// * routes *
app.use('/api/users', userRoutes); // user routes

// test api
app.use('/', (req, res) => { 
    res.send('Hello World');
});

// server
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});