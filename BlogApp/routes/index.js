var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_blog_app',{ useNewUrlParser: true, useUnifiedTopology: true });
var blogSchema = new mongoose.Schema({
  title: String,
  image:  {type: String, default: "https://images.unsplash.com/photo-1421930866250-aa0594cea05c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/blogs');
});

/* INDEX ROUTE*/
router.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("index", {blogs: blogs});
    }
  });

});

// NEW ROUTE
router.get('/blogs/new', function (req, res) {
  res.render('new');
});

// POST NEW BLOG
router.post('/blogs', function (req, res) {
  // create blog

  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      console.log(err) ;
    } else {
      res.redirect('/blogs');
    }
  })
  // redirect to the index
});

// SHOW ROUTE
router.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});
module.exports = router;
