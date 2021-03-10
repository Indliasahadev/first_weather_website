const request = require('postman-request');

const forecast = (longitude, latitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=0e4908d4424169d4e7e4a7237f109a2a&query=${latitude},${longitude}&units=m`

    //json : true -> it'll provide 'body' in json format othrewise in string
    //'response' was a object which we destructured to get 'body';
    request({ url, json : true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service !!');
        }else if (body.error){
            callback('Unable to find location');
        }else{
            callback(undefined, {
                forecast : `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degree out. And ${body.current.precip} % chance of rain.`,
                temperature : body.current.temperature,
                precip : body.current.precip,
                description : body.current.weather_descriptions
            });
        }
    })
}

module.exports = forecast