var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment.")
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof woof",
        cat: "Meow"
    }
    var sound = sounds[animal];

    res.send("The "+animal+" says '"+sound+"'");
});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result="";

    for (var i=0;i<times;i++){
        result+=message+" ";
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Page not found");
})

app.listen(PORT=3000, function(){
    console.log("Now serving your app!");
});