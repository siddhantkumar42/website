const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');

var app = express();
var views = 0;

function addView(num = 1) {
    views += num;
}

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/index.html');
    addView();
});

app.get('/blogs', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
    addView();
});

app.get('/resources', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/blogs/resources.html');
    addView();
});

app.get("/views", function(req, res, next) {
    res.write(`${views}`);
    res.end();
    addView();
})

app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
    addView();
})

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});