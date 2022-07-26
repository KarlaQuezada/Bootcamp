const campground = require("./models/campground");
const comment = require("./models/comment");

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");
seedDB = require("./seed");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "Chimi is the prettiest kitty",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    next();
});

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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    //find campground by id
    Campground.findById(req.params.id, function (e, c) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("comments/new", { campground: c });
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//auth routes
//show register form
app.get("/register", function (req, res) {
    res.render("register");
});
//handle sign up
app.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (e, u) {
        if (e) {
            console.log("ERROR: " + e);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/campgrounds");
            });
        }
    });
});

//login form
app.get("/login", function (req, res) {
    res.render("login");
});
//handle login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

//logout route
app.get("/logout", function (req, res) {
    req.logout(function(e){
        if(e){
            console.log("ERROR: " + e);
        }
        res.redirect("/campgrounds");
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(PORT = 4000, function () {
    console.log("YelpCamp server started.");
});