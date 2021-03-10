const request = require('postman-request')

const geocode = (address, callback) =>{

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FoYWRldi13YXJyaW9yIiwiYSI6ImNrMWdpdDB1aDBienUzbXFwZTUyYno0OW0ifQ.ms35wi9GfQTv8vl0pg_fUg&limit=1'
    
    //json : true -> it'll provide 'body' in json format othrewise in string
    //'response' was a object which we destructured to get 'body';
    request({url, json : true}, (error, {body}) =>{
        if(error){
            callback('unable to connect location service');
        }else if (body.message || body.features.length === 0){
            callback('unable to find location');
        }else{
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            });
        }
    })
}

module.exports = geocode