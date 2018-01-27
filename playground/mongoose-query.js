const {ObjectID} = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/modles/todo');
const { User } = require('./../server/modles/user');

// var id = "5a6c1b514ae7248133aeca6b";

// if(!ObjectID.isValid(id)) {
//     console.log('ID not vaild');
// };

// // get an array
// Todo.find({
//     _id:id
// }).then((todo) => {
//     console.log("Todo: ",todo);
// });
// // return a single object
// var todos = Todo.findOne({_id:id},function(err, todo) {
//    if(err) {
//        console.log(err);
//    }
//    console.log(todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log("Todo bt Id ", todo);
// }).catch((e) => console.log(e));

var userID = "a6a802e7736ccf384620ff6";

User.findById(userID).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    console.log(JSON.stringify(user,undefined,2));
},(err) => {
    console.log(err);
});

// User.findOne({
//     _id:userID
// },function(err,user){
//     console.log(user);
// });