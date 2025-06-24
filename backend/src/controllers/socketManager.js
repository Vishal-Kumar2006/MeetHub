import { json } from "express";
import { Server } from "socket.io";

let connections = {};
let message = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"],
        allowedHeaders:["*"],
        credentials:true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }

      if (message[path] !== undefined) {
        for (let i = 0; i < message[path].length; i++) {
          io.to(socket.id).emit(
            "chat-message",
            message[path][a]["data"],
            message[path][a]["sender"],
            message[path][a]["socket-id-sender"]
          );
        }
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections)
      .reduce(([room, isFound], [roomKey, roomVal]) => {

        if(!isFound && roomVal.includes(socket.id)) return [room, true];
        return [room, isFound];
      }, ['', false]);

      if(found === true) {
        if(message[matchingRoom] === undefined) message[matchingRoom] = [];
        message[matchingRoom].push({'sender':sender, 'data':data, 'socket-id-sender':socket.id});
        console.log("message", key, ":", sender, data);
        
        connections[matchingRoom].array.forEach(elem => {
            io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.disconnect("disconnect", () => {
        var diffTime = Math.abs(timeOnline[socket.id] - new Date());

        var key;
        for(const[k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
            for (let a = 0; a < v.length; a++) {
                if(v[a] === socket.id) {
                    key = k;
                    for(let i=0; i < connections[key].length; i++) {
                        io.to(connections[key][a]).emit('user-left', socket.id);
                    }

                    var index = connections[key].indexOf(socket.id);
                    connections[key].splice(index, 1);

                    if(connections[key].length === 0) {
                        delete connections[key];
                    }
                }
            }
        }
    });
  });

  return io;
};
