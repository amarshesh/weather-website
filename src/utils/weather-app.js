const request = require ('request')
const weather = ( latitude , longitude , callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=8cf47b13d99202f31bf8a2e057737945&query='+latitude+','+longitude
       request({url : url, json: true }  ,(error , response) => {

        if ( error ){
            callback( 'Check your network connection !', undefined)

        }  else if (response.body.error ){
            callback (' unable to find the location ' , undefined)
        }else {
           callback  ( undefined ,'The temperature out there is  '+ response.body.current.temperature +' it could be a '+ response.body.current.weather_descriptions[0]+'day')

        }  
    })  
    }

    module.exports=weather
    