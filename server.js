const express = require('express');
const app = express();
const path = require('path')
var hbs = require('hbs');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => res.render('home.hbs',
    {
    PageTitle:'Home Page',
    message:'Home page here',
    currentYear:new Date().getFullYear(),
   }));

app.get('/about', (req, res) => res.render('about.hbs',
    {
        PageTitle: 'About Page',
        message: 'Some hbs text here',
        currentYear: new Date().getFullYear(),
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

app.listen(3000, () => console.log("Example app listening on port 3000!"));
