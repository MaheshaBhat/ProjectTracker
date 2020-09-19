const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true },
    () => {
        console.log('db connected');
    });

const authRouter = require('./route/auth');
const homeRouter = require('./route/home');

const app = express();

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/home", homeRouter);

app.listen(3000, () => {
    console.log('server is listening art port 300');
})

