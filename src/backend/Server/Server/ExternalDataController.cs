using System;
using System.Net.Http.Headers;

namespace Server
{
    public class ExternalDataController
    {

        private HttpClient client;

        public ExternalDataController()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://dev-sample-api.tsl-timing.com");
            client.DefaultRequestHeaders.Accept.Add(
               new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<RaceSessionData?> GetData()
        {
            var response = client.GetAsync("/sample-data").Result;
            RaceSessionData raceSessionData = null;

            if (response.IsSuccessStatusCode)
            {
                raceSessionData = await response.Content.ReadAsAsync<RaceSessionData>();
            }

            return raceSessionData;
        }

    }
}
