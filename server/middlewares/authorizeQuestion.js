const { Question } = require('../models');

module.exports = {
  authorize({ params, decoded }, res, next) {
    Question
      .findById(params.id)
      .then(question => {
        if(String(question.createdBy) === decoded.id) {
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