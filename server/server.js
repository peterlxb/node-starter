const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const {Todo} = require('./modles/todo');
const {User} = require('./modles/User');

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.send(e);
    });
});

app.listen(3001,() => {
    console.log('Started on port 3001')
});