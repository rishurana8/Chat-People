const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket =>{

    console.log('New WS Connection...');

    socket.emit('message','Welcome to ChatCord!'); // from server we are sending connection and we are sending message
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));