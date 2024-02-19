// // const express = require('express');
// const path = require('path');
// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// // const io = socketio(server);

// const io = socketio(server);
const socket = io();

socket.on('message', message =>{
   console.log(message);   // here in client side we are recieving message which is send from server side io.on
});