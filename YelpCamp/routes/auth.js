var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
const user = require("../models/user");

//root route
router.get("/", function (req, res) {
    res.render("landing");
});

//show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (e, u) {
        if (e) {
            req.flash("error", e.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome To YelpCamp "+u.username+"!");
                res.redirect("/campgrounds");
            });
        }
    });
});

//login form
router.get("/login", function (req, res) {
    res.render("login");
});

//handle login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

//logout route
router.get("/logout", function (req, res) {
    req.logout(function(e){
        if(e){
            console.log("ERROR: " + e);
        }
        req.flash("success", "Logged you out");
        res.redirect("/campgrounds");
    });
});

module.exports = router;