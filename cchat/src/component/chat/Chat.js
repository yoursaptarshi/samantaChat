import React, { useEffect, useState } from 'react'
import {user} from "../join/Join"
import socketIo from "socket.io-client"
import Message from '../message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import logo from "../../images/logo.png"
import "./chat.css"

let socket;
const ENDPOINT = "https://chatbackend-30do.onrender.com/"

const Chat = () => {
  const [id,setid] = useState("");

  const[messages,setmessages]=useState([]);
  
  const send = ()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    
    document.getElementById('chatInput').value ="";
  }
  useEffect(()=>{
     socket = socketIo(ENDPOINT, {transports:['websocket']});
    socket.on('connect',()=>{
      setid(socket.id);
    })
    socket.emit("joined",{user})
    socket.on(`welcome`,(data)=>{
      setmessages([...messages,data])
      console.log(data.user)
      console.log(data.message)
    })
    socket.on("userJoined",(data)=>{
      setmessages([...messages,data])
      console.log(data.user)
      console.log(data.message)
    })
    socket.on('leave',(data)=>{
      setmessages([...messages,data])
      console.log(data.user,data.message);
    })
    return()=>{
      socket.emit("disconnect_user");
      socket.off();
    }
  },[])
  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setmessages([...messages,data])
      console.log(data.user,data.message,data.id)
    })
  
    return () => {
      socket.off();
    }
  }, [messages])
  



  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <img src={logo} alt="logo"/>
          <h4 align="center">Samanta Chat</h4>
          <a href="/"><button>Close</button></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item,i)=> <Message user={item.id===id?``:item.user} message={item.message} classs={item.id===id?'right':'left'}/> )}
         
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput"/>
          <button onClick={send}className='sendbtn'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
