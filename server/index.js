const http=require("http");
const express = require("express");
const cors =require("cors");
const socketIO =require("socket.io");
const path = require('path')
const app =express();
const port =process.env.PORT;

const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Its working")
})
app.use(express.static(path.join(__dirname, "../cchat/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../cchat/build/index.html"));
});
const server =http.createServer(app);

const io=socketIO(server);
io.on("connection",(socket)=>{
    
    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit(`userJoined`,{user:"Admin",message:`${users[socket.id]} has joined the chat`})
        socket.emit('welcome',{user:"Admin ", message:`${users[socket.id]},Welcome to the chat`})
    })
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
        
    })
    socket.on('disconnect_user',()=>{
        socket.broadcast.emit('leave',{user:"Admin ",message:`${users[socket.id]} ,has left`})
        console.log("User Left")
    })
   
})




server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})
