const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('serve.log',log + '\n',(err)=> {
        if(err){
            console.log('Unable to append to serve.log');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.get('/',(req,res) => res.render('home.hbs',
    {
    PageTitle:'Home Page',
    message:'Home page here'
   }));

app.get('/about', (req, res) => res.render('about.hbs',
    {
        PageTitle: 'About Page',
        message: 'Some hbs text here'
    }));

app.get('/projects', (req, res) => res.render('projects.hbs',
    {
        PageTitle: 'Projects Page',
        message: 'Some projects here'
    }));

app.post('/',function(req,res){
    res.send('Got a POST request');
})

app.put('/user',function (req,res) {
    res.send("Got a PUT request at /user");
})

app.delete('/user',function(req,res) {
    res.send('Got a DELETE request at /user');
})

app.listen(3001, () => console.log("Example app listening on port 3001!"));
