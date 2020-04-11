var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
var Campground = require('../models/campground');
var seedDB = require('../seeds');
seedDB();

/* GET home page. */
router.get("/", function(req, res){
    res.redirect("/campgrounds");
});

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
             res.render("campgrounds/index", {campgrounds:allCampgrounds})
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

router.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

module.exports = router;
