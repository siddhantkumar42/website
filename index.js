const express = require("express");
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const geoip = require('geoip-country');
const dateTime = require('node-datetime');
require('dotenv').config();

const hook = new Webhook(process.env.webhook)

const embed = new MessageBuilder()
.setTitle('Deployed..')
.setDescription(`Time: ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})}`)
.setURL('https://pritam42069.me')

hook.send(embed)

var app = express();
var views = 0;

function addView(ip, page) {
    var dt = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})
    // I am not ip logging, just curious about what country the viewers might be from
    var geo = geoip.lookup(ip);
    if (geo) {
        hook.send(`${dt} -> :flag_${geo.country.toLowerCase()}: (${geo.country}) -> ${page}`);
    } else {
        hook.send(`${page}`);
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

app.get('/sitemap.xml', (req, res) => {
    res.sendFile(__dirname + '/public/sitemap.xml');
    addView(`${req.ip}`, req.originalUrl);
});

app.get('/robots.txt', (req, res) => {
    res.sendFile(__dirname + '/public/robots.txt');
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


app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
    addView(`${req.ip}`, req.originalUrl);
})

var server = app.listen(8081, function () {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});