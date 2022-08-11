import {Link} from "react-router-dom";

export function FrontPage(){
  return <div>
    <h1>Welcome to classic MSN-chat!! </h1>

    <Link to={"/logIn"}>Log Inn</Link>
    
    
  </div>
}