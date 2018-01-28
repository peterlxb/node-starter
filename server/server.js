const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('./modles/todo');
const { User } = require('./modles/user');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/todos',(req,res) => {

    // perform the mongo db
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res) => {
   Todo.find().then((todos) => {
    res.send({todos});
   },(e) => {
       res.status(400).send(e);
   }) 
});

//GET/todos/:id
app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    
    // Valid id using isValid
        // 404 - send back empty send
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };
   
    Todo.findById(ObjectID(id)).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res) => {
    // get the id
    var id = req.params.id;

    // validate the id -> not valid return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    };

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    })
});

app.patch('/todos/:id',(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send(); 
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port,() => {
    console.log(`Started on port ${port}`)
});

module.exports = {app};