var express = require('express');
var router = express.Router();

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

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
Campground.create(
    {
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        description: "This locates beside a creek. No bathroom. Beautiful scenery."
    },
    function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("newly create campground:");
            console.log(campground);
        }
    });

router.post("/campgrounds", function(req, res) {
  // get data from and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.description;
  var newCampground = {name:name, image:image, description: des};
  //campgrounds.push(newCampground);
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
  res.render("new");
});

router.get("/campgrounds", function(req, res){
  //res.render("campgrounds",{campgrounds: campgrounds});
    Campground.find({}, function (err, allCampgrounds) {
         if (err) {
             console.log(err);
         } else {
             res.render("index", {campgrounds:allCampgrounds})
         }
    })
});

router.get("/campgrounds/:id", function (req, res) {
    // find the   with provided
    Campground.findById(req.params.id, function(err, foundCamp){
       if (err) {
           console.log(err);
       } else {
           res.render("show", {campground: foundCamp});
       }
    });
    //
});

module.exports = router;
