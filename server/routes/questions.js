const questions = require('express').Router();
const { QuestionController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

// special authenticate user only
questions.get('/user', authenticate,QuestionController.findAllByUserId);

// for public
questions.get('/', QuestionController.findAll);
questions.get('/:id', QuestionController.findOne);

// authentication needed
questions.use('/', authenticate)
questions.post('/',  QuestionController.addQuestion);
questions.post('/:id/upvote',  QuestionController.upvote);
questions.post('/:id/downvote',  QuestionController.downvote);

// authorization needed
questions.put('/:id',  authorize, QuestionController.updateQuestion);
questions.delete('/:id',  authorize,QuestionController.deleteQuestion);

module.exports = questions;