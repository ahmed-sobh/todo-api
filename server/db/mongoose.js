// Loading mongoose
var mongoose = require('mongoose');

// Configure mongoose to use promises
mongoose.Promise = global.Promise;

// Making the connection
// Require CC to push app up to heroku and get real database uri to get the job done
var uri = process.env.MONGODB_URI || `mongodb://localhost:27017/TodoApp`;
mongoose.connect(uri, {
  useNewUrlParser: true
});

module.exports = {mongoose};
