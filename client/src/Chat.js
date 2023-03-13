import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="App">
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleMessageSubmit}>
        <input
          id="input"
          type="text"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
