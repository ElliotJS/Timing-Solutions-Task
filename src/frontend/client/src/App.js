import { useState, useEffect, useRef } from "react";

import ClassificationComponent from "./ClassificationComponent";

import "./App.css";

function App() {
  const [data, SetData] = useState(null);
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket("wss://localhost:44316/ws");

    webSocket.current.onopen = () => {
      console.log("Connected to websocket");
    };

    webSocket.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
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

  return (
    <div className="App">
      <header className="App-header">
        {data ? (
          <div>
            <h1>{data.Series}</h1>
            <h2>{data.Name}</h2>
            <p>{data.Track}</p>
            <div className="Classifications">
              {data.Classification.map((value) => (
                <ClassificationComponent value={value} />
              ))}
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
