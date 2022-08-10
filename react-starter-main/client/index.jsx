import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";

function FrontPage(){
  return <div>
    <h1>Welcome to classic MSN-chat!! </h1>

    <Link to={"/logIn"}>Log Inn</Link>
    
    
  </div>
}

function Login({onLogin}){
const navigate = useNavigate();

  const [username, setUsername] = useState("");
  function handleSubmit(event){
    event.preventDefault();
    onLogin(username)

   if(username){
    navigate("/chatscreen")
   }
  }


  return (
    <div>
    <h1>Please log in</h1>
      <form onSubmit={handleSubmit}> 
        <label>
          Username: 
          <input value={username}
           onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <button>Log in</button>
 

      </form>
    </div>
  )
}

function ChatMessage({chat: {author, message}}){
  return(
    <div>
      <strong> {author}: </strong>
      {message}
    </div>
  )
}
 
function ChatApplication({username}){
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

function MyProfile(){
  
  return(
    <div>
  <p> PROFIL SIDEN ER IKKE SATT OPP ENDA</p>
  <Link to={"/chatscreen"}>TRYKK HER FOR Å GÅ TILBAKE TIL CHATSCREEN</Link>

</div>


  )

 
}

function Application(){
  const [username, setUsername] = useState();
return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
         <Route path="/login" element={<Login onLogin={username => setUsername(username)}/>}/>
         <Route path="/chatscreen" element={<ChatApplication username={username}/>}/>
         <Route path="profilePage" element={<MyProfile/>}/>
      </Routes>
    </BrowserRouter>
)

  /*if(!username){
    return <Login onLogin={username => setUsername(username)}/>
  }
  

  return <ChatApplication username={username}/>*/
  
}


ReactDOM.render(<Application/>, document.getElementById("app"));  