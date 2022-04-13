const express = require('express')
const app = express()

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.log(err);
    }
})

// connect to mongodb db
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kimmm-c:comp1537a3@cluster0.gddfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//create schema for object in collection characters
const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String]
});
const Unicorn = mongoose.model("unicorns", unicornSchema);

//decode the request
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
    extended: true
}))

app.get('/getAllUnicorns', (req, res) => {
    //console.log(req.query.name);
    Unicorn.find({}, (err, unicorn) => {
        if (err) {
            console.log(err);
        } else {
            res.send(unicorn);
        }
    })
})

app.get('/getUnicornByName', (req, res) => {
    //console.log(req.query.name);
    Unicorn.find({ name: req.query.name }, (err, unicorn) => {
        if (err) {
            console.log(err);
        } else {
            res.send(unicorn);
        }
    })
})

app.use(express.static("./public"))