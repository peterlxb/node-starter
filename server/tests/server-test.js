const request = require('supertest');
const expect = require('chai').expect;
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../modles/todo');
const { User } = require('./../modles/user');
const {todos, populateTodos,users,populateUsers} = require('./seed/seed');

//Mocha's hooks before(), after(), beforeEach(), and afterEach()
beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('DELETE /todos/:id',() => {
    it('should remove the todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).to.equal(hexId);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                
                Todo.findById(hexId).then((todo) => {
                    expect(todo).to.not.exist;
                    done();
                }).catch((e) => done(e))
            });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if object id not found', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done)
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = "Update first todo";
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).to.equal(text);
                expect(res.body.todo.completed).to.equal(true);
                expect(res.body.todo.completedAt).to.be.a("Number");
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed',(done) => {
        var hexId = todos[1]._id.toHexString();
        var text = "Update second todo";

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).to.equal(text);
                expect(res.body.todo.completed).to.equal(false);
                expect(res.body.todo.completedAt).to.not.exist;
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).to.equal(users[0]._id.toHexString());
                expect(res.body.email).to.equal(users[0].email);
            })
            .end(done);
    });

    it('should return 404 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = "example@example.com";
        var password = "123abc";

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).to.exist;
                expect(res.body._id).to.exist;
                expect(res.body.email).to.equal(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).to.exist;
                    expect(user.password).to.not.equal(password);
                    done();
                });
            });
    });

    it('should return validation errors if request invalid', (done) => {
        request(app)
            .post('/users')
            .send({email:"1sdee",password:"123abc"})
            .expect(400)
            .end(done)
    });

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password:'Password123'
            })
            .expect(400)
            .end(done)
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).to.exist;
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[0]).to.include({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/app')
            .send({
                email: users[1].email,
                password: users[1].password + '1'
            })
            .expect(404)
            .expect((res) => {
                expect(res.headers['x-auth']).to.not.exist;
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).to.equal(0);
                    done();
                }).catch((e) => done(e));
            });
    });
    
})