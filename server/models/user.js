const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} in not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});





// Overriding existing method
userSchema.methods.toJSON = function () {
  var userObject = this.toObject();

  return _.pick(userObject, ['email', '_id']);
};


// Instances methods
userSchema.methods.generateAuthToken = function () {
  var access = 'auth';

  var data = {
    _id: this._id.toHexString(),
    access
  };
  var token = jwt.sign(data, 'asdf12').toString();

  this.tokens.push({ access, token });

  return this.save().then(() => {
    return token;
  });

};

const User = mongoose.model('User', userSchema);

module.exports = {User};