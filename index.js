const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');

var app = express();

app.use(
    session ({
        secret: "ye kya hota hai?",
        resave: true,
        saveUninitialized: false
    })
)
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/index.html');
    req.session.views++;
});

app.get('/blogs', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
    req.session.views++;
});

app.get('/resources', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/blogs/resources.html');
    req.session.views++;
});

app.get("/views", function(req, res, next) {
    if (req.session.views) {
        req.session.views++;
        res.write(`${req.session.views}`);
        res.end();
    } else {
        req.session.views = 1;
        res.end('Initialised.');
    }
})

app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
})

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});