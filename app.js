console.log("starting the app");

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js')

var command = process.argv[2];
//console.log(process.argv);

// process.argv.forEach((val,index) => {
//     console.log(`${index}: ${val}`);
// });

function checkArgvs(command){
    if(command === 'add') {
        console.log('Add note');
    } else if (command === 'list') {
        console.log("list note");
    } else if (command === 'read') {
        console.log("reading notes")
    } else if(command === 'remove') {
        console.log("removing notes")
    } else {
        console.log("Commands not recognized");
    }
}

checkArgvs(command);