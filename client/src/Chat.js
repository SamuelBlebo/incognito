import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = io();

    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      const socket = io();
      socket.emit("chat message", inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
