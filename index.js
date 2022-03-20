const express = require("express");

var app = express();

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/index.html');
});

app.get('/blogs', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
    databases.addViews();
});

app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
})

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});