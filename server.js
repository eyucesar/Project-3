// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var Story = require("./models/Story");
var User = require("./models/User");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// User authentication
var session = require("express-session");
var passport = require("passport");

// from express session github

app.use(session({
  secret: 'jklsjflsfds',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));

// passport github
// initialize and integrate with express session
app.use(passport.initialize());
app.use(passport.session());

// -------------------------------------------------
mongoose.Promise = global.Promise;
// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/randomActs");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// // Main "/stories" Route. This will redirect the user to our rendered React application
app.post("/loginCheck", function(req, res) {
  //console.log("request original url  = " + req.originalUrl + " " + req.url);
  // if request is coming from login page
  console.log(req.body.user_name + " " + req.body.pword);
  User.find({'username':req.body.user_name, 'password':req.body.pword}, function(err, doc) {  
    if (err) {
      console.log(err);
    } else {
      // if user is found
      if (doc.length !== 0) {
        console.log(doc[0]);
        // get user id and add it to the session
        const userId = doc[0]._id;
        console.log("user id = " + userId);

        // run login function from passport to log user id in session
        req.login(userId, function(err) {
          res.redirect("/stories");
        });
        
      } else {
        // user not found
        console.log("Username or password invalid");

      }
    }
  });
  
  //res.sendFile(__dirname + "/public/index.html");
});

// main page with stories
app.get("/stories", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
});


// // This is the route we will send GET requests to retrieve our most recent search data.
// // We will call this route the moment our page gets rendered
// app.get("/api", function(req, res) {

//   // We will find all the records, sort it in descending order, then limit the records to 5
//   History.find({}).sort([
//     ["date", "descending"]
//   ]).limit(5).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });

app.post("/users", function(req, res) {

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    picUrl: req.body.picUrl,
    email: req.body.email,
    date: Date.now()
  });

  console.log("BODY: " + req.body);

  user.save(function(err, doc) {
    if(err) { 
        console.log(err);
    } else {
      //res.send(doc);
    
      const userId = doc._id;
      console.log("user id = " + userId);
      req.login(userId, function(err) {
          res.redirect("/stories");
      });
    }
  });
});

// write user id (serialize) to the session
passport.serializeUser(function(userId, done) {
    done(null, userId);
});

// read user id from the session
passport.deserializeUser(function(userId, done) {
  //User.findById(userId, function (err, user) {
    done(null, userId);
  //});
});


app.post("/stories", function(req, res) {

  // get user id stored in the sesion
  console.log(req.user);
  console.log(req.isAuthenticated());

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  var story = new Story({
    postedBy: req.user,
    title: req.body.title,
    longVersion: req.body.longV,
    date: Date.now()
  })

  console.log("BODY: " + req.body);

  story.save(function(err, doc) {
      if(err) { 
        console.log(err);
      } else {
        res.redirect("/stories");
      }

  });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
