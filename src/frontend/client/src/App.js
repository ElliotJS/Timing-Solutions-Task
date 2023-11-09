import { useState, useEffect, useRef } from "react";
import { Button } from "react-native";

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

  const closeWebSocket = () => {
    webSocket.current.close();
  };

  //<pre>{JSON.stringify(data, null, 2)}</pre>

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
                <div className="Classification">
                  <h2>{value.Name}</h2>
                  <h3>{value.TeamName}</h3>
                  <div className="ClassificationData">
                    <p>Class: {value.ClassName}</p>
                    <p>Start Number: {value.StartNumber}</p>
                    <p>Position: {value.Position}</p>
                    <p>Laps: {value.Laps}</p>
                    <p>Finished: {String(value.Finished)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <Button onPress={closeWebSocket} title="Close Connection"></Button>
      </header>
    </div>
  );
}

export default App;
