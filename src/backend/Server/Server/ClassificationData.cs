namespace Server
{
    public class ClassificationData
    {

        public class ClassificationSectorTimeData
        {

            public ClassificationTimeData? AdditionalProp1 { get; set; }

            public ClassificationTimeData? AdditionalProp2 { get; set; }

            public ClassificationTimeData? AdditionalProp3 { get; set; }

        }

        public class ClassificationTimeData
        {
            public string? Display { get; set; }

            public int RawMs { get; set; }

        }

        public string? Id { get; set; }

        public string? StartNumber { get; set; }

        public string? Name { get; set; }

        public string? TeamName { get; set; }

        public string? ClassName { get; set; }

        public int Position { get; set; }

        public bool Finished { get; set; }

        public int Laps { get; set; }

        public ClassificationTimeData? FastestLapTime { get; set; }

        public ClassificationTimeData? LastLapTime { get; set; }

        public ClassificationSectorTimeData? CurrentLapSectorTimes { get; set; }

    }
}
