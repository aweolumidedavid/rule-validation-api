/* eslint-disable linebreak-style */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const v1Route = require('./src/routes/index');


const app = express();
dotenv.config();
const port = process.env.PORT || 3331;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', v1Route);


const server = app.listen(port, () => {
    console.log(`listen to ${port}`);
});


module.exports = server;