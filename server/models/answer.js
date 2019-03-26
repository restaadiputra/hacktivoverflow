const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;