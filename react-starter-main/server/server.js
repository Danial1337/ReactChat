import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("../client/dist"));

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