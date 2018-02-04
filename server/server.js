const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001
var  app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function(socket) {
    console.log('a user connected');

    socket.emit('chat message', {
        from: 'peterlxb@gmail.com',
        text: 'Hey, what is',
        createAt: 123
    });

    socket.on('chat message', (msg) => {
        console.log("message: ", msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
server.listen(port, () =>  {
    console.log(`listening on *:${port}`);
});