const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle incoming chat messages
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    // Emit the chat message to all connected clients except the sender
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
