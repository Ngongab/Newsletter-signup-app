
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email


    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = " https://us10.api.mailchimp.com/3.0/lists/7cc59e12e2"

    const options = {
        method: "POST",
        auth: "ngonga1:0c018b8a3f40446c8fc430bca62ea799-us10"
    }

   const request =  https.request(url, options, function (response) {

                
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/Success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
            
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port " + PORT)
});

// API Key
// 0c018b8a3f40446c8fc430bca62ea799-us10

// List Id
// 7cc59e12e2

