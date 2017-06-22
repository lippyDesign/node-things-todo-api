const { MongoClient, ObjectID } = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat Lunch' })
  //   .then(result => console.log(result));

  // deleteOne- deletes the first matching item it finds
  // db.collection('Todos').deleteOne({ text: 'Eat Lunch' })
  //   .then(result => console.log(result));

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false })
  //   .then(result => console.log(result));

  // db.collection('Users').deleteMany({ name: 'Lena' })
  //   .then(result => console.log(result));

  db.collection('Users').findOneAndDelete({ _id: new ObjectID('594b6c0a2c289f430b01c22b') })
    .then(result => console.log(JSON.stringify(result, null, 2)));

  // db.close();
});