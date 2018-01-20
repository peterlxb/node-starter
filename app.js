const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

// const argv = yargs
//     .options({
//      a: {
//       demand:true,
//       alias:'address',
//       describe:'Address for fetch weather for',
//       string:true
//      }
//     })
//     .help()
//     .alias('help','h')
//     .argv;
    
// geocode.geocodeAddresss(argv.address,(errorMsg,results) => {
//     if(errorMsg){
//       console.log(errorMsg);
//    } else {
//       console.log(JSON.stringify(results,undefined,2));
//   }
// });

// key = 65f2c2cd8ed00bee82d171b37c9804c0
const weatherAPI = "https://api.darksky.net/forecast/65f2c2cd8ed00bee82d171b37c9804c0/37.4224764,-122.0842499";

request({
    url:weatherAPI,
    json:true
},(error,response,body) => {
    if(!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log("Unable to fetch the weather");
    }
   
});
