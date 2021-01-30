/* eslint-disable linebreak-style */
const express = require('express');
const v1Route = express.Router();
const Rule = require('./v1/rule');

v1Route.use('/', Rule);
module.exports = v1Route;