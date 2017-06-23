const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { app };