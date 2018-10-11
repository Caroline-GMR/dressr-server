'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const data = {
    name: 'dressr API',
    version: 'v1.0'
  };
  res.json(data);
});

module.exports = router;
