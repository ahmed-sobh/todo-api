var expect = require('expect');

// To test our express app
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('../server');
var {Todo} = require('../models/todo');


var todoss = [
  {
    text: 'Walk the dog',
    _id: new ObjectID(),
    completed: false,
    completedAt: null
  },
  {
    text: 'Eat lunch',
    _id: new ObjectID(),
    completed: true,
    completedAt: 123
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

    var text = 'Something todo';
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
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
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
          expect(todos.length).toBe(2);
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
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);

  });

});


describe('GET /todos/:id', () => {

  it('should return todo document', done => {

    var id = todoss[0]._id.toHexString();

    request(app)
    .get(`/todos/${id}`)
    .expect(200)
    .expect((res) => {
      // console.log(res.body._id, res.body._id.toHexString());
      expect(res.body.todo.text).toBe(todoss[0].text);
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


describe('DELETE /todos/:d', () => {

  it('should remove a todo', done => {

    var id = todoss[0]._id.toHexString();

    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(id);
    })
    .end((error, res) => {

      if (error) done(error);
      else {
        Todo.findById(id).then(todo => {
          // console.log(todo);
          // Asserts the given object is falsy.
          expect(todo).toBeFalsy();
          done();
        }).catch(error => {
          done(error);
        });
      }

    });

  });

});



describe('PATCH /todos/:id', () => {

  it('should update the todo', done => {

    var hexId = todoss[0]._id.toHexString();

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text: 'Go to gym',
      completed: true
    })
    .expect(200)
    .expect(res => {

      var todo = res.body.todo;
      expect(todo.text).not.toBe(todoss[0].text);
      expect(todo.completed).toBe(true);
      // expect(typeof todo.completedAt).toBeA('number');


      if (typeof todo.completedAt !== 'number') {
        throw new Error('completedAt not a number');
      }

    })
    .end(done);

  });

  it('should clear completetAt when todo is not completed', done => {

    var hexId = todoss[1]._id.toHexString();
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: false
    })
    .expect(200)
    .expect(res => {
      expect(res.body.todo.text).toBe(todoss[1].text);
      expect(res.body.todo.completedAt).toBe(null);
    })
    .end(done);

  });

});
