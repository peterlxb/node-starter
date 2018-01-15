console.log("starting the app");

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js')

// var user = os.userInfo();

// //console.log(user.username);

// fs.appendFile("message.txt",`hello ${user.username}`);
var res = notes.add(3,4);
console.log(res);