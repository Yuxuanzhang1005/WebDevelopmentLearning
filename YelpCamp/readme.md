RESTFUL ROUTES

name     |    url                    |  verb   |  desc.
---------|---------------------------|---------|----------------------
INDEX    |/campgrounds               |GET     |Display a list of campgrounds
NEW      |/campgrounds/new            |GET    |Display form to make a new campground
CREATE   |/campgrounds                |POST   |Add a new campground to database
SHOW     |/campgrounds/:id            |GET    |Show info about :id campground
NEW      |/campgrounds/:id/comments/new|GET   | Add a new comment
CREATE   |/campgrounds/:id/comments    |POST  | Post a new comment
