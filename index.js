const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//imports routes
const authRoute =require('./routes/auth');
const postRoute= require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    () => console.log('connected to db!')
);

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())
//Middleware
// app.use(express.json());
// Route middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,()=>console.log('server is running'));