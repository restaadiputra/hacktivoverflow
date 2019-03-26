const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./question')

const answerSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Answer cannot be created without the Question ID.']
  },
  title: {
    type: String, 
    required: [true, "Title answer can't be empty."]
  },
  content: {
    type: String, 
    required: [true, "Answer content can't be empty."]
  },
  upvote: {
    type: Number,
    default: 0
  },
  upvoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: {
    type: Number,
    default: 0
  },
  downvoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

answerSchema.post('findOneAndDelete', function (doc, next) {
  Question.findOne({
    answers: doc._id
  })
  .then((question) => {
    question.answers.splice(question.answers.indexOf(doc._id), 1);
    next()
  })
  .catch((err) => {
    console.log(err);  
  });
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;