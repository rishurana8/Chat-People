const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');



// Get username and room from URL
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom',{username,room});

// Get room and users
socket.on('roomUsers',({room,users})=>{
     outputRoomName(room);
     outputUsers(users);
});


// Message from server
socket.on('message', message =>{
   console.log(message);   // here in client side we are recieving message which is send from server side io.on
   outputMessage(message);


   // scroll down 
   chatMessages.scrollTop = chatMessages.scrollHeight;
   
  });






// Message submit

chatForm.addEventListener('submit', (e)=>{
   e.preventDefault();

  // Get message text

   const msg = e.target.elements.msg.value;

  //  Emit message to server 
   socket.emit('chatMessage',msg);
  

  // clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus(); // iss se kya hoga ki jo hello humne likh hai woh send dabane ke baad us baar se ja nahi raha tha 

   //  console.log(msg);


})


// Output message to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class ="meta">${message.username}<span>${message.time}</span></p>
     <p class = "text">
       ${message.text}
     </p>`;
     document.querySelector('.chat-messages').appendChild(div);
     
}

// Add room name to DOM
function outputRoomName(room){
    userList.innerText = `
      ${users.map(user => `<li>${user.username}</li>`).join()}
    `
}
