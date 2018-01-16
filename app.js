console.log("starting the app");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

var args = yargs.argv;
var command = args._[0];
/*
   @@@
   Yargs:  { _: [ 'add' ],
            help: false,
            version: false,
            title: 'Secret',
            body: 'This is a secret',
            '$0': 'app.js' }

*/ 
console.log("Process ", process.argv);
console.log("Yargs: ",args);

// process.argv.forEach((val,index) => {
//     console.log(`${index}: ${val}`);
// });

function checkArgvs(command){
    if(command === 'add') {
       var note = notes.addNotes(args.title,args.body);
       if(note){
           notes.logNote(note);
       } else {
           console.log("new added failed");
       }
    } else if (command === 'list') {
        var allNotes = notes.getAll();
        console.log(`There are  ${allNotes.length} notes here: `,allNotes);
    } else if (command === 'read') {
        var note = notes.getNotes(args.title);
        if(note){
            notes.logNote(note);
        } else {
            console.log("can't find the note");
        }
    } else if(command === 'remove') {
        var result = notes.removeNotes(args.title);
        if(result){
            console.log("remove note success");
        } else {
            console.log("remove note failed");
        }
    } else if(command === 'update') {
        notes.updateNotes(args.title,args.body);
    }else {
        console.log("Commands not recognized");
    }
}

checkArgvs(command);