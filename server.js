const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials")

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    let now = new Date().toString();
    let logStr = `${now} -- ${req.method} ${req.url} -- ${req.ip}`;
    console.log(logStr);
    fs.appendFile("server.log", logStr + "\n", (error) => {
        if(error){
            console.log("Unable to appened to log");
        }
    });
    next();
});

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send("Hello.")
    response.send({
        name: "Jamie",
        city: "Plainfield",
        hobbies: [
            "Baseball",
            "trucks",
            "family"
        ]
    })
} );

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
        createdBy: "Created by Me"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        request: req.uri,
        error: "An Error Occured."
    });
});

app.get("/i3exp", (req, res) => {
    res.render("ac400.hbs", {
        phone_enableTimeZoneFromDHCP: true,
        phone_ip_gateway: "1.1.1.1",
        phone_ip_address: "10.10.10.10",
        phone_ip_netMask: "0.0.0.0",
        phone_ip_dns_primary: "25.25.25.25",
        phone_provisionUri: "https://phone-home.us-east-1.inindca.com",
        phone_dhcpInformOptionCode: 160
    })
})

app.listen(3000, () => console.log("Listen on 3000 ..."));