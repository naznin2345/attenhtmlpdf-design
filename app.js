var express = require("express");
var bodyParser = require("body-parser");
var pdf = require("html-pdf");
var fs = require("fs");
const options = {
    format: "A3",
    orientation: "landscape",
    margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
    },
};
//init app
var app = express();

//set the templat engine
app.set("view engine", "ejs");

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    res.render("demopdf", { data: req.body.article }, function (err, html) {
        pdf.create(html, options).toFile(
            "./public/uploads/demopdf.pdf",
            function (err, result) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(res);
                    var datafile = fs.readFileSync(
                        "./public/uploads/demopdf.pdf"
                    );
                    res.header("content-type", "application/pdf");
                    res.send(datafile);
                }
            }
        );
    });
});

//assign port
var port = process.env.PORT || 8080;
app.listen(port, () => console.log("server run at port " + port));
