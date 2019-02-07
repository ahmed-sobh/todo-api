var expect = require('expect');

// To test our express app
var request = require('supertest');

var {app} = require('../server');
var {Todo} = require('../models/todo');

// Run before each test case
beforeEach(done => {
  Todo.deleteMany().then((todos => {
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
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
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
          expect(todos.length).toBe(0);
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
      expect(res.body.todos.length).toBe(0);
    })
    .end(done);
  });

});