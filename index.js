const express = require("express");
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require('discord-webhook-node');

var app = express();

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/general/index.html');
});

app.get('/blogs', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/general/blogs.html');
});

app.get('/resources', (req, res) => {
    console.log(req.socket.remoteAddress);
    res.sendFile(__dirname + '/public/pages/blogs/resources.html');
});


app.get('/mod_submit', (req, res) => {
    const webhook_url = process.env.WEBHOOK_URL;
    const hook = new Webhook(webhook_url);
    hook.setUsername("Mod Application");
    const embed = new MessageBuilder()
        .setTitle(req.query.username)
        .addField('Country', req.query.country, true)
        .addField('GitHub', req.query.github, true)
        .setColor('#00b0f4')
        .setTimestamp();
    hook.send(embed)
    return res.sendFile(__dirname + '/public/pages/general/index.html');
})

app.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/pages/general/404_not_found.html");
})

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});