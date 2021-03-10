const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

//setup paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup static diresctory to serve
//express.static -> middleware f'n, it serves static file and it's going for index.html to serve it up
app.use(express.static(publicDirectoryPath));

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Sahadev Indlia'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About me',
        name : 'Sahadev Indlia'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'Help Page',
        name : 'Sahadev Indlia',
        message : 'How can we help you'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error : 'Please provide a location'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, data)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast : data.forecast,
                location : location,
                address : req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errorMessage : 'Help page you\'re looking for is not found ',
        title : '404 Page',
        name : 'Sahadev Indlia'
    })
})

//it must be placed at the end of all router -> app.get is like if-else it also check for a match
//from app.use to to the end i.e app.get('*', () =>{}) which is 404 page
app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage : 'Page not found',
        title : '404 Page',
        name : 'Sahadev Indlia'
    });
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
})