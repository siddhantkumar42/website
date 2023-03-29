const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
require('dotenv').config();

const hook = new Webhook(process.env.webhook)

var app = express();
var views = 0;

function addView(ip) {
    hook.send(ip)
    views += 1;
}

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    addView(`${req.ip}`);
    console.log(req.ip);
    res.sendFile(__dirname + '/public/pages/general/index.html');
});

app.get('/blogs', (req, res) => {
    addView(`${req.socket.remoteAddress}`);
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
});

app.get('/resources', (req, res) => {
    addView(`${req.socket.remoteAddress}`);
    res.sendFile(__dirname + '/public/pages/blogs/resources.html');
});

app.get("/views", function (req, res, next) {
    addView(`${req.socket.remoteAddress}`);
    res.write(`${views}`);
    res.end();
})

app.get("*", (req, res) => {
    addView(`${req.socket.remoteAddress}`);
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
})

var server = app.listen(8081, function () {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});