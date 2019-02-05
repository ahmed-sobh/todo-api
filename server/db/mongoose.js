// Loading mongoose
var mongoose = require('mongoose');

// Configure mongoose to use promises
mongoose.Promise = global.Promise;

// Making the connection
mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
});

module.exports = {mongoose};
