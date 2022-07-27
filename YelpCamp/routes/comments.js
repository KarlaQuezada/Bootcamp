var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//new comment
router.get("/new", isLoggedIn, function (req, res) {
    //find campground by id
    Campground.findById(req.params.id, function (e, c) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("comments/new", { campground: c });
        }
    });
});

//create comments
router.post("/", isLoggedIn, function (req, res) {
    //lookup campground by id
    Campground.findById(req.params.id, function (e, campground) {
        if (e) {
            console.log("ERROR: " + e);
            res.redirect("/campgrounds");
        } else {
            //create comment
            Comment.create(req.body.comment, function (e, comment) {
                if (e) {
                    console.log("ERROR: " + e);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
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