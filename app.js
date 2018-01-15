console.log("starting the app");

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js')


console.log(_.isArray(true));
console.log(_.isArray([]));
// var user = os.userInfo();

// //console.log(user.username);

// fs.appendFile("message.txt",`hello ${user.username}`);
// var res = notes.add(3,4);
// console.log(res);