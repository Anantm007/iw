const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const cron = require("node-cron");
const instaPosts = require("./routes/cronInstaPosts");

// MongoDB url
const url = process.env.mongoURI;

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);
mongoose.set("useFindAndModify", false);

// Getting data in json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting express engine
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));

// routes
app.use("/", require("./routes/index"));
app.use("/admin", require("./routes/admin/auth"));
app.use("/admin/blogs", require("./routes/admin/blogsroutes"));
app.use("/", require("./routes/admin/contact"));

// Cronjob to fetch posts from insta API and update database everyday at 2:00 AM
cron.schedule("0 2 * * *", async () => {
  console.log("running");

  await instaPosts();
});

// Starting the server
app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on port 3000");
});
