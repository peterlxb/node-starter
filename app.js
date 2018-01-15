console.log("starting the app");

const fs = require('fs');
const os = require('os');

var user = os.userInfo();

//console.log(user.username);

fs.appendFile("message.txt",`hello ${user.username}`);