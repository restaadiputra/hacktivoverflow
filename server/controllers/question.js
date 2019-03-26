const { Question } = require('../models');
const mongoose = require('mongoose');

function findAll(req, res, next) {
  Question
    .find()
    .populate('answers')
    .then(questions => {
      res.status(200).json(questions);
    })
    .catch(err => {
      next(err);
    });
}

function findOne({ params }, res, next) {
  Question
    .findById(params.id)
    .then(question => {
      if(question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({
          message: 'Question not found.'
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

function findAllByUserId({ decoded }, res, next) {
  Question
    .find({ userId: decoded.id })
    .then(questions => {
      res.status(200).json(questions);
    })
    .catch(err => {
      next(err)
    })
}

function addQuestion({ body, decoded }, res, next) {
  Question
    .create({
      title: body.title,
      content: body.content,
      createdBy: decoded.id
    })
    .then(question => {
      res.status(201).json(question)
    })
    .catch(err => {
      if(err.errors.title) {
        res.status(409).json({
          message: err.errors.title.message
        });
      } else if(err.errors.content) {
        res.status(409).json({
          message: err.errors.content.message
        });
      } else {
        next(err);
      }
    })
}

function updateQuestion({ params, body }, res, next) {
  const opts = {
    new: true,
    runValidators: true,
    context: 'query'
  };

  Question
    .findOneAndUpdate({ _id: params.id }, { ...body }, opts)
    .then(question => {
      if(question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({
          message: 'Question not found.'
        });
      }
    })
    .catch(err => {
      next(err);
    });
}

function deleteQuestion({ params }, res, next) {
  Question
    .findOneAndDelete({ _id: params.id })
    .then(question => {
      if(question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({
          message: 'Question not found.'
        });
      }
    })
    .catch(err => {
      next(err);
    });
}

function upvote({ params, decoded}, res, next) {
  Question
    .findOne({ _id: params.id})
    .then(question => {
      let isUpvoter = question.upvoters.indexOf(decoded.id) === -1 ? false : true;
      let isDownvoter = question.downvoters.indexOf(decoded.id) === -1 ? false : true;

      if(isUpvoter) {
        res.status(400).json({
          message: 'You already upvoted this question.'
        })
      } else {
        if(isDownvoter) {
          question.downvote--;
          question.downvoters.splice(question.downvoters.indexOf(decoded.id), 1);
        }
        question.upvote++;
        question.upvoters.push(new mongoose.mongo.ObjectId(decoded.id));
        return question.save();
      }
    })
    .then(question => {
      res.status(201).json(question);
    })
    .catch(err => {
      next(err);
    });
}

function downvote({ params, decoded }, res, next) {
  Question
    .findOne({ _id: params.id })
    .then(question => {
      let isUpvoter = question.upvoters.indexOf(decoded.id) === -1 ? false : true;
      let isDownvoter = question.downvoters.indexOf(decoded.id) === -1 ? false : true;
      
      if(isDownvoter) {
        res.status(400).json({
          message: 'You already downvoted this question.'
        })
      } else {
        if(isUpvoter) {
          question.upvote--;
          question.upvoters.splice(question.upvoters.indexOf(decoded.id), 1);
        }
        question.downvote++;
        question.downvoters.push(new mongoose.mongo.ObjectId(decoded.id));
        return question.save();
      }
    })
    .then(question => {
      res.status(200).json(question);
    })
    .catch(err => {
      next(err);
    });
}



module.exports = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  findAll,
  findOne,
  findAllByUserId,
  upvote,
  downvote,
};