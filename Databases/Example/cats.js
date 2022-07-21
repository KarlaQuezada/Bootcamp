//DB CONECTION
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String
});


//HOW TO SAVE IN THE DB
var Cat = mongoose.model("Cat", catSchema);

var lola = new Cat({
    name: "Chimi",
    age: 4,
    breed: "Domestic shorthair"
});

lola.save(function(e, cat){
    if(e){
        console.log("smth went wrong");
    }else{
        console.log("We saved a cat succesfully!");
        console.log(cat);
    }
});

Cat.create({
    name: "Mochi",
    age: 5,
    breed: "Unknown"
}, function(e, cat){
    if(e){
        console.log("smth went wrong");
    }else{
        console.log("We saved a cat succesfully!");
        console.log(cat);
    }
});

//RETRIEVE DB'S INFO
Cat.find({}, function(e, cats){
    if(e){
        console.log("Error.");
        console.log(e);
    }else{
        console.log("----- LIST OF CATS -----");
        console.log(cats);
    }
});