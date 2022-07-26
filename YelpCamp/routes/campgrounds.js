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