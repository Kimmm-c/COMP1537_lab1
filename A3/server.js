const express = require('express')
const app = express()

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.log(err)
    }
})

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
    extended: true
}))

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kimmm-c:comp1537a3@cluster0.gddfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String]
});
const unicornModel = mongoose.model("unicorns", unicornSchema);

app.post("/findUnicornByName", (req, res) => {
    //console.log('request received')
    unicornModel.find({ name: req.body.unicornName }, (err, unicorns) => {
        if (err) {
            console.log(err);
        } else {
            console.log(unicorns);
        }
        res.send(unicorns);
    })
})

app.post("/findUnicornByFood", (req, res) => {
    //console.log(req.body);
    list_of_food = [];
    if (req.body.apple_status == 'checked') {
        list_of_food.push('apple')
    }
    if (req.body.carrot_status == 'checked') {
        list_of_food.push('carrot')
    }
    if (list_of_food.length == 2) {
        unicornModel.find({ loves: { $all: list_of_food } }, (err, unicorns) => {
            if (err) {
                console.log(err);
            } else {
                console.log(unicorns);
            }
            res.send(unicorns);
        })
    } else {
        unicornModel.find({ loves: { $in: list_of_food } }, (err, unicorns) => {
            if (err) {
                console.log(err);
            } else {
                console.log(unicorns);
            }
            res.send(unicorns);
        })
    }
})

app.post("/findUnicornByWeight", (req, res) => {
    console.log('request received')
    unicornModel.find({ weight: { $gt: req.body.lower_bound, $lt: req.body.upper_bound } }, (err, unicorns) => {
        if (err) {
            console.log(err);
        } else {
            console.log(unicorns);
        }
        res.send(unicorns);
    })
})

app.use(express.static("./public"))