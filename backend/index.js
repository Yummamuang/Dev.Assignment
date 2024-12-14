// import express from 'express';
const express = require('express');
const app = express();

//import dotenv
require('dotenv').config();

// import cors
const cors = require('cors');

// connect to database
const connectDB = require('./config/db');
connectDB();

// import routes
const userRoutes = require('./routes/userRoutes');

// middleware
app.use(express.json());
app.use(cors());

// server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// routes
app.use('/api/users', userRoutes);