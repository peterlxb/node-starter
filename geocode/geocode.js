const request = require('request');

var url = "http://restapi.amap.com/v3/geocode/regeo?key=4769b220d8198ce6b50c20195650bcd7&location=116.481488,39.990464&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0"
//var url1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
var url2 = "http://restapi.amap.com/v3/geocode/geo?key=4769b220d8198ce6b50c20195650bcd7&address=滨盛路联通大厦&city=杭州"

const geocodeAddresss = (address,callback) => {

    const encodedAddress = encodeURIComponent(address);

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        console.log(body.status === "1");
        if (error) {
            callback("Unable to connect to Google Server");
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find address");
        } else if (body.status === "1") {
            callback(undefined,{
                Address: body.regeocode.formatted_address,
                Latitude: body.regeocode.addressComponent.streetNumber.location,
                Longitude: body.regeocode.addressComponent.streetNumber.location
           })
      }

    });
}

module.exports = {
    geocodeAddresss,
}
