const request = require('request');

var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia"

request({
    url: url,
    json: true
}, (error, response, body) => {
    console.log('err: ',error);
    console.log('body: ',JSON.stringify(body));
});

