const request = require('request');
const yargs = require('yargs');

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

const encodedAddress = encodeURIComponent(argv.address);
console.log(encodedAddress);

var url = "http://restapi.amap.com/v3/geocode/regeo?key=4769b220d8198ce6b50c20195650bcd7&location=116.481488,39.990464&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0"
var url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
var url2 = "http://restapi.amap.com/v3/geocode/geo?key=4769b220d8198ce6b50c20195650bcd7&address=滨盛路联通大厦&city=杭州"
request({
    url: url,
    json:true
}, (error, response, body) => {
   // console.log('err: ',error);
   // console.log('statusCode: ', response && response.statusCode);
    console.log(`Address: ${body.regeocode.formatted_address} `);
    console.log(`Latitude: ${body.regeocode.addressComponent.streetNumber.location}`);
    console.log(`Longitude: ${body.regeocode.addressComponent.streetNumber.location}`);
});

