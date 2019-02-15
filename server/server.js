require('./config/config');
// Loading third party modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

// Loading custom modules
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Register handlers
app.post('/todos', (req, res, next) => {

  // console.log(req.body);
  // Making todo
  const todo = new Todo({
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

// NOTICE: use : to get inputs from the user via the uri
app.get('/todos/:id', (req, res, next) => {

  const id = req.params.id;
  const isValid = ObjectID.isValid(id);

  if (!isValid) return res.status(404).send();

  Todo.findById(id).then((todo) => {
    if (todo) res.send({todo});
    else res.status(404).send();
  }, error => {
    res.status(400).send();
  });

});

app.delete('/todos/:id', (req, res, next) => {

  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();


  Todo.findByIdAndDelete(id).then(todo => {
    if (todo) res.send({todo});
    else {
      res.status(404).send();
      console.log('NOTFOUND');
    }
  }, error => {
    res.status(400).send();
  });

});


app.patch('/todos/:id', (req, res, next) => {

  const id = req.params.id;
  // IMPORTAND: create an object from the picked object props IF EXIST!
  const body = _.pick(req.body, ['text', 'completed']);
  // console.log(body);
  if (!ObjectID.isValid(id)) return res.status(404).end();
  // console.log(completed, typeof completed);

  if (_.isBoolean(body.completed) && body.completed) {

    body.completedAt = new Date().getTime();

  } else {

    body.completed = false;
    body.completedAt = null;

  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {new: true}).then(todo => {
    if (!todo) return res.status(404).send();
    res.send({todo});
  }, err => {
    res.status(400).send();
  });

});

app.post('/users', (req, res, next) => {

  var body = _.pick(req.body, ['email', 'password']);

  // Model creates and retrives documents
  var user = new User(body);

  // console.log(body, user);

  // user gets validate before saving by method called (presave) and if a validation rule is violated save is aborted and the error is returned to the callback.
  user.save()
    .then(() => {
      // console.log(user);
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });

});

// Making the app listen to static port 3000
app.listen(port, () => console.log(`Started on port ${port}`));

// Exports the app for testing purposes
module.exports = {app};