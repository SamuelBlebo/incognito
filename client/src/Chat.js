import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  });

  return (
    <div className="App">
      <ul id="messages">
        {message.map((messageReceived, index) => (
          <li key={index}>{messageReceived}</li>
        ))}
      </ul>
      <form id="form" onSubmit={messageReceived}>
        <input
          placeholder="message ....."
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
