var expect = require('expect');

// To test our express app
var request = require('supertest');

var {app} = require('../server');
var {Todo} = require('../models/todo');

beforeEach(done => {
  Todo.deleteMany().then((result => {
    // console.log(result);
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

        Todo.find().then((result) => {
          expect(result.length).toBe(1);
          expect(result[0].text).toBe(text);
          done();
        }, error => {
          done(error);
        });
        
      }
    });

  });

  it('should not create todo', done => {
    request(app)
    .post('/todos')
    .send({text: ''})
    .expect(400)
    .end((error, result) => {
      if (error) done(error);
      else {
        Todo.find().then(result => {
          expect(result.length).toBe(0);
          done();
        }, error => {
          // DONOT MAKE THIS MISTAKE AGAIN AND DONOT FORGET ERROR HANDLER
          done();
        });
      }
    });
  });

});