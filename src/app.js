const path = require('path')
const express = require('express')

const hbs = require('hbs')
var geocode=require('./utils/geo-code.js')
var forecast=require('./utils/forecast.js');
// Define paths for Express config
const publicDirPath= path.join(__dirname,'../public/')
const viewDirPath= path.join(__dirname,'../templates/views')
const partialDirPath= path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

//set up handlebar and view template path 
app.set('view engine','hbs')
app.set('views',viewDirPath)
hbs.registerPartials(partialDirPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Rodricks'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Rodricks'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Help To Access Weather API',
        name: 'Rodricks'
        })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error: 'Address nof provided'})
    }
    geocode.geocode(req.query.address,(error,{latitude,longitude, location}={})=>{
  
        console.log('latitude '+latitude);
        console.log('logngitude '+longitude);
        forecast.forecast(latitude,longitude,(error,{temperature,feelslike,forecastData}={})=>{ // object destrutring
            console.log('Present temp is '+temperature+ " and it feels like "+feelslike)
            res.send({forecastData:forecastData,temperature:temperature, location,address:req.query.address})
            
        })
        
    }) 
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        message: 'Help Document Not Found',
        name: 'Rodricks'
        })
    })    

app.get('*',(req,res)=>{

    res.render('error',{
        title: '404',
        message: 'Request Page Not Found',
        name: 'Rodricks'
        })
    })

app.listen(port,()=>{
console.log('Server is Up and listening on Port '+port)
})