const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../modles/todo');
const { User } = require('./../../modles/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email:'peter@gmail.com',
    password:"userOnePass",
    tokens: [{
        access:'auth',
        token: jwt.sign({_id: userOneId, accsee:'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'peterliu@gmail.com',
    password: "userTwoPass",
}];


//set some test data
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {users,todos, populateUsers,populateTodos};