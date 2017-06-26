const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const UserTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'vova@vova.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, 'secretabc123').toString()
    }]
  },
  {
    _id: UserTwoId,
    email: 'vololipu@yahoo.com',
    password: 'userTwoPass',
  }
];

const todos = [
  { text: 'First text todo', _id: new ObjectID() },
  { text: 'second text todo', _id: new ObjectID(), completed: true, completedAt: 333 }
];

const populateTodos = done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

const populateUsers = done => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = { todos, users, populateTodos, populateUsers };