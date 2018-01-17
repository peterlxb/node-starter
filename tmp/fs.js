const fs = require('fs');

fs.rename('./tmp/hello','./tmp/world',function(err){
    if(err) throw err;
    console.log("rename complete");

    fs.stat('./tmp/world',function(err,stats){
        if(err) throw err;
        console.log(`stats: ${JSON.stringify(stats)}`);
    });

});

fs.appendFile('./tmp/world','data to apppend',function(err){
    if(err) throw err;
    console.log('The "data to append" was appended to file!');
})