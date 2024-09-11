using Microsoft.AspNetCore.Mvc;
using MySocialService.DTO;
using MySocialService.Services.API;

namespace MySocialService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IChatService _chatService;

        public MessagesController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("send")]
        public async Task<ActionResult> SendMessage([FromBody] MessageDto message)
        {
            await _chatService.SendMessageAsync(message);
            return Ok();
        }

        [HttpGet("{senderId}/{receiverId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessages(string senderId, string receiverId)
        {
            var messages = await _chatService.GetMessagesAsync(senderId, receiverId);
            if (messages == null || !messages.Any())
            {
                return NotFound("Brak wiadomości pomiędzy użytkownikami.");
            }

            return Ok(messages);
        }
    }
}
