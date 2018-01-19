const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
let m  = 0
// myEmitter.on('event', () => {
//     console.log(++m);
// });
// myEmitter.emit('event');
// myEmitter.emit('event');

//Using the eventEmitter.once() method, it is possible to register a listener that is called at most once for a particular event
myEmitter.once('event', () => {
    console.log(++m);
});

myEmitter.emit('event');
myEmitter.emit('event');

//Error events

myEmitter.on('error', (err) => {
    console.error('whoops! there was an error');
})

myEmitter.emit('error',new Error('woops'));