// Loading modules
const { MongoClient, ObjectID } = require('mongodb');

// let id = new ObjectID();
// console.log(id);

// Make a connection
MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
  if (error) return console.log('Unable to connect to mongoDB server');
  console.log('Connected to mongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').find({
    // completed: false,
    // _id: new ObjectID('5c56a2aa26a65d181825c22f'),
  //   completed: true
  // }).toArray().then(collection => {
  //   console.log('Todos', collection);
  // }, error => {
  //   console.log('Unable to fetch collection', error);
  // });


  db.collection('Users').find({
    name: 'Ahmed'
  }).count((error, result) => {
    if (error) console.log('Unable to query Users count', error);
    else console.log(`Users count: ${result}`);
  });

  // client.close();
});