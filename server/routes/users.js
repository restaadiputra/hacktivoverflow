const user = require('express').Router();
const { UserController } = require('../controllers');

user.post('/register', UserController.register);
user.post('/signin', UserController.signin);

module.exports = user;