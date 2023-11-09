import { useState } from "react";

function ClassificationComponent(props) {
  const [showingRaceTimes, SetShowingRaceTimes] = useState({ display: "none" });
  const [showingMainData, SetShowingMainData] = useState({ display: "flex" });

  const value = props.value;

  console.log(value);

  const setDisplayingRaceTimes = (setShowTimes) => {
    if (setShowTimes) {
      SetShowingRaceTimes({ display: "flex" });
      SetShowingMainData({ display: "none" });
    } else {
      SetShowingRaceTimes({ display: "none" });
      SetShowingMainData({ display: "flex" });
    }
  };

  return (
    <div
      className="Classification"
      onMouseEnter={(e) => {
        setDisplayingRaceTimes(true);
      }}
      onMouseLeave={(e) => {
        setDisplayingRaceTimes(false);
      }}
    >
      <h2>{value.Name}</h2>
      <h3>{value.TeamName}</h3>
      <div className="ClassificationData" style={showingMainData}>
        <p>Class: {value.ClassName ? value.ClassName : "N/A"}</p>
        <p>Start Number: {value.StartNumber}</p>
        <p>Position: {value.Position}</p>
        <p>Laps: {value.Laps}</p>
        <p>Finished: {String(value.Finished ? "Yes" : "No")}</p>
      </div>
      <div className="ClassificationData RaceTimes" style={showingRaceTimes}>
        <p>
          Fastest Lap Time:
          {value.FastestLapTime ? value.FastestLapTime.Display : "Not set"}
        </p>
        <p>
          Last Lap Time:{" "}
          {value.LastLapTime ? value.LastLapTime.Display : "Not set"}
        </p>
      </div>
    </div>
  );
}

export default ClassificationComponent;
