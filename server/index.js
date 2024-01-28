const express=require('express')
const app=express();
const cors=require('cors')
const http=require('http')
app.use(cors())
const {Server}=require('socket.io');
//connect nodeJS to socket.Io
const server=http.createServer(app)
const io= new  Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});
io.on("connection",(socket)=>{
    console.log(`user connected: ${socket.id}`)
    socket.on("send-message",(message)=>{
   console.log(message);
   //recive the msg broadcast to all connected user
   io.emit("received-message",message)
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
})

server.listen(8000,()=>{
    console.log("server is running port at 8000")
})