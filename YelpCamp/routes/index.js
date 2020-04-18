var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var passport = require('passport');
var LocalStrategy = require('passport-local');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var User = require('../models/user');
var seedDB = require('../seeds');
seedDB();

// PASSPORT CONFIGURATION


/* GET home page. */
router.get("/", function(req, res){
    res.redirect("/campgrounds");
});

// =====================
// AUTH ROUTES
// =====================

router.get('/register', function (req, res) {
    res.render('register');
});
// =====================
// SIGN UP
// =====================
router.post('/register', function (req, res) {
    //res.send('Signing you up....');
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect('/campgrounds');
        });
    });
});

// =====================
// LOGIN
// =====================
router.get('/login', function (req, res) {
    res.render('login');
});
// router.post('/login', middleware, callback)
router.post('/login', passport.authenticate("local",
    {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function (req, res) {
});

// =====================
// LOGOUT
// =====================
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds');
});


function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

router.get("/hello", function(req, res){
    res.send("This will be the landing page sooner.");
});

router.get("/landing", function(req, res){
    res.render("landing");
});


router.post("/campgrounds", function(req, res) {
  // get data from and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.description;
  var newCampground = {name:name, image:image, description: des};

  Campground.create(newCampground, function (err, newlyCreated) {
      if (err) {
          console.log(err);
      } else {
          res.redirect("/campgrounds");
      }
  });
  //redirect to the campgrounds page
});

router.get("/campgrounds/new", function(req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/new", {campground: campground});
        }
    });

});

router.get("/campgrounds", function(req, res){
  //res.render("campgrounds",{campgrounds: campgrounds});
    Campground.find({}, function (err, allCampgrounds) {
         if (err) {
             console.log(err);
         } else {
             res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user})
         }
    })
});

router.get("/campgrounds/:id", function (req, res) {
    // find the   with provided
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

// ==================
// COMMENTS ROUTE
// ==================

router.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });

        }
    });

});

module.exports = router;
