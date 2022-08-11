import React, {useState} from "react";
import { useNavigate} from "react-router-dom";

export function Login({onLogin}){
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