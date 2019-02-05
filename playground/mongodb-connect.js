// Loading modules
const { MongoClient, ObjectID } = require('mongodb');

// let id = new ObjectID();
// console.log(id);

// Make a connection
MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
  if (error) return console.log('Unable to connect to mongoDB server');
  console.log('Connected to mongoDB server');

  const db = client.db('TodoApp');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (error, result) => {
  //   if (error) return console.log('Unable to insert todo', error);
  //   console.log(result.ops);
  // });
  
  db.collection('Users').insertOne({
    // _id: 'asdf',
    name: 'Ahmed',
    age: 22,
    location: 'Egypt'
  }, (error, result) => {
    if (error) console.log('Unable to insert to mongoDB database.');
    else console.log(result.ops[0]._id.getTimestamp().toLocaleString());
  });

  client.close();
});