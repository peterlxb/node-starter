console.log("starting the app");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

var args = yargs.argv;
var command = process.argv[2];

console.log("Process ", process.argv);
console.log("Yargs: ",args);

// process.argv.forEach((val,index) => {
//     console.log(`${index}: ${val}`);
// });

function checkArgvs(command){
    if(command === 'add') {
       notes.addNotes(args["title"],args["body"]);
    } else if (command === 'list') {
        notes.getAll();
    } else if (command === 'read') {
        notes.readNotes(args["title"]);
    } else if(command === 'remove') {
        notes.removeNotes(args["title"]);
    } else if(command === 'update') {
        notes.updateNotes(args["title"],args["body"]);
    }else {
        console.log("Commands not recognized");
    }
}

checkArgvs(command);