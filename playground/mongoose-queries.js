const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// const id = '594c8f0d8820dd53083066d211';

// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }

// Todo.find({ _id: id })
//   .then(todos => console.log('Todos: ', todos))
//   .catch(e => console.log('ERROR: ', e));

// Todo.findOne({ _id: id })
//   .then(todo => console.log('Todo: ', todo))
//   .catch(e => console.log('ERROR: ', e));

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) return console.log('Id not found')
//     console.log('Todo: ', todo)
//   })
//   .catch(e => console.log('ERROR: ', e));

const id = '594c10a559edaf49cffe2a2f';

if (!ObjectID.isValid(id)) console.log('Invalid User ID');

User.findById(id)
  .then(user => {
    if (!user) return console.log('User was not found');
    console.log(user);
  })
  .catch(error => console.log('ERROR', error));