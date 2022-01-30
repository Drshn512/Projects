const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const items = [];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    const day = new Date().toLocaleDateString("en-IN", options);

    res.render('list', {listTitle: day, newListItem: items})
})

app.post("/", function(req, res) {

    const item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/")
    }
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItem: workItems})
})

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("server is running on 3000");
})