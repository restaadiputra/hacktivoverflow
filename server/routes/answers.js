const answers = require('express').Router();
const { AnswerController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

// authentication needed
answers.use('/', authenticate);
answers.get('/', AnswerController.findAllByUserId);
answers.post('/',  AnswerController.addAnswer);
answers.post('/:id/upvote',  AnswerController.upvote);
answers.post('/:id/downvote',  AnswerController.downvote);

// authorization needed
answers.put('/:id',  authorize, AnswerController.updateAnswer);
answers.delete('/:id',  authorize,AnswerController.deleteAnswer);

module.exports = answers;