const router = require('express').Router();
const users = require('./users');
const questions = require('./questions');
const answers = require('./answers');

router.use('/users', users);
router.use('/questions', questions);
router.use('/answers', answers)

module.exports = router;
