using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    public class MainController : Controller
    {
        private readonly ILogger<MainController> _logger;

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/ws")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _logger.Log(LogLevel.Information, "Connection established");

                Task recieveData = RecieveData(webSocket);
                Task sendData = SendData(webSocket);

                await Task.WhenAll(recieveData, sendData);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        public async Task SendData(WebSocket webSocket)
        {
            _logger.Log(LogLevel.Information, "Start Sending");

            var count = 0;

            while (webSocket.State == WebSocketState.Open)
            {
                var wsMessage = new ArraySegment<Byte>(Encoding.UTF8.GetBytes($"Second count: {count}"));

                await webSocket.SendAsync(wsMessage, WebSocketMessageType.Text, true, CancellationToken.None);

                _logger.Log(LogLevel.Information, "Sent Message");

                Thread.Sleep(1000);
                count++;
            }

        }

        public async Task RecieveData(WebSocket webSocket)
        {
            _logger.Log(LogLevel.Information, "Start Listening");

            var buffer = new byte[1024 * 4];
            var clientMessage = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            _logger.Log(LogLevel.Information, "Recieved Message");

            var webSocketOpen = clientMessage.MessageType != WebSocketMessageType.Close;

            while (webSocketOpen)
            {
                buffer = new byte[1024 * 4];
                clientMessage = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                _logger.Log(LogLevel.Information, "Recieved Message");

                webSocketOpen = clientMessage.MessageType != WebSocketMessageType.Close;
            }

            await webSocket.CloseAsync(clientMessage.CloseStatus!.Value, clientMessage.CloseStatusDescription, CancellationToken.None);
            _logger.Log(LogLevel.Information, "Connection closed");
        }
    }
}