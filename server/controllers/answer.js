const { Answer, Question, User } = require('../models');
const mongoose = require('mongoose');

function findAllByUserId({ decoded }, res, next) {
  Answer
    .find({ createdBy: decoded.id })
    .then(answers => {
      res.status(200).json(answers)
    })
    .catch(err => {
      next(err)
    })
}

function findOne({ params }, res, next) {
  Answer
    .findOne({ _id: params.id })
    .populate({
      path:'questionId',
      populate: {
        path: 'createdBy'
      }
    })
    .then(answer => {
      if(answer) {
        res.status(200).json(answer);
      } else {
        res.status(404).json({
          message: 'Answer not found.'
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

function addAnswer({ body, decoded }, res, next) {
  let newAnswer = null;
  Answer
    .create({
      createdBy: decoded.id,
      questionId: body.questionId,
      title: body.title,
      content: body.content
    })
    .then(answer => {
      console.log('contoh',answer)
      newAnswer = answer
      return Question.findById(answer.questionId)
    })
    .then(question => {
      question.answers.push(newAnswer._id)
      return Promise.all([question.save(), User.findOne({_id: newAnswer.createdBy})]) 
    })
    .then(([question, user]) => {
      newAnswer.createdBy = user
      console.log(newAnswer)
      res.status(201).json(newAnswer)
    })
    .catch(err => {
      if(err.errors) {
        res.status(409).json({
          message: err.errors
        });
      } else {
        next(err);
      }
    })
}

function updateAnswer({ params, body }, res, next) {
  console.log('masuk')
  const opts = {
    new: true,
    runValidators: true,
    context: 'query'
  };

  Answer
    .findOneAndUpdate({ _id: params.id }, { ...body }, opts)
    .then(answer => {
      if(answer) {
        res.status(200).json(answer);
      } else {
        res.status(404).json({
          message: 'Answer not found.'
        });
      }
    })
    .catch(err => {
      console.log(err)
      next(err);
    });
}

function deleteAnswer({ params }, res, next) {
  let delAnswer = null
  Answer
    .findOneAndDelete({ _id: params.id })
    .then(answer => {
      if(answer) {
        delAnswer = answer
        return Question.findOne({ _id: answer.questionId })
        
      } else {
        res.status(404).json({
          message: 'Answer not found.'
        });
      }
    })
    .then(question => {
      question.answers.splice(question.answers.indexOf(delAnswer._id), 1)
      res.status(200).json(delAnswer);
    })
    .catch(err => {
      next(err);
    });
}

function upvote({ params, decoded }, res, next) {
  Answer
    .findOne({ _id: params.id })
    .then(answer => {
      let isUpvoter = answer.upvoters.indexOf(decoded.id) === -1 ? false : true;
      let isDownvoter = answer.downvoters.indexOf(decoded.id) === -1 ? false : true;

      if(isUpvoter) {
        res.status(400).json({
          message: 'You already upvoted this answer.'
        })
      } else {
        if(isDownvoter) {
          answer.downvote--;
          answer.downvoters.splice(answer.downvoters.indexOf(decoded.id), 1);
        }
        answer.upvote++;
        answer.upvoters.push(new mongoose.mongo.ObjectId(decoded.id));
        return answer.save();
      }
    })
    .then(answer => {
      res.status(201).json(answer);
    })
    .catch(err => {
      next(err);
    });
}

function downvote({ params, decoded }, res, next) {
  Answer
    .findOne({ _id: params.id })
    .then(answer => {
      let isUpvoter = answer.upvoters.indexOf(decoded.id) === -1 ? false : true;
      let isDownvoter = answer.downvoters.indexOf(decoded.id) === -1 ? false : true;
      
      if(isDownvoter) {
        res.status(400).json({
          message: 'You already downvoted this answer.'
        })
      } else {
        if(isUpvoter) {
          answer.upvote--;
          answer.upvoters.splice(answer.upvoters.indexOf(decoded.id), 1);
        }
        answer.downvote++;
        answer.downvoters.push(new mongoose.mongo.ObjectId(decoded.id));
        return answer.save();
      }
    })
    .then(answer => {
      res.status(200).json(answer);
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  findAllByUserId,
  findOne, 
  addAnswer,
  updateAnswer,
  deleteAnswer,
  upvote,
  downvote
}