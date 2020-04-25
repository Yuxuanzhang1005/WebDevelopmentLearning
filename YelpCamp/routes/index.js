var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET home page. */
router.get("/", function(req, res){
    res.redirect("/landing");
});

router.get("/landing", function (req, res) {
    res.render('landing');
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
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
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
    req.flash("success", "Welcome to YelpCamp " + user.username);
});

// =====================
// LOGOUT
// =====================
router.get('/logout', function (req, res) {
    req.logout();
    req.flash("success", "You have logged out.");
    res.redirect('/campgrounds');
});


module.exports = router;
