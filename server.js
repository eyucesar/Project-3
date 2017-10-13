// include server dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var flash = require('connect-flash');

// require history and user schemas
var Story = require("./models/Story");
var User = require("./models/User");

// create instance of express
var app = express();

// set port
var PORT = process.env.PORT || 3000;

// express boilerplate code
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// user authentication with passport.js
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var expressValidator = require("express-validator");

app.use(expressValidator());

// from express session github
app.use(session({
  secret: 'jklsjflsfds',
  resave: false,
  saveUninitialized: false,
}));

// passport github
// initialize and integrate with express session
app.use(passport.initialize());
app.use(passport.session());

// -------------------------------------------------
mongoose.Promise = global.Promise;
// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://heroku_9g8jmvjq:7cp4oeh392rkdrrmflo96404nt@ds157624.mlab.com:57624/heroku_9g8jmvjq");
// mongoose.connect("mongodb://localhost/randomActs");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// called from authenticate in post /login
// username and password names cannot be changed and come from passport local
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find({'username':username, 'password':password}, function(err, doc) {  
    if (err) {
      console.log(err);
    } else {
      // if user is found
      if (doc.length !== 0) {
        // get user id and add it to the session
        const userId = doc[0]._id;
        return done(null, userId);
      } else {
        // user not found
        return done(null, false);
      }
    }  
  });
}));

// post login route
app.post("/login", passport.authenticate("local", {
  successRedirect: "/loggedin",
  failureRedirect: "/signup"
}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/loggedin", function(req,res) {
  res.sendFile(__dirname + "/public/index_loggedin.html");
});

// main page with stories
app.get("/stories", function(req, res) {

  // find all the records, sort it in descending order, then limit the records to 10
    Story.find({}).sort([
      ["date", "descending"]
    ]).populate("postedBy")
    .limit(10).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(doc);
        res.send(doc);
      }
    });
});

// serve login page when login route is hit
app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

// serve main page when logout route is hit
app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.sendFile(__dirname + "/public/index.html");
});

//serve sign up page when the signup route is hit
app.get("/signup", function(req, res) {
  res.sendFile(__dirname + "/public/signup.html");
});

//serve newstory page when the newstory route is hit. If user is not logged in, redirect to login page
app.get("/newstory", function(req, res) {

  if (req.isAuthenticated()) {
    res.sendFile(__dirname + "/public/newstory_loggedin.html");
  } else {
    res.redirect('/login');
  }
  
});

// Post to check whether user exits in DB or not
app.post("/users", function(req, res) {

  // Check if username and password already exist
  User.find({'username':req.body.username}, function(err, doc) {  
    if (err) {
      console.log(err);
    } else {
      // if user is found, redirect to logged in route
      if (doc.length !== 0) {
        res.redirect("/loggedin");
      } else {
      // if the user is not found, create the user with the data entered in the signup form
      var user = new User({
        username: req.body.username,
        password: req.body.password,
        picUrl: req.body.picUrl,
        email: req.body.email,
        date: Date.now()
      });

      // save the user to DB
      user.save(function(err, doc) {
        if(err) { 
            console.log(err);
        } else {
          const userId = doc._id;
          // then dynamically logs the user to the newly created account and redirect to loggedin route
          req.login(userId, function(err) {
              res.redirect("/loggedin");
          });
        }
      });  // user.save
      }  // if user not found
    }
  });  // user.find
});

// write user id (serialize) to the session
passport.serializeUser(function(userId, done) {
  done(null, userId);
});

// read user id from the session
passport.deserializeUser(function(userId, done) {
  done(null, userId);
});

// post route for stories
app.post("/stories", function(req, res) {
  // get user id stored in the sesion
  console.log(req.user);
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    // create story from user's input
    var story = new Story({
      postedBy: req.user,
      title: req.body.title,
      longVersion: req.body.longV,
      date: Date.now()
    })

    // save the story to the DB and redirect to the loggedin route
    story.save(function(err, doc) {
        if(err) { 
          console.log(err);
        } else {
          res.redirect("/loggedin");
        }
    });
  } else {
    // user is not logged in
    console.log("Please log in");
  }
});

// post the updated number of hearts to the DB
app.post("/updateHearts", function(req, res) {
  var id = req.body.id;
  var hearts = parseInt(req.body.hearts);
  // find the story by its id and update its number of hearts
  Story.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      hearts: hearts
    }
  }, { upsert: true }).exec(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send({updated: true});
    }
  });
});

// post the updated number of flags to the DB
app.post("/updateFlags", function(req, res) {
  var id = req.body.id;
  var flags = parseInt(req.body.flags);
  // find the story by its id and update its number of flags
  Story.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      flags: flags
    }
  }, { upsert: true }).exec(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send({updated: true});
    }
  });
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});
