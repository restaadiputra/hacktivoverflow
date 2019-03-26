const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String, 
    required: [true, "Title can't be empty."]
  },
  content: {
    type: String,
    required: [true, "Content of question can't be empty."]
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
  answers: [{
    type:Schema.Types.ObjectId,
    ref: 'Answer'
  }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
