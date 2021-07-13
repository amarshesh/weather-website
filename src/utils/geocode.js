
const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic29tdTAwNyIsImEiOiJja3FvcWZtaDYwMmZrMnZwM2xsbnZuNGFlIn0.oMMAQVjQBnq6etjBZnqeqg'

        request({ url : url , json :true } , ( error, response)  => {

                if( error){
                    callback ('unable to print cause of network error! ', undefined)
                } else if ( response.body.features.length===0 ){
                    callback (' unable to read the address!!', undefined)
                } else 
                {
                    callback( undefined, 
                        {
                            longitude :  response.body.features[0].center[0],
                             latitude  :  response.body.features[0].center[1],
                             place :  response.body.features[0].place_name
       
                        })
                }

        })
}
module.exports= geocode