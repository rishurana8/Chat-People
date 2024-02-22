const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./util/messages');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./util/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

const botName = 'chatCord Bot';

io.on('connection', socket =>{ 

    // console.log('New WS Connection...');
    
    // Run when client connects
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room);

         socket.join(user.room);

        // Welcome current user
    socket.emit('message',formatMessage(botName,'Welcome to ChatCord!')); // from server we are sending connection and we are sending message

    // Broadcast when a user connects 
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));


    // send users and room info
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
    })

});


    // Listen for chatMessage
    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
         console.log(msg);
    });
    
 
   
    // Runs when client disconnets
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id);

        if(user){
          io.to(user.room).emit('message', formatMessage(botName,`${user.username} has left the chat`));
        }


       // send users and room info
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
    })


    });

});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

