const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', socket =>{

    // console.log('New WS Connection...');
    
    // Welcome current user
    socket.emit('message','Welcome to ChatCord!'); // from server we are sending connection and we are sending message

    // Broadcast when a user connects 
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnets
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left the chat');
    })

    // Listen for chatMessage
    socket.on('chatMessage', (msg)=>{
        io.emit('message',msg);
         console.log(msg);
    });
 
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));