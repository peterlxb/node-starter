const request = require('supertest');
const expect = require('chai').expect;
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../modles/todo');

//set some test data
const todos = [{
    _id: new ObjectID(),
    text:'First test todo'
},{
    _id: new ObjectID(),
    text:'Second test todo'
}];

//Mocha's hooks before(), after(), beforeEach(), and afterEach()
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = "Test doto text";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).to.equal(text);
            })
            .end((err,res) => {
                if(err) {
                   return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).to.equal(1);
                    expect(todos[0].text).to.equal(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data',(done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).to.equal(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should get todos',(done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).to.equal(2);
            })
            .end(done)
    });
});

describe('GET /todos/:id',() => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).to.equal(todos[0].text)
            })
            .end(done)
    });

    it('should return 404 if todo not found',(done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-object ids',(done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done)
    });
});