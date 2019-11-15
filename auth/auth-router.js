const router = require('express').Router();
const Users = require('../models/users-model.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
      .then(saveU => {
          console.log('SAVEU /register: ', saveU)
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
