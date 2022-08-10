import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("../client/dist"));

const wsServer = new WebSocketServer({noServer: true})
wsServer.on("connect",(socket) => {
  console.log("ws Connected");
})

const server = app.listen(process.env.PORT || 3000, () =>{
console.log("Server started on " + server.address().port);
server.on("upgrade", (req,socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (socket) =>{
    wsServer.emit("connect", socket, req);
  });
});

});