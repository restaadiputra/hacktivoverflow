require('dotenv').config()

const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const routes = require('./routes')
const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()
const { User, Question } = require('./models')
const sendEmail = require('./helpers/sendEmail')

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGOODB, 
{ 
  useNewUrlParser: true,
  useCreateIndex: true 
});

let cronWeekend = '0 0 * * 0' // every sunday

cron.schedule(cronWeekend, () => {
  User
    .find({})
    .then(users => {
      users.forEach(user => {
        Question
          .find({_id: user._id})
          .then(questions => {
            queue.create('send-question-count', {
              email: user.email,
              questionsCount: questions.length
            })
            .save()  
          })
      })
    })
    .catch(err => {
      console.log(err)
    })
});

queue.process('send-question-count', (job, done) => {
  sendEmail({
    email: job.data.email, 
    count: job.data.questionsCount})
  done()
})

app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use(require('cors')())
app.use('/', routes)

app.listen(port, function() {
  console.log('app runs on port ' + port);
});

module.exports = app