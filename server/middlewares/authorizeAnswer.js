const { Answer } = require('../models');

module.exports = {
  authorize({ params, decoded }, res, next) {
    Answer
      .findById(params.id)
      .then(answer => {
        if(String(answer.createdBy) === decoded.id) {
          next()
        } else {
          res.status(401).json({
            message: 'You are not authorize to access this data.'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  }
}