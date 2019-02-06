var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

// Register handlers
app.post('/todos', (req, res, next) => {
  // console.log(req.body);
  // Making todo
  var todo = new Todo({
    text: req.body.text
  });

  // Saving the todo
  todo.save().then(todo => {
    res.send(todo);
    // console.log('Todos', todos);
  }, error => {
    res.status(400).send(error);
  });

});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, error => {
    res.status(400).send(e);
  });
});


// Making the app listen to static port 3000
app.listen(3000, () => {
  console.log('Started on port 3000');
});

// Exports the app for testing purposes
module.exports = {app};