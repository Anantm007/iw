const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Getting data in json format
app.use(bodyParser.urlencoded({extended:true}));

// Setting express engine
app.set('view engine', 'ejs');
app.use(express.static("views"));

// routes
app.use('/', require('./routes/index'));

// Starting the server
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started on port 3000"); 
});