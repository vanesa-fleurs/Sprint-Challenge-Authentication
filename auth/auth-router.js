const router = require('express').Router();
const restricted = require('./authenticate-middleware.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
