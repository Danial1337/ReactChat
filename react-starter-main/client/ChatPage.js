import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";


const allMsg = []

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
 
   async function handleNewMessage(event){
//TEST
const moviesApi = { //innkaplse moviesApi, 
  onAddMovie: async (m) => {
    await fetch("/api/movies", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(m)
    })
  },

  listMovies: async () => {
   const res = await fetch("/api/movies");
  return res.json()
  }
} 

//TESTSLUTT
     event.preventDefault();
     const chatMessage = {author: username, message};

     ws.send(JSON.stringify(chatMessage));
     await moviesApi.onAddMovie({title: chatMessage.message,year: chatMessage.author});
     
     //setChatLog([...chatLog, {ChatMessage}])
     setMessage("");


 console.log(JSON.stringify(chatLog))
// await moviesApi.onAddMovie({title: author, year: 9, plot: message})
     
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