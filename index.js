var http = require('http');
var express = require('express');
require('dotenv').config();

let PORT = process.env.PORT || 8000;

var app = express();

var httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*'
    }
});

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

require('./socket')(io)

httpServer.listen(PORT, () => console.log('Listening on PORT', PORT));

