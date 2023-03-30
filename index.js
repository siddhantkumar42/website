const express = require("express");
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
app.set('trust proxy')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/index.html');
    addView(`${req.socket.remoteAddress}`);
});

app.get('/blogs', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
    addView(`${req.socket.remoteAddress}`);
});

app.get('/resources', (req, res) => {
    res.sendFile(__dirname + '/public/pages/blogs/resources.html');
    addView(`${req.socket.remoteAddress}`);
});

app.get("/views", function (req, res, next) {
    res.write(`${views}`);
    res.end();
    addView(`${req.socket.remoteAddress}`);
})

app.get("/test", function (req, res, next) {
    console.log(req.header("x-forwarded-for"))
    res.sendFile(__dirname + '/public/pages/general/index.html');
    addView(`req.socket.remoteAddress: ${req.socket.remoteAddress}`);
    addView(`req.ip: ${req.ip}`);
    addView(`req.connection.remoteAddress: ${req.connection.remoteAddress}`);

})

app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
    addView(`${req.socket.remoteAddress}`);
})

var server = app.listen(8081, function () {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});