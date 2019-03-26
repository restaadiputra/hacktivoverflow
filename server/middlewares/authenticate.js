const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = process.env.JWT_SECRET

module.exports = {
  authenticate(req, res, next) {
    jwt.verify(req.headers.token, secret, (err, decoded) => {
      if (!err) {
        User.findById(decoded.id, (err, user) => {
          if (!err) {
            if (user) {
              req.decoded = decoded
              next()
            } else {
              res.status(400).json({
                warning: 'Invalid token!'
              })
            }
          } else {
            res.status(401).json({
              message: 'Need Login first.'
            })
          }
        })
      } else {
        res.status(401).json({
          message: 'Need Login first.'
        })
      }
    });
  }
}