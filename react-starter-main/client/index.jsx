import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";
import {FrontPage} from './FrontPage'
import { Login } from "./LoginPage";
import {MyProfile} from "./ProfilePage"
import {ChatApplication} from "./ChatPage"



function Application(){
  const [username, setUsername] = useState();

  /*const messageApi = {
    onAddMessage: async (m) => {
      await fetch("api/messages", {
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        body: JSON.stringify(m)
      })
    },
    listMessages: async() => {
      const res = await fetch("/api/messages");
      return res.json()
    }
  }*/


return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
         <Route path="/login" element={<Login onLogin={username => setUsername(username)}/>}/>
         <Route path="/chatscreen" element={<ChatApplication username={username} />}/>
         <Route path="/profilePage" element={<MyProfile/>}/>
         
      </Routes>
    </BrowserRouter>
)

  /*if(!username){
    return <Login onLogin={username => setUsername(username)}/>
  }
  

  return <ChatApplication username={username}/>*/
  
}


ReactDOM.render(<Application/>, document.getElementById("app"));   