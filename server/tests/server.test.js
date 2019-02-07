var expect = require('expect');

// To test our express app
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('../server');
var {Todo} = require('../models/todo');


var todoss = [
  {
    text: 'Walk the dog',
    _id: new ObjectID()
  }
];

// Run before each test case
beforeEach(done => {
  Todo.deleteMany().then((todos => {
    Todo.insertMany(todoss);
    // console.log(todos);
    done();
  }));
});

describe('Post /todos', () => {

  it('should create new todo', done => {

    var text = 'Soemthing todo';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect(res => {
      expect(res.body.text).toBe(text);
    })
    .end((error, res) => {
      if (error) done(error);
      else {

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          expect(todos[1].text).toBe(text);
          done();
        }, error => done(error));
        
      }
    });

  });

  it('should not create todo', done => {
    request(app)
    .post('/todos')
    .send({text: ''})
    .expect(400)
    .end((error, todos) => {
      if (error) done(error);
      else {
        Todo.find().then(todos => {
          expect(todos.length).toBe(1);
          done();
        }, error => {
          // DONOT MAKE THIS MISTAKE AGAIN AND DONOT FORGET ERROR HANDLER
          done(error);
        });
      }
    });
  });

});


describe('GET /todos', () => {

  it('should return all todos', done => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(1);
    })
    .end(done);
  });

});


describe('GET /todos/:id', () => {

  it('should return todo document', done => {

    request(app)
    .get(`/todos/${todoss[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      // console.log(res.body._id, res.body._id.toHexString());
      expect(res.body.text).toBe(todoss[0].text);
    })
    .end(done);

  });

  it('should return 404 if todo not found', done => {

    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);

  });


  it('should return 404 cause the invalid id', done => {

    request(app)
    .get('/todos/1265432')
    .expect(404)
    .end(done);

  })

});
