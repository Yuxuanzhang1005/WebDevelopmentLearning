var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

router.get("/", function(req, res){
    //res.render("campgrounds",{campgrounds: campgrounds});
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user})
        }
    })
});

router.post("/", isLoggedIn, function(req, res) {
    // get data from and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image:image, description: des, author: author};

    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //redirect to the campgrounds page
});

router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/new", {campground: campground});
        }
    });

});

router.get("/:id", function (req, res) {
    // find the   with provided
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkOwnership, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });

});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkOwnership, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updated) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }

    });
});

// DELETE CAMPGROUND
router.delete("/:id", checkOwnership, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
});

function checkOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


module.exports = router;