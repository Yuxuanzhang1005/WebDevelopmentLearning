var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_blog_app',{ useNewUrlParser: true, useUnifiedTopology: true });
var blogSchema = new mongoose.Schema({
  title: {type: String, default: "NO TITLE"},
  image:  {type: String, default: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//var usersRouter = require('./routes/users');

/* GET home page. */
router.get('/', function(req, res) {
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
  req.body.blog.body = req.sanitize(req.body.blog.body);

  var newblog = new Blog({
    title: req.body.blog.title || "NO TITLE",
    image: req.body.blog.image || "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    body: req.body.blog.body
    });
  newblog.save(function (err, Blog) {
    if (err) {
      console.log(err) ;
    } else {
      console.log(newblog);
      res.redirect('/blogs');
    }
  });
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

router.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function (err, foundBlog) {
    if(err){
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });

});

// UPDATE ROUTE
router.put('/blogs/:id', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);

  req.body.blog.title = req.body.blog.title || "NO TITLE";
  req.body.blog.image = req.body.blog.image || "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60";

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
  //res.send("UPDATE");
});
// DELETE ROUTE
router.delete('/blogs/:id', function (req, res) {
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  })
});
module.exports = router;
