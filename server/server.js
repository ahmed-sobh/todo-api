var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

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

app.get('/todos/:id', (req, res, next) => {
  var id = req.params.id;
  var isValid = ObjectID.isValid(id);

  if (!isValid) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (todo) res.send(todo);
    else res.status(404).send();
  }, error => {
    res.status(400).send();
  });

});

// Making the app listen to static port 3000
app.listen(port, () => console.log(`Started on port ${port}`));

// Exports the app for testing purposes
module.exports = {app};