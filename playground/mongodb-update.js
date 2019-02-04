// Loading modules
const { MongoClient, ObjectID } = require('mongodb');


// Make a connection
MongoClient.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
}, (error, client) => {
  if (error) return console.log('Unable to connect to mongoDB server');
  console.log('Connected to mongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c5792f12b000157826ce2e9')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then(result => {
  //   console.log(result);
  // });

  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('5c5796c82b000157826ce385')
  // }, {
  //   $set: {
  //     name: 'ahmed'
  //   },
  //   $inc: {
  //     age: 2
  //   }
  // }).then(result => {
  //   console.log(result);
  // });

  client.close();

});