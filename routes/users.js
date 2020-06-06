const auth = require('../middleware/auth'); // auhorisation
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Route get the current user and  proctecting password to be hidden.
//@Get Current User
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(400).send('There are no users in the database!');
  res.send(user);
});

// Route for creating new users.
// @Post Create new vehicle if the user is authenticated.
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send('A User with the same email is already resgistared.');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // mehode to hash the password.
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  // jwt ....payload to return a token when a user signs in a token is genarated
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
