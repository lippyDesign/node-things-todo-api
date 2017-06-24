const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({})

// Todo.remove({})
//   .then(result => console.log(result))

// Find one and remove- removes first it finds
Todo.findOneAndRemove({ _id: '' })
  .then(todo => console.log(todo));

Todo.findByIdAndRemove('594dd01895b28a28d982010f')
  .then(todo => console.log(todo));