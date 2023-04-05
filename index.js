const express = require("express");
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const geoip = require('geoip-country');
const dateTime = require('node-datetime');
require('dotenv').config();

const hook = new Webhook(process.env.webhook)

var app = express();
var views = 0;

function addView(ip, page) {
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    // I am not ip logging, just curious about what country the viewers might be from
    var geo = geoip.lookup(ip);
    if (geo) {
        hook.send(`${formatted} -> :flag_${geo.country.toLowerCase()}: (${geo.country}) -> ${page}`);
    } else {
        hook.send(`${page}`)
    }
    views += 1;
}

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', true)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/index.html');
    addView(`${req.ip}`, req.originalUrl);
});

app.get('/blogs', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
    addView(`${req.ip}`, req.originalUrl);
});

app.get('/resources', (req, res) => {
    res.sendFile(__dirname + '/public/pages/blogs/resources.html');
    addView(`${req.ip}`, req.originalUrl);
});

app.get('/music', (req, res) => {
    res.sendFile(__dirname + '/public/pages/blogs/music.html');
    addView(`${req.ip}`, req.originalUrl);
});


app.get("/views", function (req, res, next) {
    res.write(`${views}`);
    res.end();
    addView(`${req.ip}`, req.originalUrl);
})

app.get("/test", function (req, res, next) {
    console.log(req.header("x-forwarded-for"))
    res.sendFile(__dirname + '/public/pages/general/index.html');
    addView(`${req.ip}`, req.originalUrl);
})

app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
    addView(`${req.ip}`, req.originalUrl);
})

var server = app.listen(8081, function () {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});