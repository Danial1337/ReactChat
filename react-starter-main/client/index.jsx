import React, {useState} from "react";
import ReactDOM from "react-dom";


function Login(){
  const [username, setUsername] = useState("");
  function handleSubmit(event){
    event.preventDefault()
  }

  return (
    <div>
    <h1>Please log in</h1>
      <form onSubmet={handleSubmit}> 
        <label>
          Username: 
          <input value={username} onChange={e => setUsername(e.target.value)}/>
          </label>
          <button>Log in</button>
      </form>
    </div>
  )
}

function Application(){
  const [username, setUsername] = useState();

  if(!username){
    return <Login/>
  }
  
  
}






ReactDOM.render(<Application/>, document.getElementById("app"));  