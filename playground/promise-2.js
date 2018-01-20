const request = require('request');

var url = "http://restapi.amap.com/v3/geocode/regeo?key=4769b220d8198ce6b50c20195650bcd7&location=116.481488,39.990464&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0"

var geocodeAddress = (address) => {
    return new Promise((resolve,reject) => {
        const encodedAddress = encodeURIComponent(address);

        request({
            url: url,
            json: true
        }, (error, response, body) => {
         
            if (error) {
                reject("Unable to connect to Google Server");
            } else if (body.status === "0") {
                reject("Unable to find address");
            } else if (body.status === "1") {
                resolve({
                    Address: body.regeocode.formatted_address,
                    Latitude: body.regeocode.addressComponent.streetNumber.location,
                    Longitude: body.regeocode.addressComponent.streetNumber.location
                })
            }

        });
    })
};

geocodeAddress('123').then((location) => {
    console.log(JSON.stringify(location,undefined,2));
},(errorMessage) => {
    console.log("Falied: ",errorMessage);
});
