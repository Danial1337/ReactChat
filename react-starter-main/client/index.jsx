import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";
import {FrontPage} from './FrontPage'
import { Login } from "./LoginPage";
import {MyProfile} from "./ProfilePage"
import {ChatApplication} from "./ChatPage"
import { ListMovies } from "./ListMessages";
import { moviesApi } from "../server/moviesApi";


function Application(){

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
  

  const [username, setUsername] = useState();



return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
         <Route path="/login" element={<Login onLogin={username => setUsername(username)}/>}/>
         <Route path="/chatscreen" element={<ChatApplication username={username} />}/>
         <Route path="/profilePage" element={<MyProfile/>}/>
         <Route path="/listMessages" element={<ListMovies moviesApi={moviesApi}/>}/>
         
      </Routes>
    </BrowserRouter>
)

  /*if(!username){
    return <Login onLogin={username => setUsername(username)}/>
  }
  

  return <ChatApplication username={username}/>*/
  
}


ReactDOM.render(<Application/>, document.getElementById("app"));   