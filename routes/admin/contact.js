// File for get in touch or other contact routes

const express =  require('express');
const router = express();
const { stringify } = require('querystring');
const request = require("request");
const fetch = require('node-fetch');

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

//     if (!captcha)
//     {
//         console.log("Please enter the captcha");
//         return res.send({success: false, msg: "Please fill out the captcha"});
//     }

//   // Verify URL
//   const query = stringify({
//     secret: process.env.captchaSecretKey,
//     response: captcha,
//     remoteip: req.connection.remoteAddress
//   });

//   const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

//   // Make a request to verifyURL
//   const body = await fetch(verifyURL).then(res => res.json());

//   // If not successful
//   if (body.success !== undefined && !body.success)
//   {
//       console.log("error")
//       return res.send({success: false, msg: "Sorry, there was an error, please try again"});
//   }
  // If successful
//   else {

           // Create a new query object
           q = new Query({
            name,
            phone,
            message,
            date: Date.now()
        });

        // Saving query to the Database
        q.save();

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
        res.render('../views/pages/successQuery')
    //   res.send({success: true, msg: "Thanks, your query has been submitted, we will contact you shortly"});
    // }  

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
