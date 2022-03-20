const express = require("express");
const { MongoClient } = require('mongodb');
const databases = require("./public/js/databases.js")

var app = express();

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/index.html');
    databases.addViews().catch(console.error);
});

app.get('/blogs', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
    databases.addViews();
});

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});