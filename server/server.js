require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// POST Todo
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));
});

// Get Todo
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(error => res.status(400).send(error));
});

// Get a particular Todo item
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findById(id)
    .then(todo => {
      // if id not found
      if (!todo) return res.status(404).send();
      res.send({ todo });
    })
    .catch(() => res.status(400).send());
})

// DELETE todos/:id
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) return res.status(404).send();
      res.send({ todo });
    })
    .catch(() => res.status(400).send());
});

// Update todo records
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  // undersor's pick method takes an object to pick properties off of
  // and an array of properties we need to pick off
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) return resizeBy.send(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) return res.status(404).send();
      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

// Create a new User
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken()
    })
    .then(token => {
      res.header('x-auth', token).send(user)
    })
    .catch(e => res.status(400).send(e))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app };