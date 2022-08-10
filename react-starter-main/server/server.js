import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";
import path from "path";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/login", (req,res) => {
const {username} = req.cookies
users.find(u => u.username === username);
const {fullname} = user;

res.json({username, fullName})
});

const messages = [
  {
    author: "Danial",
    message: "heisann, melding lagret i server :D"
  }
]

const users = [
  {
    username: "admin", password: "12345", fullName: "TestingDanial"
  }
]

app.post("/api/chatscreen", (req,res) => {
  const {author, message} = req.body;
  messages.push({author, message});
  res.sendStatus(200);
})

app.post("/login", (req, res) => {
  const {password, username} = req.body;
  
  if(users.find(u => u.username === username).password === password){
    res.cookie("username", username)
res.status(200)
  } else{
    res.send(401)
  }
})


app.use(express.static("../client/dist")); //server filene fra serveren via Parcel

app.use((req,res) => { //serve denne filen hvis det overnevnte ikke fungerer
  res.sendFile(path.resolve("..","client","dist", "index.html"));
})

const wsServer = new WebSocketServer({noServer: true})
const sockets = [];

wsServer.on("connect",(socket) => {
  sockets.push(socket);
  console.log("ws Connected");
  
  socket.send(JSON.stringify({author: "server", message: "Automatisert melding: Hello from socket:3000,and welcome :D"}));
  
  socket.on("message",(data) => {
    const {author, message} = JSON.parse(data);
    for (const receipient of sockets) {
      receipient.send(JSON.stringify({author,message}));
    }
  })
})

const server = app.listen(process.env.PORT || 3000, () =>{
console.log("Server started on " + server.address().port);
server.on("upgrade", (req,socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (socket) =>{
    wsServer.emit("connect", socket, req);
  });
});

});