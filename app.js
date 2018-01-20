const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
    
geocode.geocodeAddresss(argv.address,(errorMsg,results) => {
    if(errorMsg){
      console.log(errorMsg);
   } else {
      console.log(JSON.stringify(results,undefined,2));
  }
});
