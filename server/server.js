const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./modles/todo');
const { User } = require('./modles/User');

const app = express();

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

app.listen(3001,() => {
    console.log('Started on port 3001')
});

module.exports = {app};