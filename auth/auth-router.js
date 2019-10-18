const router = require('express').Router();
// const restricted = require('./authenticate-middleware.js'); //?
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../helpers/users-model.js')

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
  let { username, password } = req.body;

  Users.findBy({ username })
      .then(user => {
          if(user && bcrypt.compareSync(password, user.password)){
              const token = generateToken(user);
              res.status(200).json({
                  message: `Welcome ${user.username}!`,
                  token,
                });
          }
          else{
              res.status(401).json({ message: 'Invalid Credentials' })
          }
      })
      .catch(error => {
          res.status(500).json(error);
      })
});


function generateToken(user){
  const payload = {
      username: user.username,
      subject:user.id
  };
  const options ={
      expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
