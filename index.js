var express = require("express");

var app = express()

app.use(express.static('public'))

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
});