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



var url = "http://restapi.amap.com/v3/geocode/regeo?key=4769b220d8198ce6b50c20195650bcd7&location=116.481488,39.990464&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0"
var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
var url2 = "http://restapi.amap.com/v3/geocode/geo?key=4769b220d8198ce6b50c20195650bcd7&address=滨盛路联通大厦&city=杭州"
request({
    url: url1,
    json:true
}, (error, response, body) => {
   // console.log('err: ',error);
   // console.log('statusCode: ', response && response.statusCode);
    if(error) console.log(error);
    console.log('body: ',JSON.stringify(response));
});

