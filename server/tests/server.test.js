const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('../models/todo');

const todos = [
  { text: 'First text todo', _id: new ObjectID() },
  { text: 'second text todo', _id: new ObjectID(), completed: true, completedAt: 333 }
];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST, todos', () => {

  it('should create a new todo', done => {
    const text = 'test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({text})
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      })
  });

  it('should not create todo with invalid body data', done => {
    const text = '';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {

  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', done => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('it should return 404 for invalid object ids', done => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', done => {
    const hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) return done(err);
        //atempt to find the deleted item by id
        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId} + 1`)
      .expect(404)
      .end(done)
  });

  it('should return 404 if object id is invalid', done => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should update the todo', done => {
    // grab id of first item
    const hexId = todos[0]._id.toHexString();
    const text = 'Hello New Text';
    // update text and set completed equal true
    request(app)
      .patch(`/todos/${hexId}`)
      .send({ completed: true, text })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
  })

  it('should clear completedAt when todo is not completed', done => {
    const hexId = todos[1]._id.toHexString();
    const obj = { text:'Goodby New Text', completed: false };
    request(app)
      .patch(`/todos/${hexId}`)
      .send(obj)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(obj.text);
        expect(res.body.todo.completed).toBe(obj.completed);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)
  })

})