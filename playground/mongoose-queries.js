var {ObjectID} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');


// console.log(ObjectID.isValid('5c5b731c4f2be2021783517b'));

// Todo.find().then(todos => {
//   console.log({todos});
// }, error => {
//   console.log('Something went wrong!', error);
// });

// Todo.findOne({
//   _id: '5c5b731c4f2be2021783517b'
// }).then(todo => {
//   if (todo) console.log(todo);
//   else console.log('Invalid id query');
// }, error => {
//   console.log(error);
// });


User.findById('6c59056ca9feee14988641fa').then(user => {
  if (!user) console.log('user not found');
  else console.log(JSON.stringify({user}, undefined, 2));
}, error => console.log(error));