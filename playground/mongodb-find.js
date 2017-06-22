const { MongoClient, ObjectID } = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new  ObjectID('594b706995b28a28d981e99b')
  // }).toArray()
  //   .then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2));
  //   })
  //   .catch(err => console.log('unable to fetch todos', err));

  // db.collection('Todos').find({}).count()
  //   .then((count) => {
  //   console.log(`Todos count: ${count}`);
  //   })
  //   .catch(err => console.log('unable to fetch todos', err));

  db.collection('Users').find({ name: 'Lena' }).toArray()
    .then(users => console.log(JSON.stringify(users, null, 2)))
    .catch(error => console.log('Unable to get users', error));

  //db.close();
});