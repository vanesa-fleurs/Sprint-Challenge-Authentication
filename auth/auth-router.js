const router = require('express').Router();
const restricted = require('./authenticate-middleware.js'); //?
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../helpers/users-model.js')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
      .then(saveU => {
          console.log('Save /register: ', saveU)
          res.status(201).json(saveU)
      })
      .catch(error => {
        console.log(error)
          res.status(500).json({ message: 'cannot add the user' });
      });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
