const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Answer = require('./answer')

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
  }],
  acceptedAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
  }
});

questionSchema.post('findOneAndDelete', function (doc, next) {
  if(doc.answers.length > 0) {
    console.log(Answer.deleteMany)
    Answer.deleteMany({
      _id: { $in: doc.answers}
    })
    .then((result) => {
      console.log('selesai hapus')
      next()
    })
    .catch((err) => {
      console.log(err);  
    });
  } else {
    next()
  }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
