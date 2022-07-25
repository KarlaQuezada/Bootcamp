var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//     description: "Huge Granite Hill."
// }, function(e, c){
//     if(e){
//         console.log("ERROR: "+e);
//     }else{
//         console.log("\n----- CAMPGROUND ADDED -----\n");
//         console.log(c);
//     }
// });

// var campgrounds=[
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}
// ]

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    //get all campgrounds from db
    Campground.find({}, function (e, c) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("campgrounds", { campgrounds: c });
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
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
    res.render("new");
});

//show info of individual campground
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (e, id) {
        if (e) {
            console.log("ERROR: " + e);
        } else {
            res.render("show", { campground: id });
        }
    });
});

app.listen(PORT = 4000, function () {
    console.log("YelpCamp server started.");
});