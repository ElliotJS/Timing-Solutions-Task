import { useState, useEffect, useRef } from "react";
import { Button } from "react-native";

import "./App.css";

function App() {
  const [data, SetData] = useState({});
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket("wss://localhost:44316/ws");

    webSocket.current.onopen = () => {
      console.log("Connected to websocket");
    };

    webSocket.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      SetData(response);
    };

    webSocket.current.onclose = () => {
      console.log("Disconnected from websocket");
    };

    webSocket.current.onerror = (error) => {
      console.log(error);
    };

    const webSocketCurrent = webSocket.current;

    return () => {
      webSocketCurrent.close();
    };
  }, []);

  const closeWebSocket = () => {
    webSocket.current.close();
  };

  return (
    <div className="App">
      <header className="App-header">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Button onPress={closeWebSocket} title="Close Connection"></Button>
      </header>
    </div>
  );
}

export default App;
