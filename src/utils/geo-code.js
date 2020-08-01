const request = require("request");
const { resolveSoa } = require("dns");
const { get } = require("request");

const geocode=(address,callback)=>{
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm9kcmlja3MiLCJhIjoiY2tkYmRqdWoxMTVoejJ6cGNzbTRlczNuZCJ9.Lj3Od_BodJUa8GyMFmTvCw'
    request({url:geourl,json:true},(error,{body})=>{
        if(error!=null){
            
            console.error(error);
            callback(" error ",undefined)
        }else if(body===null || body.features.length===0){
            console.error(" error in request ")
            callback(" error in request ",undefined)
        }else{
            console.log('lattitude '+body.features[0].center[1]+ " longitude "+body.features[0].center[0])
            const latitude=body.features[0].center[1]
            const  longitude=body.features[0].center[0]
            const  place_name=body.features[0].place_name
            callback(undefined,{latitude:latitude,longitude:longitude,location:place_name})
        }
       
    });
    
}



module.exports={
    geocode:geocode
}
