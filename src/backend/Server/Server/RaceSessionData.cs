namespace Server
{
    public class RaceSessionData
    {

        public string? SessionId { get; set; }
        
        public string? Series { get; set; }

        public string? Name { get; set; }

        public string? Track { get; set; }

        public string? State { get; set; }
        
        public string? StartTime { get; set; }

        public string? Duration { get; set; }

        public string? TimeRemaining { get; set; }

        public ClassificationData[]? Classification { get; set; }

    }
}


/*
{
  "sessionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "series": "string",
  "name": "string",
  "track": "string",
  "state": "Pending",
  "startTime": "2023-11-09T19:44:41.197Z",
  "duration": "00:00:00",
  "timeRemaining": "00:00:00",
  "classification": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "startNumber": "string",
      "name": "string",
      "teamName": "string",
      "className": "string",
      "position": 0,
      "finished": true,
      "laps": 0,
      "fastestLapTime": {
        "display": "string",
        "rawMs": 0
      },
      "lastLapTime": {
        "display": "string",
        "rawMs": 0
      },
      "currentLapSectorTimes": {
        "additionalProp1": {
          "display": "string",
          "rawMs": 0
        },
        "additionalProp2": {
          "display": "string",
          "rawMs": 0
        },
        "additionalProp3": {
          "display": "string",
          "rawMs": 0
        }
      }
    }
  ]
}
*/