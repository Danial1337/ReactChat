import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";


export function ChatMessage({chat: {author, message}}){
  return(
    <div>
      <strong> {author}: </strong>
      {message}
    </div>
  )
}


export function ChatApplication({username}){
  const [ws, setWs] = useState();
 
   useEffect(()=>{
     const ws = new WebSocket(window.location.origin.replace( /^http/,  "ws"));
     ws.onmessage = (event) =>{
       console.log(event.data)
       const {author, message } = JSON.parse(event.data);
       setChatLog((oldState) =>[...oldState, {author, message}])
 
       
       
     
     }
     setWs(ws);
   }, []);
 
 
 
   const [chatLog, setChatLog] = useState([])
   const [message, setMessage] = useState("");
 
   function handleNewMessage(event){
     event.preventDefault();
     const chatMessage = {author: username, message};
     ws.send(JSON.stringify(chatMessage));
     
     //setChatLog([...chatLog, {ChatMessage}])
     setMessage("");
 
     
   }
 
 
   return( <div className={"application"}>
   <header> Chat Application {username + " ............."} 
   
   
   <Link to="/profilePage">MY PROFILE</Link>
   </header>
   <main>
     {chatLog.map((chat, index) => 
     <ChatMessage key={index} chat={chat}/> 
      
     )}
     </main>
   <footer> 
   <form onSubmit={handleNewMessage}> 
           <input value={message} onChange={(e) => setMessage(e.target.value)} />
           <button>submit/send msg</button>
       </form>
   </footer>
   </div>
   )
 }