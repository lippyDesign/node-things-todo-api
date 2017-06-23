const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

//POST Todo
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));
});

//Get Todo
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(error => res.status(400).send(error));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { app };