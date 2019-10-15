// File for get in touch or other contact routes

const express =  require('express');
const router = express();

// For sending emails
const config = require('config');
const nodemailer = require("nodemailer");

// Initialise mail sending
let transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
              user : config.EmailId,
              pass : config.EmailPass

    }});

// Query model
const Query = require('../models/query.js');

// Post route to submit
router.post('/submitquery', async(req, res) => {

    const {name, phone, message} = req.body;
    
        // Create a new query object
        query = new Query({
            name,
            phone,
            message, 
            date: Date.now()
        });
        
        // Saving query to the Database
        query.save();
    
    let HelperOptions ={
        from : config.EmailName + '<'+ config.EmailId + '>' ,
  
            to : "iwmsit@gmail.com",
            subject : name + " has submitted a query - " + message,
            text : message + "\n\n" + name + " can be contacted at - " + phone
        };
  
        transporter.sendMail(HelperOptions,(err,info)=>{
            if(err) throw err;
  
        console.log("The message was sent");
        });
  
      res.redirect("/");
   });

module.exports = router;


