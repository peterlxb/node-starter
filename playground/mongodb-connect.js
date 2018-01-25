const { MongoClient, ObjectID } = require('mongodb');
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

    // db.collection('Users').insertOne({
    //     name: 'liuxiaobo',
    //     age: 27,
    //     location:'hangzhou'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     //console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    /*
    @@ get unique id 
    */
    //  db.collection('Users').find({ 
    //     _id: new ObjectID('5a69d08ddf819ae63a56e6c0') 
    //     }).toArray((err, docs) => {
    //     if (err) {
    //         console.log("No docs find in collection Users");
    //     }
    //     //console.log(typeof docs);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // });

    //  db.collection('Users').find({location:'wuhan'}).count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    //  });

    client.close();
});