var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/hello", function(req, res){
  res.send("This will be the landing page sooner.");
});

router.get("/landing", function(req, res){
    res.render("landing");
});

var campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
    {name: "Dessert Park", image: "https://images.unsplash.com/photo-1478810810369-07072c5ef88b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
    {name: "Middle Nowhere", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"}
];

router.post("/campgrounds", function(req, res) {
  // get data from and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image:image};
  campgrounds.push(newCampground);
  //redirect to the campgrounds page
  res.redirect('/campgrounds');
});

router.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

router.get("/campgrounds", function(req, res){
  res.render("campgrounds",{campgrounds: campgrounds});
});

module.exports = router;
