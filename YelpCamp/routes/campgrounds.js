var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//index (campgrounds)
router.get("/", function (req, res) {
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
router.post("/", isLoggedIn, function (req, res) {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //add all previous data to an array
    var newCampground = { name: name, image: image, description: description, author: author };
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
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//show info of individual campground
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (e, id) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("campgrounds/show", { campground: id });
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;