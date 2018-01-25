const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.00.1:27017';

// Database Name
const dbName = 'TodoApp';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
    //assert.equal(null, err);
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    } 
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // db.collection('Todos').insertOne({
    //     text:'something to do',
    //     compoleted:false
    // }, (err,result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    //})

    db.collection('Users').insertOne({
        name: 'peterliu',
        age: 26,
        location:'hangzhou'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    client.close();
});