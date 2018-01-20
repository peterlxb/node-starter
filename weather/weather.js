const request = require('request');

// key = 65f2c2cd8ed00bee82d171b37c9804c0
const weatherAPI = "https://api.darksky.net/forecast/65f2c2cd8ed00bee82d171b37c9804c0/37.4224764,-122.0842499";

// const getWeather =  () => {
//     request({
//         url: weatherAPI,
//         json: true
//     }, (error, response, body) => {
//         if (!error && response.statusCode === 200) {
//             console.log(body.currently.temperature);
//         } else {
//             console.log("Unable to fetch the weather");
//         }

//     });
// }

const getWeather = (lat,lng,callback) => {
    request({
        url: `https://api.darksky.net/forecast/65f2c2cd8ed00bee82d171b37c9804c0/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined,{
                temperature:body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback("Unable to fetch the weather");
        }

    });
}

module.exports = {
    getWeather,
}

