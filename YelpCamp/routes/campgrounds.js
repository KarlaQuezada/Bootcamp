var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function (req, res) {
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //add all previous data to an array
    var newCampground = { name: name, image: image, description: description, price: price, author: author };
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
router.get("/new", middleware.isLoggedIn, function (req, res) {
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

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(e, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(e, u){
        if(e){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(e){
        if(e){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;