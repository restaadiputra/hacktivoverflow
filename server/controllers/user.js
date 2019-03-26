const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function register({ body }, res, next) {
  User
    .create({...body})
    .then(function(user) {
      res.status(201).json(user);
    })
    .catch(function(err) {
      if(err.errors.email) {
        res.status(409).json({
          message: err.errors.email.message
        })
      } else if(err.errors.fullname) {
        res.status(409).json({
          message: err.errors.fullname.message
        })
      } else if(err.errors.username) {
        res.status(409).json({
          message: err.errors.username.message
        })
      } else if(err.errors.password) {
        res.status(409).json({
          message: err.errors.password.message
        })
      } else {
        next(err)
      }
    });
}

function signin({ body }, res, next) {
  User
  .findOne({
    $or:[
      {'username': body.username },
      {'email': body.username },
    ] 
  })
  .then(function(user) {
    if(!user) {
      res.status(400).json({
        message: 'Username/Password is wrong.'
      })
    } else {
      if(!bcrypt.compareSync(body.password, user.password)) {
        res.status(400).json({
          message: 'Username/Password is wrong.'
        })
      } else {
        const {_id, fullname, role } = user
        const token = jwt.sign({ id: _id }, JWT_SECRET);
        res.status(200).json({ fullname, role, token })
      }
    }
  })
  .catch(function(err) {
    next(err)
  })
}

module.exports = {
  register,
  signin
}