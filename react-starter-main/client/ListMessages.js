import React, {useEffect, useState} from "react";


export function ListMovies({moviesApi}){ //KOMPONENT FOR LISTMOVIES-SIDEN
  const [messages, setMessages] = useState()

  useEffect(async ()=>{
     setMessages(undefined); 
     setMessages(await moviesApi.listMovies());
  }, [])
 
  if(!messages){
   return <div>
    <h1>All Messages</h1>
    <h2>No messages found, trying to find.... </h2>
    </div>
  }  
 
 return <div> 
 
        <h1>All Messages</h1>

        {messages.map(m =>
             <div key={Math.random}> 

                {/* <h2>{m.title} ({m.year}) </h2> */}
                 {/* <p> {m.title}    <i> ~{m.year} </i></p> */}
                 <div><i><strong>{m.year}:</strong></i> <p> {m.title}</p></div>
                
                
              

             </div>
         )}

</div>

 }