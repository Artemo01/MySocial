using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MySocialService.Data;
using MySocialService.DTO;
using MySocialService.Hubs;
using MySocialService.Models;
using MySocialService.Services.API;

namespace MySocialService.Services
{
    public class ChatService : IChatService
    {
        private readonly DataContext _context;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatService(DataContext context, IHubContext<ChatHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        public async Task SendMessageAsync(MessageDto message)
        {
            var messageModel = new MessageModel
            {
                SenderId = message.Sender,
                ReceiverId = message.Receiver,
                Text = message.Text,
                SentAt = message.SentAt
            };

            _context.Messages.Add(messageModel);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.User(message.Receiver).SendAsync("ReceiveMessage", message.Sender, message.Text);
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesAsync(string senderId, string receiverId)
        {
            var messages = await _context.Messages
                .Where(m => (m.SenderId == senderId && m.ReceiverId == receiverId) ||
                            (m.SenderId == receiverId && m.ReceiverId == senderId))
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            return messages.Select(m => new MessageDto
            {
                Sender = m.SenderId,
                Receiver = m.ReceiverId,
                Text = m.Text,
                SentAt = m.SentAt
            }).ToList();
        }
    }
}
