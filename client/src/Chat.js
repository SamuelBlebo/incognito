import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { message, setMessage } = useState("");
  const { messageReceived, setMessageReceived } = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  });

  return (
    <div>
      <ul id="messages">
        {message.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={messageReceived}>
        <input
          id="input"
          type="text"
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onclick={sendMessage} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
