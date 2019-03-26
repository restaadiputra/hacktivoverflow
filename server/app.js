require('dotenv').config();

const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const routes = require('./routes')

mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://localhost/hacktivoverflow`, 
{ 
  useNewUrlParser: true,
  useCreateIndex: true 
});

app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use(require('cors')())
app.use('/', routes)

app.listen(port, function() {
  console.log('app runs on port ' + port);
});

module.exports = app