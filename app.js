const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
// const bodyparser=require("body-parser");
// app.use(bodyparser.urlencoded({ extended: true }));

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 

// mongoose files and connections
const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/Dance_website');

// mongoose schema
const dance = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });

  
//   converted to a model
  var dance_data = mongoose.model('Dance_info', dance); 


// ENDPOINTS
app.get('/', (req, res)=>{
    
    res.status(200).render('home.pug');
})

app.get('/contact.pug', (req, res)=>{
    
    res.status(200).render('contact.pug');
})

app.post('/contact.pug', (req, res)=>{
    
    var mydata = new dance_data(req.body);
    mydata.save().then(()=>{
        res.send("this data has been saved to database");
    }).catch(()=>{
        res.status(400).send("this item was not saved to the database")})
        // res.status(200).render('contact.pug');

    });

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
