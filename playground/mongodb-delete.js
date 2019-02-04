// Loading modules
const { MongoClient, ObjectID } = require('mongodb');

// let id = new ObjectID();
// console.log(id);

// Make a connection
MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
  if (error) return console.log('Unable to connect to mongoDB server');
  console.log('Connected to mongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').deleteMany({
  //   text: 'Eat lunch'
  // }).then(result => {
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(result => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Ahmed'}).then(result => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5c5796a22b000157826ce381')
  }).then(result => {
    console.log(result);
  });


  client.close();
});
