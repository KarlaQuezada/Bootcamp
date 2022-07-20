var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds=[
    {name: "Salmon Creek", image: "https://pixabay.com/get/g886924ec93fcd2e3dc992e055be57d60ccc0f67ec2c32b1e0c1305d9e76d63cefdfb98eded63e357e9214c4cc4b184b7_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ge67f0395da5cdde723bd830617a46a99b09b9bd7ee897055c7346426e736b6755959e97c9d2e880921288caad8279a10_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/g34e8110f7f9bdcbd50ab6126b99a61e47d10c642dc7f714ea9fa604bcd816c46df53ce703f0271064f868a666a619dc7_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/g886924ec93fcd2e3dc992e055be57d60ccc0f67ec2c32b1e0c1305d9e76d63cefdfb98eded63e357e9214c4cc4b184b7_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ge67f0395da5cdde723bd830617a46a99b09b9bd7ee897055c7346426e736b6755959e97c9d2e880921288caad8279a10_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/g34e8110f7f9bdcbd50ab6126b99a61e47d10c642dc7f714ea9fa604bcd816c46df53ce703f0271064f868a666a619dc7_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/g886924ec93fcd2e3dc992e055be57d60ccc0f67ec2c32b1e0c1305d9e76d63cefdfb98eded63e357e9214c4cc4b184b7_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ge67f0395da5cdde723bd830617a46a99b09b9bd7ee897055c7346426e736b6755959e97c9d2e880921288caad8279a10_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/g34e8110f7f9bdcbd50ab6126b99a61e47d10c642dc7f714ea9fa604bcd816c46df53ce703f0271064f868a666a619dc7_340.jpg"}
]

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
})

app.listen(PORT=4000, function(){
    console.log("YelpCamp server started.");
});