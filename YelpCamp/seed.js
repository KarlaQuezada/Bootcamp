var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name: "Himachal Pradesh",
        image: "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        description: "Id ut ipsum ex esse quis cillum nostrud commodo fugiat qui dolor laborum elit. Irure enim cillum nisi Lorem ullamco eu deserunt nulla. Mollit excepteur eu aliquip nulla amet magna. Eiusmod aliquip enim qui quis eu cillum incididunt aliqua."
    },
    {
        name: "Hogdon Meadow",
        image: "https://images.unsplash.com/photo-1560022211-f6b003a24e39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbXBncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        description: "Eu occaecat ut dolor ipsum sunt reprehenderit ea et. Nostrud non qui esse nulla occaecat est ea ut ex. Ex sit tempor fugiat sunt irure. Aliquip laborum aute amet ex ea Lorem irure quis labore ipsum adipisicing occaecat aliquip officia. Exercitation est nostrud ut ullamco culpa sunt dolore sunt esse. Enim veniam consequat quis nostrud. Irure do reprehenderit cupidatat esse pariatur quis esse est dolor tempor occaecat amet aliqua."
    },
    {
        name: "Atholville",
        image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbXBncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        description: "Enim sit dolore adipisicing amet officia amet nulla pariatur nostrud excepteur culpa consectetur. Dolore consectetur ullamco ex esse proident labore eiusmod cillum nostrud nisi veniam consequat nostrud. Enim nulla ut laborum minim ut elit nostrud velit elit. Dolore do est est nulla qui ut anim nostrud."
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(e){
        if(e){
            console.log("ERROR: "+e);
        }
        console.log("Removed all campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(e, campground){
                if(e){
                    console.log("ERROR: "+e);
                }else{
                    console.log("Added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was Internet",
                            author: "Brandon"
                        }, function(e, comment){
                            if(e){
                                console.log("ERROR: "+e);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                }
            });
        });
    });
};

module.exports=seedDB;