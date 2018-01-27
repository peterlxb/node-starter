const request = require('supertest');
const expect = require('chai').expect;


const { app } = require('./../server');
const { Todo } = require('./../modles/todo');


//Mocha's hooks before(), after(), beforeEach(), and afterEach()

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

// describe('POST /todos', () => {
//     it('Should create a new todo', (done) => {
//         var text = "Test doto text";

//         request(app)
//             .post('/todos')
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).to.equal(text);
//             })
//             .end((err,res) => {
//                 if(err) {
//                    return done(err);
//                 }

//                 Todo.find().then((todos) => {
//                     expect(todos.length).to.equal(1);
//                     expect(todos[0].text).to.equal(text);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });

//     it('should not create todo with invalid body data',(done) => {
//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end((err,res) => {
//                 if (err) {
//                     return done(err);
//                 }

//                 Todo.find().then((todos) => {
//                     expect(todos.length).to.equal(0);
//                     done();
//                 }).catch((err) => done(err));
//             });
//     });
// });

describe('GET /todos', () => {
    it('should get todos',(done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            .end((err,res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).not.to.equal(0);
                    done();
                }).catch(err => done(err));
            }) 
    })
})