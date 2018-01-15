// var obj = {
//     name: 'peter'
// }

// var stringOfObj = JSON.stringify(obj);

// console.log(typeof stringOfObj);
// console.log(stringOfObj);

// var personString = '{"name":"peter"}';

// var personObj = JSON.parse(personString);

// console.log(typeof personObj);
// console.log(personObj);

const fs = require('fs');

var originalNotes = {
    title: 'some title',
    body: 'some body'
};

//use JSON.stringify convert the object to string
var originalNoteString = JSON.stringify(originalNotes);
fs.writeFileSync("notes.json",originalNoteString);

//use parse to convert json to object
var noteString = fs.readFileSync("notes.json");
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);