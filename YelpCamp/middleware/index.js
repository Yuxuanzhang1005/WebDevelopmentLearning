var Campground = require('../models/campground');
var Comment = require('../models/comment');
// all the middleware goes here.
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    // will not display the message, need to put before redirect.
    req.flash("error", "You need to log in first.");
    res.redirect('/login');
};

// check the campground ownership
middlewareObj.checkOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp) {
            if (err) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                if (foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to log in.");
        res.redirect("back");
    }
};
// check the comment ownership
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to log in");
        res.redirect("back");
    }

};

module.exports = middlewareObj;