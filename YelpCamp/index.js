const campground = require("./models/campground");
const comment = require("./models/comment");

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seed");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
seedDB();

app.get("/", function (req, res) {
    res.render("landing");
});

//index (campgrounds)
app.get("/campgrounds", function (req, res) {
    //get all campgrounds from db
    Campground.find({}, function (e, c) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("campgrounds/campgrounds", { campgrounds: c });
        }
    });
});

//add new campground
app.post("/campgrounds", function (req, res) {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //add all previous data to an array
    var newCampground = { name: name, image: image, description: description };
    //create a new campground and save to db
    Campground.create(newCampground, function (e, c) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//shows form
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

//show info of individual campground
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (e, id) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("campgrounds/show", { campground: id });
        }
    });
});

//comments routes
app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(e, c){
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("comments/new", { campground: c });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(e, campground){
        if (e) {
            console.log("ERROR: " + e);
            res.redirect("/campgrounds");
        } else {
            //create comment
            Comment.create(req.body.comment, function(e, comment){
                if (e) {
                    console.log("ERROR: " + e);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
            //connect comment to campground
        }
    });
    
})

app.listen(PORT = 4000, function () {
    console.log("YelpCamp server started.");
});