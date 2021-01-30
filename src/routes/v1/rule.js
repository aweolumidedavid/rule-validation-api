/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const Init = require('../../controllers/init');


router.get('/', Init.info);


router.post('/validate-rule', Init.ruleValidation);

module.exports = router;