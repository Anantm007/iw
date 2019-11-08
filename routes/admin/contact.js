// File for get in touch or other contact routes

const express =  require('express');
const router = express();
var sess;

// For sending emails
require('dotenv').config()
const nodemailer = require("nodemailer");

// Initialise mail sending
let transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
              user : process.env.EmailId,
              pass : process.env.EmailPass

    }});

// Query model
const Query = require('../../models/query.js');

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
        from : process.env.EmailName + '<'+ process.env.EmailId + '>' ,
  
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

// Get all queries in admin dashboard
router.get('/admin/queries', async(req ,res) => {
    sess = req.session;
    if(req.session.email)
    {
        try {
            const queries = await Query.find().sort({'date': -1});

            res.render('../views/pagesadmin/query', {
                'Queries': queries
            });

        } catch (err) {
            throw(err);
        }
    }

    else
    res.redirect('/admin');
});


module.exports = router;


