
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
     a: {
      demand:true,
      alias:'address',
      describe:'Address for fetch weather for',
      string:true
     }
    })
    .help()
    .alias('help','h')
    .argv;
    
// geocode.geocodeAddresss(argv.address,(errorMsg,results) => {
//     if(errorMsg){
//       console.log(errorMsg);
//    } else {
//       console.log(JSON.Stringify(results,undefined,2));
//   }
// });

//chaing weather api in geocode
geocode.geocodeAddresss(argv.address, (errorMsg, results) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        console.log(results.Address);
        // console.log(results.Latitude);
        // console.log(results.Longitude);
        weather.getWeather( 37.4224764, -122.0842499, (errorMsg, weatherResults) => {
            if (errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(`It's  currently ${weatherResults.temperature} . It feels like ${weatherResults.apparentTemperature}`);
            };
        });
    };
});
