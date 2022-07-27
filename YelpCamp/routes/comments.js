var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//new comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
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
router.post("/", middleware.isLoggedIn, function (req, res) {
    //lookup campground by id
    Campground.findById(req.params.id, function (e, campground) {
        if (e) {
            console.log("ERROR: " + e);
            res.redirect("/campgrounds");
        } else {
            //create comment
            Comment.create(req.body.comment, function (e, comment) {
                if (e) {
                    req.flash("error", "Something Went Wrong");
                    console.log("ERROR: " + e);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment Added!!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//edit comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(e, foundComment){
        if(e){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

//update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,function(e, u){
        if(e){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//destroy comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(e){
        if(e){
            res.redirect("back");
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;