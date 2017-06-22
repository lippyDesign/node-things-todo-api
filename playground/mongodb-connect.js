const { MongoClient, ObjectID } = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({

  // }, (err, result) => {
  //   if (err) return console.log('Unable to insert Todo', err);
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Lena',
  //   age: 31,
  //   location: 'San Jose'
  // }, (err, result) => {
  //   if (err) return console.log('Unable to insert user: ', err);

  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // })

  db.close();
});