var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.00.1:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text: String,
    completed: Boolean,
    completedAt:  Number
});

// var newTodo = new Todo({
//     text:'Cook dinner',
//     completed:false
// });

// newTodo.save().then((doc) => {
//     console.log("Saved todo",doc)
// }, (e) => {
//     console.log('Unable to save todo');
// });

var otherTodo = new Todo({
    text: 'feed the cat',
    completed:true,
    completedAt:123
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined,2));
}, (e) => {
    console.log('Unable to save', e);
});