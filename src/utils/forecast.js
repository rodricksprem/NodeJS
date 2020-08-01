const request = require("request");
const { resolveSoa } = require("dns");
const { get } = require("request");

const forecast= (latitude,longitude,callback)=>{
    var temprature = -1; 
    var feelslike= -1;
    const url = 'http://api.weatherstack.com/current?access_key=7c5646da770edfc0e58d700af4a5dfbc&query='+latitude+', '+longitude


    request({url: url,json:true},(error,{body})=>{ // desturctured response object and used only body. as  body is a member of response

    if(error!=null){
        console.error(error)
        callback(" error ",undefined)
  
    }else if(body.error!=null){
        console.error(" error in request ")
        callback(" error in request ",undefined)
    }else{
        forecastData=body.current.weather_descriptions[0]
        temperature=body.current.temperature
        feelslike=body.current.feelslike
        callback(undefined,{temperature:temperature,feelslike:feelslike,forecastData:forecastData})

    }

});

}
 
module.exports={
    forecast:forecast
}