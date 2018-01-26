var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.00.1:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required: true,
        minglength:1,
        trim:true
    },
    completed: {
        type:Boolean,
        default:false
    },
    completedAt: {
        type:Number,
        default:null
    }
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

// var otherTodo = new Todo({
//     text: '  feed the cat '
// });

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined,2));
// }, (e) => {
//     console.log('Unable to save', e);
// });

var User = mongoose.model('User',{
    email: {
        type:String,
        required:true,
        trim: true,
        minglength:1
    }
});

var user = new User({
    email:'peter@gmail.com '
});

user.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save', e);
});