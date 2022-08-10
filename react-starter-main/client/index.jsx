import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";


function Login({onLogin}){
  const [username, setUsername] = useState("");
  function handleSubmit(event){
    event.preventDefault();
    onLogin(username)
    
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
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);
  }, []);



  const [chatLog, setChatLog] = useState([{
    author: "johannes",
    message: "Heisann!"
},
{
  author: "Dani",
  message: "Heisann!"
},
{
  author: "petter",
  message: "Heisann!"
},
])

const [message, setMessage] = useState("");

  function handleNewMessage(event){
    event.preventDefault();
    setChatLog([...chatLog, {author: username, message}])
    setMessage("");
  }


  return( <div className={"application"}>
  <header> Chat Application {username}</header>
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

function Application(){
  const [username, setUsername] = useState();

  if(!username){
    return <Login onLogin={username => setUsername(username)}/>
  }
  
  return <ChatApplication username={username}/>
  
}


ReactDOM.render(<Application/>, document.getElementById("app"));  