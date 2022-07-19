var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends=["Brandon", "Lesly", "Dani", "Paola", "Sam"];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    
    res.render("friends", {friends: friends});
});

app.listen(PORT=3000, function(){
    console.log("Server started");
});